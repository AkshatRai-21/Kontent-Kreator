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
    
    // const response = await replicate.run(
    //   "jingyunliang/swinir:a6655af5d286c0362310303ace66a638b0e1e01be584a327f18d0d6c8c00025a",
    //   {
    //     input: {
    //       jpeg: "40",
    //       image: fileUrl,
    //       noise: "15",
    //       task_type: "Real-World Image Super-Resolution"
    //     }
    //   }
    // );

    const response = await replicate.run(
      "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
      {
        input: {
          image: fileUrl,
          upscale: 1,
          face_upsample: true,
          background_enhance: true,
          codeformer_fidelity: 0.7
        }
      }
    );

    // console.log("YEH REPLY AAYA HAI",response.json);
  

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[RESTORE_IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
