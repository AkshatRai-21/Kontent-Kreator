"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomCard from "./custom-card";
import TitleSection from "./title-section";
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";


import Diamond from '@/public/icons/diamond.svg';
import CheckIcon from '@/public/icons/check.svg';

import clsx from "clsx";
import { PRICING_CARDS, PRICING_PLANS, USERS } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Button } from "./ui/button";

export const LandingContent = () => {
 
  const { isSignedIn } = useAuth();


  return (
    <div className="px-10 pb-20 ">
      <div
        className="w-full
          blur-[120px]
          rounded-full
          h-32
          absolute
          bg-brand-primaryPurple/50
          -z-100
          top-40
        "
      />
      <div
        className="mt-20
          px-4
          sm:px-6 
          flex
          flex-col
          overflow-x-hidden
          overflow-visible
        "
      >
        <TitleSection
          title="Trusted by all"
          subheading="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
          pill="Testimonials"
        />
        {[...Array(2)].map((arr, index) => (
          <div
            key={crypto.randomUUID()}
            className={twMerge(
              clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                "flex-row-reverse": index === 1,
                "animate-[slide_250s_linear_infinite]": true,
                "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                "ml-[100vw]": index === 1,
              }),
              "hover:paused"
            )}
          >
            {USERS.map((testimonial, index) => (
              <CustomCard
                key={testimonial.name}
                className="w-[500px]
                  shrink-0s
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
                cardHeader={
                  <div
                    className="flex
                      items-center
                      gap-4
                  "
                  >
                    <Avatar>
                      <AvatarImage src={`/avatars/${index + 1}.png`} />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-foreground">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="dark:text-washed-purple-800">
                        {testimonial.name.toLocaleLowerCase()}
                      </CardDescription>
                    </div>
                  </div>
                }
                cardContent={
                  <p className="dark:text-washed-purple-800">
                    {testimonial.message}
                  </p>
                }
              ></CustomCard>
            ))}
          </div>
        ))}
      </div>

      <section
        className="mt-20
        px-4
        sm:px-6
      "
      >
        <TitleSection
          title="The Perfect Plan For You"
          subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
          pill="Pricing"
        />
        <div
          className="flex 
        flex-col-reverse
        sm:flex-row
        gap-4
        justify-center
        sm:items-stretch
        items-center
        mt-10
        "
        >
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={clsx(
                'w-[300px] rounded-2xl dark:bg-black/40 background-blur-3xl relative',
                {
                  'border-brand-primaryPurple/70':
                    card.planType === PRICING_PLANS.premium,
                }
              )}
              cardHeader={
                <CardTitle
                  className="text-2xl
                  font-semibold
              "
                >
                  {card.planType === PRICING_PLANS.premium && (
                    <>
                      <div
                        className="hidden dark:block w-full blur-[120px] rounded-full h-32
                        absolute
                        bg-brand-primaryPurple/80
                        -z-10
                        top-0
                      "
                      />
                      <Image
                        src={Diamond}
                        alt="Pro Plan Icon"
                        className="absolute top-6 right-6"
                      />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0">
                  <span
                    className="font-normal 
                    text-2xl
                "
                  >
                    ${card.price}
                  </span>
                  {+card.price > 0 ? (
                    <span className="dark:text-washed-purple-800 ml-1">
                      /mo
                    </span>
                  ) : (
                    ''
                  )}
                  <p className="dark:text-washed-purple-800">
                    {card.description}
                  </p>
                  <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                  <Button
                    variant="premium"
                    className="whitespace-nowrap w-full mt-4"
                  >
                    {card.planType === PRICING_PLANS.premium
                      ? 'Go Pro'
                      : 'Get Started'}
                  </Button>
                  </Link>
                 
                </CardContent>
              }
              cardFooter={
                <ul
                  className="font-normal
                  flex
                  mb-2
                  flex-col
                  gap-4
                "
                >
                  <small>{card.highlightFeature}</small>
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex
                      items-center
                      gap-2
                    "
                    >
                      <Image
                        src={CheckIcon}
                        alt="Check Icon"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </section>

    </div>
  );
};
