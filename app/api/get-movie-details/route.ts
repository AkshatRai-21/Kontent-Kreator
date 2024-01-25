import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";



const omdbApiKey =  process.env.OMDB_API_KEY;
  

export async function POST(
    req: Request
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();
      const { title } =body;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!title) {
        return new NextResponse("Title is required", { status: 400 });
      }

      

      const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}`;
      const response = await axios.get(url);
  
     
  
      return NextResponse.json(response.data) ;
    } catch (error) {
      console.log('[OMDB_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  