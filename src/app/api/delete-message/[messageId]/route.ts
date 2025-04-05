import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User";


export async function DELETE(request: Request, {params}: { params: Promise<{ messageId: string }> }
){ 
    // @ts-expect-error Argument type mismatch from NextAuth credentials
    const messageId = params.messageId;
    await dbConnect();


    const session  = await getServerSession(authOptions);
    const user: User = session?.user ;
    if(!session || !session.user){
       
        return Response.json({
            success: false,
            error: "No user found"
        }, {
            status: 404
        });
    }

    try{
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } } //message docs are stored in an array, each doc has its unique id in mongoDB
        );

        if(updateResult.modifiedCount === 0){
            return Response.json({
                success: false,
                error: "Message not found"
            }, {
                status: 404
            });
        }
        return Response.json({
            success: true,
            message: "Message deleted successfully"
        }, {
            status: 200
        });
    } catch(error){
        console.error("Error in delete-message route", error);

        return Response.json({
            success: false,
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}