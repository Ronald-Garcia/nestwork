import { setMessages } from "@/lib/store";
import { Button } from "../ui/button";
import { getConvoMessages } from "@/data/api";


const Conversation = ({ subject, convoId, update, setUpdate}: {subject: string, convoId: number, update: number, setUpdate: React.Dispatch<React.SetStateAction<number>>}) => {

    const handleOnClick = async () =>{
        const messages = await getConvoMessages(convoId);
        setMessages(messages);
        setUpdate(update + 1);
        console.log(messages);
    }
    
    return (
        <Button className="w-full"
        variant="link"
        onClick={handleOnClick}    
    >
            {subject}
        </Button>
    );

}

export default Conversation;