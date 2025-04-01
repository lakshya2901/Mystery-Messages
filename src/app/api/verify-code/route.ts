import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST (request: Request) {
    await dbConnect();

    try{
        const {username, code} = await request.json();
        const decodedUsername = decodeURIComponent(username); // as while encoding *space* is converted to %20 and so on
        const user = await UserModel.findOne({username: decodedUsername});

        if(!user){
            return Response.json({
                success: false,
                error: "User not found"
            }, {
                status: 404
            });
        }

        //check if the code is correct and not expired
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date();


        if(isCodeValid && isCodeNotExpired){

            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: "Account verified successfully"
            }, {
                status: 200
            });
        }

        else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Code is expired"
            }, {
                status: 400});
        }
        
        else{
            return Response.json({
                success: false,
                message: "Code is invalid"
            }, {
                status: 400
            });
        }
    } catch(error){
        console.error("Error in check-username-uniqueness route", error);

        return Response.json({
        success: false,
        error: "Internal server error"
        }, {
        status: 500
        });
    }
}