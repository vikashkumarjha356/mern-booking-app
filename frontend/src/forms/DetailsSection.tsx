import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h1 className="text-4xl font-bold text-indigo-700 text-center mb-6">Add Hotel</h1>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">Name</span>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("name", { required: "This field is required" })}
                />
                {errors?.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </label>
            <div className="flex flex-col md:flex-row gap-4">
                <label className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-semibold text-gray-600">City</span>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                        {...register("city", { required: "This field is required" })}
                    />
                    {errors?.city && <span className="text-sm text-red-500">{errors.city.message}</span>}
                </label>
                <label className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-semibold text-gray-600">Country</span>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                        {...register("country", { required: "This field is required" })}
                    />
                    {errors?.country && <span className="text-sm text-red-500">{errors.country.message}</span>}
                </label>
            </div>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">Description</span>
                <textarea
                    rows={6}
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("description", { required: "This field is required" })}
                ></textarea>
                {errors?.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
            </label>

            <div className="flex flex-col md:flex-row gap-4">
                <label className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-semibold text-gray-600">Price Per Night</span>
                    <input
                        type="number"
                        min={1}
                        className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                        {...register("pricePerNight", { required: "This field is required" })}
                    />
                    {errors?.pricePerNight && <span className="text-sm text-red-500">{errors.pricePerNight.message}</span>}
                </label>
                <label className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-semibold text-gray-600">Star Rating</span>
                    <select
                        {...register("starRating", { required: "This field is required" })}
                        className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        <option value="" className="text-sm text-gray-500">Select a Rating</option>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                    {errors?.starRating && <span className="text-sm text-red-500">{errors.starRating.message}</span>}
                </label>
            </div>


        </div>
    );
};

export default HotelDetailsSection;
