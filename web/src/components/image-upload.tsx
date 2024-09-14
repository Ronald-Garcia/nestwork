import { useRef } from "react";
import { Button } from "./ui/button";
import { useStore } from "@nanostores/react";
import { $avatarUrl } from "@/lib/store";


const ImageUpload = () => {

    const avatarUrl = useStore($avatarUrl);

    const fileUploadRef = useRef(null);

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current!.click();
    }

    const uploadImageDisplay = async () => {
        const uploadedFile = fileUploadRef.current!.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setAvatarUrl(cachedURL);
    }
    

    return (
        <>

            {avatarUrl === "" && <Button>
                Upload Image
            </Button>}
        </>
    )

}

export default ImageUpload;
