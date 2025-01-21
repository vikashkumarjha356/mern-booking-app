import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmpassword: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Account created successfully", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    return (
        <form className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto mt-10 flex flex-col gap-6" onSubmit={onSubmit}>
            <h2 className="text-4xl font-bold text-indigo-700 text-center">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <label className="flex-1">
                    <span className="text-sm font-semibold text-gray-600">First Name</span>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg w-full py-2 px-4 mt-1 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                        {...register("firstName", { required: "This field is required" })}
                    />
                    {errors.firstName && (<span className="text-sm text-red-500">{errors.firstName.message}</span>)}
                </label>
                <label className="flex-1">
                    <span className="text-sm font-semibold text-gray-600">Last Name</span>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg w-full py-2 px-4 mt-1 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                        {...register("lastName", { required: "This field is required" })}
                    />
                    {errors.lastName && (<span className="text-sm text-red-500">{errors.lastName.message}</span>)}
                </label>
            </div>
            <label className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">Email</span>
                <input
                    type="email"
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 mt-1 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (<span className="text-sm text-red-500">{errors.email.message}</span>)}
            </label>
            <label className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">Password</span>
                <input
                    type="password"
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 mt-1 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("password", {
                        required: "This field is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                />
                {errors.password && (<span className="text-sm text-red-500">{errors.password.message}</span>)}
            </label>
            <label className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">Confirm Password</span>
                <input
                    type="password"
                    className="border border-gray-300 rounded-lg w-full py-2 px-4 mt-1 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("confirmpassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required";
                            } else if (watch("password") !== val) {
                                return "Your passwords do not match";
                            }
                        },
                    })}
                />
                {errors.confirmpassword && (<span className="text-sm text-red-500">{errors.confirmpassword.message}</span>)}
            </label>
            <button
                type="submit"
                className="bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-600 transition-colors"
            >
                Create Account
            </button>
        </form>
    );
};

export default Register;
