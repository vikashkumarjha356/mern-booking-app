import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () => {
    const { showToast } = useAppContext()
    const { hotelId } = useParams<{ hotelId: string }>()
    const { data: hotel } = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId,
        onError: (error) => {
            console.log("Error fetching hotel: ", error);
        }
    })

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Updated Successfully", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error Updating Hotel", type: "ERROR" })
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
}

export default EditHotel