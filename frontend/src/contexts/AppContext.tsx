import React, { createContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    })
    return <AppContext.Provider
        value={{
            showToast: (toastMessage) => {
                setToast(toastMessage)
            },
            isLoggedIn: !isError
        }
        }>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
        {children}
    </AppContext.Provider >
}

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a AppContextProvider")
    }
    return context;
}