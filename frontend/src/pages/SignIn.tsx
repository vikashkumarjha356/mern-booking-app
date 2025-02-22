import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../oAuth/GoogleLoginButton";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
    const queryClient = useQueryClient();

    const onSubmit = handleSubmit(data => {
        mutation.mutate(data);
    });

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Logged in successfully", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    return (
        <form
            className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto mt-10 flex flex-col gap-6"
            onSubmit={onSubmit}
        >
            <h2 className="text-4xl font-bold text-indigo-700 text-center">Sign In</h2>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">Email</span>
                <input
                    type="email"
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("email", { required: "This field is required" })}
                />
                {errors?.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </label>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">Password</span>
                <input
                    type="password"
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("password", {
                        required: "This field is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                />
                {errors?.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </label>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Not Registered?{" "}
                    <Link className="text-indigo-600 underline hover:text-indigo-800" to="/register">
                        Create an account here
                    </Link>
                </span>
                <button
                    type="submit"
                    className="bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
                >
                    Log In
                </button>
            </div>
            <GoogleLoginButton />
        </form>
    );
};

export default SignIn;
