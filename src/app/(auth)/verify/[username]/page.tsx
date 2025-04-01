'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";



const VerifyAccount = ()=>{

    const router = useRouter();
    const params = useParams<{username:string}>();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    });
    
    const onSubmit = async (data: z.infer <typeof verifySchema>) => {
        try{
            const response = await axios.post("/api/verify-code", {
                username: params.username,
                code: data.code
        })
        toast.success(response.data.message);

        router.push("/sign-in");
        }catch(error){
            console.error("Error in verifying account", error);

            const axiosError = error as AxiosError<ApiError>;
            toast.error(axiosError.response?.data.message || "Error verifying account");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white p-8 rounded-lg shadow-md ">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-center">Verify Account</h1>
                </div>
                    <Form{...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Verification code</FormLabel>
                                <FormControl>
                                    <Input placeholder="code" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>    
            </div>
           
        </div>
    )
}

export default VerifyAccount;