'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

import { User } from "next-auth"
import { Button } from "./ui/button"

export default function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md shadow-gray-300 bg-white text-black border-b border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="#" className="text-2xl font-bold mb-4 md:mb-0">
          Mystery Message
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-gray-700 font-medium">Welcome, {user.username || user.email}</span>
              <Button 
                onClick={() => signOut()} 
                className="w-full md:w-auto bg-black hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button 
                className="w-full md:w-auto bg-black hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}