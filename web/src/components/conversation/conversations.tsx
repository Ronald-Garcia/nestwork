import { $conversations, setConvo } from "@/lib/store"
import { useStore } from "@nanostores/react"
import Conversation from "./conversation";
import { useEffect } from "react";
import { getConversations } from "@/data/api";


const Conversations = () => {

    const conversations = useStore($conversations);

    useEffect(() => {
        getConversations().then(a => {
            setConvo(a);
        });
        
    }, [])

    return (
        <div className="flex-col space-y-1">

            {conversations.map(c => {
                return (
                    <Conversation subject={c.title}></Conversation>
                )

            })}

        </div>
    )
}

export default Conversations;