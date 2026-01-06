import { toast, ToastOptions } from "react-hot-toast";
const defaultOptions: ToastOptions = {
    position: "bottom-center",
    duration: 3000,
    style: {
        padding: "12px 20px",
        minWidth: "fit-content",
        maxWidth: "350px",
        borderRadius: "8px",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#1e293b",
        color: "#fff",
    },
    className: "animate-fade-in-out",
};

export const toastSuccess = (message: string) => toast.success(message, defaultOptions);
export const toastError = (message: string) => toast.error(message, defaultOptions);
export const toastInfo = (message: string) => toast(message, defaultOptions);
export const toastWarning = (message: string) => toast.warn(message, defaultOptions);
