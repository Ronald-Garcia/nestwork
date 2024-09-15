import { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { $avatarUrl, $user, setAvatarUrl } from "@/lib/store";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "./ui/label";


const ImageUpload = () => {

    const avatarUrl = useStore($avatarUrl);
    const user = useStore($user);
    const [url , setUrl] = useState("");
    const fileUploadRef = useRef(null);

    useEffect(() => {
        if (user.options) {
            setUrl(user.options.picture)
        }
    }, [])

    useEffect(() => {
        setUrl(avatarUrl);
    }, [avatarUrl])

    const uploadImageDisplay = async () => {
        const uploadedFile = fileUploadRef.current!.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setAvatarUrl(cachedURL);
    }
    

    return (
        <>
            <Label
                htmlFor="file"
            >
                Choose profile picture!
            </Label>
            
            

            {url && <div className="flex place-content-center">

                <Avatar className="w-[100px] h-[100px] border-2 border-slate-400">
                    <AvatarImage
                        onClick={uploadImageDisplay}
                        src={url}>
                    </AvatarImage>
                </Avatar>
            </div>}
            <Input
            type="file"
            name="file"
            id="file" 
            ref={fileUploadRef}
            defaultValue={user.options ? user.options.picture : ""}
            onChange={uploadImageDisplay}>
            </Input>

            

        </>
    )

}

export default ImageUpload;
