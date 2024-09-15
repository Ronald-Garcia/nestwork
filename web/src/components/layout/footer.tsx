import { addConvo, addMessage, addMessages } from "@/lib/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { createConversation, sendMessage } from "@/data/api";
import { ChatMessageType, ConversationType, MessageType } from "@/data/types";


const Footer = () => {

    const [firstEnter, setFirstEnter] = useState(true);

    useEffect( () => {
        setFirstEnter(true);
    }, [])

    useEffect( ()=> {
        console.log(firstEnter);
    }, [firstEnter])
    const [content, setContent] = useState("");
    const inputRef = useRef(null);
    const sendButton = useRef(null);
    const cleanUp = () => {
        setContent("");
        inputRef.current!.value = "";
    }

    const addNewMessage = async () => {
        if (firstEnter) {
            setFirstEnter(false);
            const convo: ConversationType = await createConversation(content);
            convo.title = "TESTING";
            addConvo(convo);
        }
        addMessage({ content })
        cleanUp();
        const messageToAdd = await sendMessage(content);
        addMessages(messageToAdd as MessageType | ChatMessageType[]);
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