import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"

const AddHotels = () => {
    const { showToast } = useAppContext()
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Added Successfully", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" })
        }
    })

    const handleSave = (handleFormData: FormData) => {
        mutate(handleFormData)
    }

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    )
}

export default AddHotels