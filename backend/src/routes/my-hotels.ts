import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotels";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

router.post('/', verifyToken, [
    body("name").notEmpty().withMessage('Name is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Hotel typpe is required'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
    body("facilities").notEmpty().isArray().withMessage('Facilities are required')
], upload.array("imageFiles", 6), async (req: Request, res: Response): Promise<any> => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        const imageUrls = await uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new Hotel(newHotel);
        console.log("Hotel: ", hotel);
        await hotel.save();
        res.status(201).send(hotel);

    } catch (e) {
        console.log("Error creating hotel: ", e);
        return res.status(500).json({ message: "Internal server error" });
    }

})

router.get(`/`, verifyToken, async (req: Request, res: Response): Promise<any> => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (e) {
        console.log("Error fetching hotels: ", e);
        return res.status(500).json({ message: "Error fetching hotels" });
    }
})

router.get(`/:id`, verifyToken, async (req: Request, res: Response): Promise<any> => {
    try {
        const hotel = await Hotel.findOne({
            userId: req.userId,
            _id: req.params.id
        });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json(hotel);
    } catch (e) {
        console.log("Error fetching hotel: ", e);
        return res.status(500).json({ message: "Error fetching hotel" });
    }
})

router.put(`/:hotelId`, verifyToken, upload.array("imageFiles", 6), async (req: Request, res: Response): Promise<any> => {
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate({
            userId: req.userId,
            _id: req.params.hotelId
        }, updatedHotel, { new: true });

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const imageFiles = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(imageFiles);
        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
        await hotel.save();
        return res.status(201).json(hotel)
    } catch (e) {
        console.log("Error updating hotel: ", e);
        return res.status(500).json({ message: "Error updating hotel" });
    }
})

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (imageFile) => {
        const base64 = imageFile.buffer.toString("base64");
        let dataURI = `data:${imageFile.mimetype};base64,${base64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;