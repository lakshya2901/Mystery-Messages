'use client'

import { messageSchema } from "@/schemas/messageSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { useCompletion } from '@ai-sdk/react'
import * as z from "zod"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { ApiResponse } from "@/types/ApiResponse"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, Loader2 } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
import { useState } from "react"
import { Separator } from "@radix-ui/react-separator"
  

const specialChar = "||";
const parseStringMessages = (messageString: string) : string[] => {
    return messageString.split(specialChar);
}

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";


export default function SendMessages(){
    const params = useParams();
    const username = params.username as string;

    const { complete, completion, isLoading: isSuggestLoading, error } = useCompletion({
        api: '/api/suggest-message',
        initialInput: initialMessageString,
      });

    
    const form = useForm<z.infer<typeof messageSchema>>({
          resolver: zodResolver(messageSchema),
      })

    const messageContent = form.watch("content");
    const handleMessageClick = (message: string) => {
        form.setValue("content", message);
    }
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(values: z.infer<typeof messageSchema>)=> {
       setIsLoading(true);
       try{
            await axios.post('/api/send-message', {
                ...values,
                username,
           })
           
           toast.success("Message sent successfully!")

           form.reset({
                ...form.getValues(),
                content: ""
              })

       }catch (error){
            const axiosError = error as AxiosError<ApiResponse>;
            if (axiosError.response) {
                toast.error(axiosError.response.data.message || "An error occurred while sending the message.");
            } else {
                toast.error("An unexpected error occurred.");
            }
       }
       finally {
            setIsLoading(false);
       }
      }

    const fetchSuggestedMessages = async () => {
        try {
            complete('');
        } catch (error) {
            console.error("Error fetching suggested messages:", error);
        }
    }
    
    return(
        <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Public Profile Link
            </h1>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                    <FormControl>
                        <Input placeholder="Write your anonymous message here"
                    className="resize-none" {...field} />
                    </FormControl>
                   
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex-justify-center">
                    {isLoading? <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin">
                            please wait
                        </Loader2>
                    </Button> : <Button type = "submit" disabled = {isLoading || !messageContent}> send it </Button>
                    }
                </div>
                <Button type="submit">Submit</Button>
            </form>
            </Form>
            <div className="space-y-4 my-8">
                <div className="space-y-2">
                    <Button onClick={fetchSuggestedMessages} disabled={isSuggestLoading}>
                        {isSuggestLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Suggested Messages"}
                    </Button>
                    <p> click on any message to select it.</p>
                </div>
                <Card>
                <CardHeader>
                    <h3 className="text-xl font-semibold">Messages</h3>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    {error? (
                        <p className="text-red-500">Error fetching messages: {error.message}</p>
                    ) : (
                        parseStringMessages(completion).map((message, index) => (
                            <Button key={index} variant="outline" onClick={() => handleMessageClick(message)} className="w-full text-left">
                                {message}
                            </Button>
                        )
                        )
                    )}
                </CardContent>
                
                </Card>
                </div>
                <Separator className="my-6" />
                <div className="text-center">
                    <div className="mb-4">Get Your Message Board</div>
                    <Link href={'/sign-up'}>
                    <Button>Create Your Account</Button>
                    </Link>
                </div>

            
        </div>
    )

}