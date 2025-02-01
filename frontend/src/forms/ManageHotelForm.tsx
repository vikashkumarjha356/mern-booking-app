import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import { HotelType } from "../../../backend/src/shared/types";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
}

type Props = {
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
    hotel?: HotelType;
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;
    useEffect(() => {
        reset(hotel)
    }, [hotel, reset])
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        if (hotel) {
            formData.append("hotelId", hotel._id)
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        })

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            })
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });
        onSave(formData);
    });
    return <FormProvider {...formMethods}>
        <form className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-10 flex flex-col gap-6" onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
            <span className="flex justify-end">
                <button disabled={isLoading} type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </span>
        </form>
    </FormProvider>
}
export default ManageHotelForm