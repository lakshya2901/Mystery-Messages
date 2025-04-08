import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET (request: Request) {

  await dbConnect();

  try{

    const {searchParams} = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username")

    }

    //Validate the query parameters with ZOD
    const result = UsernameQuerySchema.safeParse(queryParam);

    if(!result.success){
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        error: usernameErrors?.length >0  ? usernameErrors.join(', ') : "Invalid username"
      }, {
        status: 400
      });
    }

    const {username} = result.data; 
    const existingVerifiedUser = await UserModel.findOne({username: username, isVerified: true})

    if (existingVerifiedUser){
      return Response.json({
        success: false,
        error: "Username already exists"
      }, {
        status: 400
      });
    }
    return Response.json({
      success: true,
      message: "Username is unique"
    }, { status: 200 });
    
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