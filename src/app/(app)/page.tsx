'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import messages from "@/messages.json"
import { useRouter } from "next/navigation"



const Home = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-24 py-16">
        
        {/* Hero Section */}
        <section className="text-center mb-16 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Dive into the World of Anonymous Messages
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700">
            Mystery Messages — Where your thoughts flow freely and your identity remains a secret.
          </p>
          
        </section>
        
        {/* Features Section */}
        <section className="max-w-5xl mx-auto text-center mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Complete Anonymity</h3>
            <p className="text-gray-600">Share your thoughts without revealing your identity. Feel free to express yourself.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Real Connections</h3>
            <p className="text-gray-600">Build genuine connections based on honesty without social pressure.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Instant Delivery</h3>
            <p className="text-gray-600">Messages are delivered instantly and securely to recipients.</p>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            How It Works
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all w-full md:w-1/3">
              <div className="w-12 h-12 mx-auto mb-4 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Create an account</h3>
              <p className="text-gray-600">Sign up in seconds with just your email address</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all w-full md:w-1/3">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Share your link</h3>
              <p className="text-gray-600">Share your unique profile link with friends or on social media</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all w-full md:w-1/3">
              <div className="w-12 h-12 mx-auto mb-4 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Receive messages</h3>
              <p className="text-gray-600">Get anonymous feedback, confessions, and messages</p>
            </div>
          </div>
        </section>
        
        {/* Testimonials Carousel */}
        <section className="mb-20 w-full max-w-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Real Experiences
          </h2>
          
          <Carousel 
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-indigo-50">
                      <CardHeader className="text-center pb-2">
                        <h2 className="text-xl font-semibold text-indigo-700">{message.title}</h2>
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-8 text-center">
                        <p className="text-lg font-medium text-gray-700">{message.content}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static transform-none rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-0" />
              <CarouselNext className="relative static transform-none rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-0" />
            </div>
          </Carousel>
        </section>
        
        {/* CTA Section */}
        <section className="w-full max-w-4xl mb-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to experience anonymous freedom?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of users who are already enjoying honest feedback and authentic connections.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:shadow-lg transition-all" onClick={()=> router.push('/sign-up')}>
              Create Account
            </button>
              
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="text-center p-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="border-t border-indigo-800 pt-6">
          <p>© 2025 Mystery Messages. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home