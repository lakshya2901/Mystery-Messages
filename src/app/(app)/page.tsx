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
const Home = () => {
  return (
    <div>
        <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-50 text-gray-800">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Messages
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Mystery Messages - Where your identity remains a secret.
          </p>
        </section>
        <section className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Why Choose Mystery Messages?
          </h2>
          <p className="text-base md:text-lg">
            Experience the freedom of sharing your thoughts without revealing your identity. 
          </p>
        </section>
        <section className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">
                How It Works
            </h2>
            <p className="text-base md:text-lg">
                1. Create an account<br/>
                2. Share your unique link<br/>
                3. Receive anonymous messages and feedback<br/>
            </p>
        </section>
        
        <Carousel plugins={[Autoplay({delay: 2000})]} className="w-full max-w-xs">
          
          <CarouselContent>
            {
              messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardHeader className="text-center">
                        <h2 className="text-xl font-semibold">{message.title}</h2></CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            }

          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        <footer className="text-center p-4 md:p-6 bg-gray-50 text-gray-800
        ">
        © 2025 Mystery Messages. All rights reserved.
        </footer>

        </main>
    </div>
  )
}

export default Home