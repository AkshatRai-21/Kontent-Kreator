import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  TwitterIcon,
  FilmIcon,
  ProjectorIcon,
  ArchiveRestoreIcon,
  HomeIcon,
  QrCodeIcon,
  RocketIcon,
  FileCheckIcon,
  FileCheck,
  ChromeIcon,
  SmilePlusIcon,
  RefreshCcwIcon
} from "lucide-react";
import client1 from "@/public/client1.png";
import client2 from "@/public/client2.png";
import client3 from "@/public/client3.png";
import client4 from "@/public/client4.png";
import client5 from "@/public/client5.png";
import client6 from "@/public/client6.png";
import client7 from "@/public/client7.png";
import client8 from "@/public/client8.png";
import client9 from "@/public/client9.png";
import client10 from "@/public/client10.png";
import client11 from "@/public/client11.png";

// export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
  {
    label: "Tweet Generation",
    icon: TwitterIcon,
    color: "text-blue-700",
    bgColor: "bg-white-700/10",
    href: "/tweet-generator",
  },
  {
    label: "Film Generation",
    icon: ProjectorIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/movie",

  },
  {
    label: "Restore Photo",
    icon: ArchiveRestoreIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/restore-photo",

  },
  {
    label: "Interior Ai Designs Generate ",
    icon: HomeIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/interior-designs",
  },
  {
    label: "Ai Qr Code Generate ",
    icon: QrCodeIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/qr-code-generator",
  },
  {
    label: "Ai Anime Creator ",
    icon: RocketIcon,
    color: "text-white-700",
    bgColor: "bg-white-700/10",
    href: "/anime",
  },

  {
    label: "Emoji Generator",
    icon: SmilePlusIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/emoji",
  },

  {
    label: "Excuse Generator",
    icon: RefreshCcwIcon ,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/excuse",
  },
];

export const CLIENTS = [
  { alt: "client1", logo: client1 },
  { alt: "client2", logo: client2 },
  { alt: "client3", logo: client3 },
  { alt: "client4", logo: client4 },
  { alt: "client5", logo: client5 },
  { alt: "client6", logo: client6 },
  { alt: "client7", logo: client7 },
  { alt: "client8", logo: client8 },
  { alt: "client9", logo: client9 },
  { alt: "client10", logo: client10 },
  { alt: "client11", logo: client11 },
];

export const USERS = [
  {
    name: "Alice",
    message:
      "The AI image generation tool provided by this platform is unparalleled. It has significantly boosted our creativity and efficiency in content creation.",
  },
  {
    name: "Bob",
    message:
      "The video generation tool from this platform is a game-changer for our multimedia projects. It simplifies the process and enhances the overall quality of our videos.",
  },
  {
    name: "Charlie",
    message:
      "Our team relies on the conversation generation tool from this platform for generating engaging and dynamic dialogues. It has become an indispensable asset for our projects.",
  },
  {
    name: "David",
    message:
      "The music generation tool offered by this platform has exceeded our expectations. It has added a unique and personalized touch to our audio content, enhancing our user experience.",
  },
  {
    name: "Ella",
    message:
      "The SaaS platform's image and video generation tools have streamlined our workflow. We now create visually stunning content with ease, thanks to the innovative features provided.",
  },
  {
    name: "Frank",
    message:
      "The page loading state and full responsiveness of this platform are remarkable. Our users experience smooth transitions, creating a seamless and enjoyable browsing experience.",
  },
  {
    name: "Grace",
    message:
      "The integration of Clerk Authentication and Stripe monthly subscription makes managing user accounts and payments a breeze. It adds a layer of security and convenience to our platform.",
  },
  {
    name: "Hank",
    message:
      "The ability to handle relations between server and child components has significantly improved our application architecture. It's a key factor in the scalability of our SaaS platform.",
  },
  {
    name: "Ivy",
    message:
      "The reuse of layouts and well-defined folder structure in the Next 13 App Router has simplified our development process. It ensures consistency and maintainability across our application.",
  },
  {
    name: "Jack",
    message:
      "With the free tier offering and API limiting, our users can explore the platform without a credit card. It encourages wider adoption and provides a smooth onboarding experience.",
  },
  {
    name: "Katherine",
    message:
      "The capability to write POST, DELETE, and GET routes in route handlers has given us flexibility in managing data. It aligns perfectly with our server-side requirements.",
  },
  {
    name: "Liam",
    message:
      "The direct access to the database in server React components has enhanced our data fetching capabilities. It's a powerful feature that accelerates our application's performance.",
  },
  {
    name: "Mia",
    message:
      "The image and video generation tools provided by the platform are cutting-edge. They play a crucial role in our multimedia content production, making it more dynamic and engaging.",
  },
  {
    name: "Nathan",
    message:
      "The music generation tool has added a new dimension to our audio content. It's impressive how AI-driven music creation contributes to our platform's overall user experience.",
  },
  {
    name: "Olivia",
    message:
      "The server error handling using react-toast ensures a smooth user experience even in challenging situations. It adds a layer of reliability to our platform.",
  },
  {
    name: "Paul",
    message:
      "The SaaS platform's tools for conversation and music generation have brought unparalleled innovation to our services. Users now experience a blend of creativity and functionality.",
  },
  {
    name: "Quinn",
    message:
      "The seamless integration of Stripe monthly subscription aligns perfectly with our business model. It simplifies the subscription management process for both our users and our team.",
  },
  {
    name: "Rachel",
    message:
      "The folder structure in the Next 13 App Router has brought order to our codebase. It's a foundation for a scalable and maintainable architecture, ensuring long-term success.",
  },
  {
    name: "Sam",
    message:
      "The saas platform's capabilities for image and video generation have transformed our content creation process. Our team now produces high-quality visuals with efficiency and ease.",
  },
];

export const PRICING_CARDS = [
  {
    planType: "Free Tier",
    price: "0",
    description: "AI-powered content creation with limited access",
    highlightFeature: "",
    features: [
      "AI Image Generation",
      "AI Video Generation",
      "AI Conversation Generation",
      "Limited Access to Music Generation",
      "Limited Access to Premium Effects",
      "API Limiting",
    ],
    maxFolders: 5, // Updated maximum folder count for the Free Tier
  },
  {
    planType: "Premium Plan",
    price: "19.99",
    description:
      "Billed monthly. Unlock the full potential of AI content creation.",
    highlightFeature: "Everything in Free Tier +",
    features: [
      "Unlimited Access to AI Tools",
      "Full Library of Premium Effects",
      "Advanced AI Music Generation",
      "Priority Customer Support",
      "No API Limiting",
      "Stripe Monthly Subscription",
    ],
    maxFolders: Infinity,
  },
];

export const PRICING_PLANS = { premium: "Premium Plan", free: "Free Tier" };

export const MAX_FREE_COUNTS = 5;
