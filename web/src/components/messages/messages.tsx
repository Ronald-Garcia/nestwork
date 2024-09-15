import { useStore } from "@nanostores/react";
import Message from "./message";
import { $messages, setMessages } from "@/lib/store";
import { ScrollArea } from "../ui/scroll-area";
import { ChatMessageType, MessageType } from "@/data/types";
import Result from "../results/results";
import { useEffect } from "react";

const Messages = ({update}: {update: number}) => {

    let messages = useStore($messages);
    let isChat = true;
    useEffect(() => {
        console.log(messages);
    }, [update]);
    return (
        <ScrollArea className="h-[650px] w-full">
            <div className="flex-col space-y-[10px]">
                {messages.map((m) => {
                    
                    isChat = !isChat;
                    if(!isChat) {
                        const mes = m as MessageType;
                        return (
                            <Message key={mes.content} content={mes.content} chat={isChat} />
                        )
                    } else {
                        const chatmsg = m as ChatMessageType[];
                        return (
                            <Result msg={chatmsg}></Result>
                        );
                    }
                })}

            </div>
        </ScrollArea>
    
    )
}

export default Messages;