"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Banner from "../public/appBanner.png";
import { CLIENTS } from "@/constants";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5 pb-0">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Movie Recommendations.",
                "Image Restoration.",
                "Tweet Generation .",
                "Room Design Recommendations .",
                "Qr Code Generation.",
                "Anime Creation.",
                "Emoji Generation.",
                "Excuse Generation.",
                "Chatbot.",
                "Photo Generation.",
                "Blog Writing.",
                "Mail Writing.",
                
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
      <div
        className="md:mt-[-90px]
          sm:w-full
          w-[400px]
          flex
          justify-center
          items-center
          mt-[-40px]
          relative
          sm:ml-0
          ml-[-50px]
          mb-50px
        "
      >
        <Image
          src={Banner}
          alt="Application Banner"
          className="rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border-4 border-white" // Adjust border width as needed
        />

        <div
          className="bottom-0
            top-[75%]
            bg-gradient-to-t
            dark:from-background
            left-0
            right-0
            absolute
            z-20
          "
        ></div>
      </div>
      
        <div
          className="overflow-hidden
          flex
          after:content['']
          after:dark:from-brand-dark
          after:to-transparent
          after:from-background
          after:bg-gradient-to-l
          after:right-0
          after:bottom-0
          after:top-0
          after:w-20
          after:z-10
          after:absolute

          before:content['']
          before:dark:from-brand-dark
          before:to-transparent
          before:from-background
          before:bg-gradient-to-r
          before:left-0
          before:top-0
          before:bottom-0
          before:w-20
          before:z-10
          before:absolute
        "
        >
          {[...Array(2)].map((arr) => (
            <div
              key={arr}
              className="flex
                flex-nowrap
                animate-slide
          "
            >
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className=" relative
                    w-[200px]
                    m-20
                    shrink-0
                    flex
                    items-center
                  "
                  style={{ minWidth: '200px', maxWidth: '200px', minHeight: '100px', maxHeight: '100px' }}
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    height={100} // Set a fixed height
                    className="object-contain max-w-none"
                    layout="responsive"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      
    </div>
  );
};
