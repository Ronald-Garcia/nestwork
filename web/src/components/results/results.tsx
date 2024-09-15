import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


const Result = ({ content }: { content: string}) => {

    

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    <Avatar>
                        <AvatarFallback>

                        </AvatarFallback>
                    </Avatar>
                </CardTitle>
            </CardHeader>
            <CardContent>
                Testing
            </CardContent>

        </Card>
    )
}

export default Result;