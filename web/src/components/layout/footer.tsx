import { addMessage, addMessages } from "@/lib/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { sendMessage } from "@/data/api";


const Footer = () => {
    const [content, setContent] = useState("");
    const inputRef = useRef(null);
    const sendButton = useRef(null);
    const cleanUp = () => {
        setContent("");
        inputRef.current!.value = "";
    }

    const addNewMessage = async () => {
        addMessage({ content })
        cleanUp();
        const messageToAdd = await sendMessage(content);
        addMessage(messageToAdd);
    }

    return (
        <div className="p-[20px] flex">
            <Input className="h-[50px]"
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && content) {
                    sendButton.current!.click();
                }
            }}
            ref={inputRef}>
            </Input>
            <Button className="h-[50px]" variant="outline" onClick={addNewMessage}
            ref={sendButton}>
                Send
            </Button>
        </div>
    )
}

export default Footer;