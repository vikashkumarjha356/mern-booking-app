import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
// import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const { showToast } = useAppContext();
    // const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Logged out successfully", type: "SUCCESS" });
            // navigate("/sign-in")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    return (
        <button 
            className="text-indigo-700 px-3 font-bold bg-yellow-300 hover:bg-yellow-400" 
            onClick={() => mutation.mutate()}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
