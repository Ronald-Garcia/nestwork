import Messages from "../messages/messages";
import Footer from "./footer";

const Body = ({update}: {update: number}) => {


    return (
        <div className="">
        <Messages update={update}></Messages>
        <Footer></Footer>
        </div>
    );
};

export default Body;
