'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import {useDebounceCallback } from 'usehooks-ts'
// import {useToast} from "@/components/ui/sonner"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
// import { set } from "mongoose"
import axios , {AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button"

export default function SignUpForm() {

  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);

  // const {toast} = useToast(); //deppriciated
  const router = useRouter();

  //zod implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      username: "", 
      email: "",
      password: "",
    }
  });

  useEffect(() => {
    const checkUsernameUniqueness = async () => {
      if(username){
        setIsCheckingUsername(true);
        setUsernameMessage(""); // as there are chances that usernameMessage is already set //taken or Unique
        try{
          const response = await axios.get(`/api/check-username-uniqueness?username=${username}`);
          setUsernameMessage(response.data.message);
        } catch(error){
          const axiosError = error as AxiosError <ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message?? 'Error checking Username');            
        }
        finally{
          setIsCheckingUsername(false);
        }
      }
    }
    checkUsernameUniqueness();
  },
  [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try{
      const response = await axios.post('/api/sign-up', data);
      toast.success(response.data?.message || 'Signed up successfully');

      router.push(`/verify/${username}`);
    } catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError?.response?.data?.message || 'Error signing up');
      
    }
    finally{
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lakshya"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value); //debounced instead of"setUsername" as it is how we use debounced
                      }}
                    />
                  </FormControl>
                  {
                    isCheckingUsername && <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  }
                  <p className = {usernameMessage === "Username is unique" ? "text-green-500" : "text-red-500"}>{usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="lakshyababel@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </FormProvider>

        {/* Sign-in Link */}
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

