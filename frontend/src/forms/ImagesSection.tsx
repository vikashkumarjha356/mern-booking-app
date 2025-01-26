import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length;
                        if (totalLength === 0) {
                            return "At least one image is required";
                        }

                        if (totalLength > 6) {
                            return "Maximum of 6 images allowed";
                        }

                        return true;
                    }
                })} />
            </div>
            {errors.imageFiles && (<span className="text-sm text-red-500">{
                errors.imageFiles.message}</span>)}
        </div>
    )
}

export default ImagesSection