import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    console.log("User Id:",userId);
    const body=await req.json();
    const {fileUrl} = body;
    console.log("imageUrl:", fileUrl);


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!fileUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }
    
   

    const response = await replicate.run(
      "catio-apps/interioraidesigns-generate:9e0b15ac47a5a6502175cfab3853d88413f4fd4bee8da0509deb0895db96d0a7",
      {
        input: {
          seed: 0,
          image: fileUrl,
          steps: 10,
          width: 475,
          prompt: "rustic"
        }
      }
    );

    console.log("YEH REPLY AAYA HAI",response);
  

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[RESTORE_IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
