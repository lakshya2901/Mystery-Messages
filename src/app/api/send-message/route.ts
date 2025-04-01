import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request: Request){
    await dbConnect();

    const {username, content} = await request.json();

    try{
        const user = await UserModel.findOne({username});

        if(!user){
            return Response.json({
                success: false,
                error: "User not found"
            }, {
                status: 404
            });
        }

        //is user accepting messages
        if(!user.isAcceptingMessages){
            return Response.json({
                success: false,
                error: "User is not accepting messages"
            }, {
                status: 400
            });
        }
        
        const newMessage: Message = {content, createdAt: new Date()} as Message;
        user.messages.push(newMessage);
        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, {
            status: 200
        });
    } catch (error){
        console.error("Error in send-message route", error);

        return Response.json({
            success: false,
            error: "Internal server error"
        }, {
            status: 500
        });
    } 
}