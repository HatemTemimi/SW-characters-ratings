import { toast } from "react-toastify";

 export const  notify = (text:string, progress?: boolean) => toast(text,  {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: !progress,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
