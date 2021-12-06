import { toast } from "react-toastify";

export const useToaster = (message="Error", type="error") => {
    const customId = "custom-toast-id";

    switch (type) {
        case "error":
            toast.error(message, {
                toastId: customId
            });
            break;
    
        case "success":
            toast.success(message, {
                toastId: customId
            });
            break;
    
        default:
            break;
    }
}