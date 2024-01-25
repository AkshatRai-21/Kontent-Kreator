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
    const body = await req.json();
    const { prompt,amount } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    
    const parsedAmount = parseInt(amount);

    if ( isNaN(parsedAmount)) {
      return new NextResponse("Invalid input values", { status: 400 });
    }
    

    const response = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: prompt,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: parsedAmount,
          guidance_scale: 7.5,
          apply_watermark: false,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 50
        }
      }
    );


    // const response = await replicate.run(
    //     "zylim0702/qr_code_controlnet:628e604e13cf63d8ec58bd4d238474e8986b054bc5e1326e50995fdbc851c557",
    //     {
    //       input: {
    //         eta: 0,
    //         url: submittedURL,
    //         prompt: prompt,
    //         scheduler: "DDIM",
    //         guess_mode: false,
    //         num_outputs: 1,
    //         guidance_scale: 9,
    //         negative_prompt: "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
    //         image_resolution: 768,
    //         num_inference_steps: 20,
    //         disable_safety_check: false,
    //         qr_conditioning_scale: 1.3
    //       }
    //     }
    //   );

     console.log("Yeh response ayya hai",response);
  

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[TWEET_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
