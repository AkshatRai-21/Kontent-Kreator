import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount="1", height="512", width="512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const parsedWidth = parseInt(width);
    const parsedHeight = parseInt(height);
    const parsedAmount = parseInt(amount);

    if (isNaN(parsedWidth) || isNaN(parsedHeight) || isNaN(parsedAmount)) {
      return new NextResponse("Invalid input values", { status: 400 });
    }

    const response = await replicate.run(
      "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
      {
        input: {
          width: parsedWidth,
          height: parsedHeight,
          prompt: `masterpiece, best quality, illustration, beautiful detailed, finely detailed, dramatic light, intricate details, 1girl,
          brown hair, green eyes, colorful, autumn, cumulonimbus clouds, lighting, blue sky, falling leaves, garden ${prompt}`,
          scheduler: "DPMSolverMultistep",
          num_outputs: parsedAmount,
          guidance_scale: 12,
          negative_prompt:
            "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name",
          num_inference_steps: 50,
        },
      }
    );

    console.log("Yeh response ayya hai", response);

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("[TWEET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
