import { useStore } from "@nanostores/react";
import Message from "./message";
import { $messages, switchChat } from "@/lib/store";
import { ScrollArea } from "../ui/scroll-area";

const Messages = () => {

    const messages = useStore($messages);
    console.log(messages);
    let isChat = true;
    return (
        <ScrollArea className="h-[650px] w-full">
            <div className="flex-col space-y-[10px]">
                {messages.map((m) => {
                    
                    isChat = !isChat;
                    return (
                    <Message key={m.content} content={m.content} chat={isChat} />
                    )}
                )}

            </div>
        </ScrollArea>
    
    )
}

export default Messages;