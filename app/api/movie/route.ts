import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import axios from "axios";

const omdbApiKey = process.env.OMDB_API_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


 export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    let { prompt } = body;
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
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

    if (!isPro) {
      await incrementApiLimit();
    }

    const response = await openai.chat.completions.create({
      messages: [
        { role: "user", content: prompt },
        { role: "assistant", content: "You are a helpful movie recommender." },
      ],
      model: "gpt-3.5-turbo-0613",
    });

    const assistantResponse = response.choices[0]?.message?.content || '';
    const movieTitles = assistantResponse.match(/\"(.*?)\"/g) || [];
    // console.log("Yeh movie ke titles hai",movieTitles);
    


   

    const movieDetails = [];

    for (const title of movieTitles) {
      // const cleanTitle = title.replace(/"/g, ''); // Remove quotes from the title
  
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(title)}`);
        // console.log(response.data);
        const details = response.data;
  
        if (details.Response === 'True') {
          movieDetails.push({
            title: details.Title,
            posterUrl: details.Poster,
          });
        } else {
          console.error(`Error fetching details for ${title}: Movie not found`);
        }
      } catch (error) {
        console.error(`Error fetching details for ${title}: ${error}`);
      }
    }
  

    

    //  console.log("Yeh meri apni movies hain",movieDetails);

    return NextResponse.json(movieDetails);
  } catch (error) {
    console.log("[MOVIE_DETAILS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
