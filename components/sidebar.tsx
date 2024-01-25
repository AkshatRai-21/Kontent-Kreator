"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  TwitchIcon,
  TwitterIcon,
  ProjectorIcon,
  ArchiveRestoreIcon,
  HomeIcon,
  QrCodeIcon,
  RocketIcon,
  SmilePlusIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Tweet Generation",
    icon: TwitterIcon,
    color: "text-blue-700",
    href: "/tweet-generator",
  },
  
  {
    label: "Film Generation",
    icon: ProjectorIcon,
    color: "text-violet-500",
    href: "/movie",
  },
  {
    label: "Restore Photo",
    icon: ArchiveRestoreIcon,
    color: "text-emerald-500",
    href: "/restore-photo",
  },
  {
    label: "Interior Ai Designs Generate ",
    icon: HomeIcon,
    color: "text-pink-700",
    href: "/interior-designs",
  },
  {
    label: "Ai Qr Code Generate ",
    icon: QrCodeIcon,
    color: "text-orange-700",
    href: "/qr-code-generator",
  },
  {
    label: "Ai Anime Creator ",
    icon: RocketIcon,
    color: "text-white-700",
    href: "/anime",
  },
  {
    label: "Emoji Generator",
    icon: SmilePlusIcon,
    color: "text-green-700",
    href: "/emoji",
  },
  {
    label: "Excuse Generator",
    icon: RefreshCcwIcon ,
    color: "text-yellow-700",
    href: "/excuse",
  },
  {
    label: "Settings",
    icon: Settings,
    color: "text-gray-500", // Add the color property here
    href: "/settings",
  }
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <Link href="/dashboard" className="flex items-center pl-3 mb-14">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold", poppins.className)}>
          Kontent Kreator
        </h1>
      </Link>

      <div className="flex-1 px-3">
        <ScrollArea className="px-5 rounded-md border h-72 w-30 overflow-y-auto border-white">
          <div className="py-4">
            {routes.map((route) => (
              <>
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex py-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                  {/* <Separator className="my-2" /> */}
                </div>
                
              </Link>
              <Separator className="my-1 text-white" />
              </>
              
            ))}
          </div>

          <div></div>
        </ScrollArea>
      </div>

      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};
