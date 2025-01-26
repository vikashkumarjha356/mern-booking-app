import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Logged out successfully", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    return (
        <button 
            className="text-indigo-700 px-4 py-2 font-semibold bg-white hover:bg-gray-100 border border-indigo-700 rounded-lg transition-colors duration-300" 
            onClick={() => mutation.mutate()}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
