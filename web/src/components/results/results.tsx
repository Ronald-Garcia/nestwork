import { ChatMessageType } from "@/data/types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";


const Result = ({ msg }: { msg: ChatMessageType[]}) => {

    return (
<div className="flex space-x-[10px]">
            <Avatar className="place-self-center h-[50px] w-[50px]">
                <AvatarFallback className="text-3xl">
                    👾
                </AvatarFallback>
            </Avatar>

            <ScrollArea className="w-[550px] rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                
            {msg.map(m => (

                <HoverCard>
                    <HoverCardTrigger asChild>

                        <Card className="h-[200px] w-[200px]">
                            <CardHeader>    
                                <CardTitle className="flex items-center space-x-[10px]">
                                    <Avatar>
                                        <AvatarFallback>
                                            {m.name && m.name[0] + m.name.split(' ')[1][0]}

                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        {m.department}
                                    </div>
                                </CardTitle>
                                <Separator></Separator>
                            </CardHeader>
                            <CardContent>
                            </CardContent>
                        </Card>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        
                        <div className="flex-col space-y-1 text-md font-md">
                            <div>
                                Name: {m.name}
                            </div>

                            <div>
                                Email: {m.email}
                            </div>

                            <div>
                                Department: {m.department}
                            </div>

                            <div>
                                Interests: {m.interests}
                            </div>

                            <div>
                                Projects: {m.projects}
                            </div>
                        </div>

                        
                    </HoverCardContent>
                </HoverCard>
)
                )}
            </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>



        </div>        
    )
}

export default Result;