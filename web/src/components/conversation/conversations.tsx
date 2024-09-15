import { $conversations, setConvo } from "@/lib/store"
import { useStore } from "@nanostores/react"
import Conversation from "./conversation";
import { useEffect } from "react";
import { getConversations } from "@/data/api";


const Conversations = ({update, setUpdate}: {update: number, setUpdate: React.Dispatch<React.SetStateAction<number>>}) => {

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
                    <Conversation subject={c.title} convoId={c.id} update={update} setUpdate={setUpdate}></Conversation>
                )

            })}

        </div>
    )
}

export default Conversations;