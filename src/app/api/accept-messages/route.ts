import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth";

export async function POST(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);

    const user:User = session?.user;

    if(!session || !session.user){
        return Response.json({
            success: false,
            error: "No user found"
        }, {
            status: 404
        });
    }

    const userId = user._id

    const {acceptMessages} = await request.json();
    
    try{
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {isAcceptingMessages : acceptMessages}, {new: true});

        if(!updatedUser){
            return Response.json({
                success: false,
                error: "Failed to update user"
            }, {
                status: 401
            });
        }

        return Response.json({
            success: true,
            message: "User status to accept messages updated successfully",
            data: updatedUser
        },{
            status: 200
        }); 
    }catch(error){
        console.log('Failed to accept user status to accept messages', error);
        return Response.json({
            success: false,
            error: "Failed to accept user status to accept messages"
        }, {
            status : 500
        });
    }
}

export async function GET(){
    await dbConnect();

    const session = await getServerSession(authOptions);

    const user:User = session?.user;

    if(!session || session.user){
        return Response.json({
            success: false,
            error: "No user found"
        }, {
            status: 404
        });
    }

    const userId = user._id;

    try{
        const foundUser = await UserModel.findById(userId);

        if(!foundUser){
            return Response.json({
                success: false,
                error: "User not found"
            }, {
                status: 404
            });
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessages,
            data: foundUser
        },{
            status: 200
        });
    }catch(error){
        console.log('Error in getting message accepting status', error);
        return Response.json({
            success: false,
            error: "Error in getting message accepting status"
        }, {
            status: 500
        });
    }
}    