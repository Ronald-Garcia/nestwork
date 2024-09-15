import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { useStore } from "@nanostores/react";
import { $user } from "@/lib/store";



const Message = ({ content, chat }: {content: string, chat: boolean}) => {
    const user = useStore($user);
    return (
        <div className="flex space-x-[10px]">
            <Avatar className="place-self-center h-[50px] w-[50px]">
                <AvatarFallback>
                    {!chat && user.name && user.name[0] + user.name.split(' ')[1][0]}
                    { chat && '👾'}
                </AvatarFallback>
            </Avatar>
            <div className="border-2 rounded-[25px] border-slate-500 w-full h-fit p-5 ">            
                {!chat && content}
            </div>

        </div>

    )
}

export default Message;