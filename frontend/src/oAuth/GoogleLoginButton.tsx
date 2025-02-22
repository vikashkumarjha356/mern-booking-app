import { GoogleLogin } from "@react-oauth/google";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";



const GoogleLoginButton = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation(apiClient.googleLogin, {
        onSuccess: async () => {
            showToast({ message: "Login Successfull", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: () => {
            showToast({ message: "", type: "ERROR" })
        }
    })

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                console.log("Login Success:", credentialResponse);
                mutate(credentialResponse)
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};

export default GoogleLoginButton;
