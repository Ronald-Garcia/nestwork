import { Button } from "../ui/button";


const Conversation = ({ subject }: {subject: string}) => {

    return (
        <Button className="w-full">
            {subject}
        </Button>
    );

}

export default Conversation;