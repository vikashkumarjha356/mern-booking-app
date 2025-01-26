import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
                <label className="tex-gray-700 text-sm font-semibold">
                    Adults
                    <input className="border rounded w-full py-2 px-3 font-normal" type="number" min={1} {...register("adultCount", { required: "This field is required" })} />
                    {errors.adultCount?.message && <span className="text-red-500 text-sm">{errors.adultCount.message}</span>}
                </label>

                <label className="tex-gray-700 text-sm font-semibold">
                    Childred
                    <input className="border rounded w-full py-2 px-3 font-normal" type="number" min={0} {...register("childCount", { required: "This field is required" })} />
                    {errors.childCount?.message && <span className="text-sm text-red-500">{errors.childCount.message}</span>}
                </label>
            </div>
        </div>
    )
}

export default GuestsSection