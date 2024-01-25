"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";

import { Uploader } from "uploader"; // Installed by "react-uploader".
import {  UploadDropzone } from "react-uploader";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {  Download } from "lucide-react";
import Head from "next/head";
import { Loader } from "@/components/loader";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



// Initialize once (at the start of your app).
const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
});

const options = {
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  multi: false,
  styles: {
    colors: {
      primary: "#377dff",
    },
    fontFamilies: {
      base: "arial, sans-serif",
    },
    fontSizes: {
      base: 16,
    },
  },
};

const RestorePhotoPage = () => {
  const router = useRouter();
  const proModal = useProModal();

  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
 

  


  const UploadDropZone = () => (
    <UploadDropzone
    uploader={uploader}
    options={options}
    onUpdate={( file ) => {
          
         if(file.length !==0){
          setOriginalPhoto(file[0].fileUrl.replace("raw","thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw","thumbnail"));
         }
    }}
    width="670px"
    height="250px"
  />
  );

  const generatePhoto = async function (fileUrl: string) {
    try {
      setLoading(true);
      console.log(fileUrl);
      

      // const response = await axios.post('/api/restore-photo', fileUrl ); // Wrap fileUrl in an object
      
      const response = await fetch('/api/restore-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileUrl }),
      });
      
      let newphoto= await response.json();
      setRestoredImage( newphoto);
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        console.log(error);
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
    <Head>
      <title>Restore Photos</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>


    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
    
       
        
      <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5">
        Restore any face photo
      </h1>
       
        
      
      <div className="flex justify-between items-center w-full flex-col mt-4">
        {!originalPhoto && <UploadDropZone />}
        {originalPhoto && !restoredImage && (
          <Image
            alt="original photo"
            src={originalPhoto}
            className="rounded-2xl"
            width={475}
            height={475}
          />
        )}
          {restoredImage && originalPhoto  && (
          <div className="flex sm:space-x-4 sm:flex-row flex-col">
            <div>
              <h2 className="mb-1 font-medium text-lg">Original Photo</h2>
              <Image
                alt="original photo"
                src={originalPhoto}
                className="rounded-2xl relative"
                width={475}
                height={475}
              />
            </div>
            <div className="sm:mt-0 mt-8">
              <h2 className="mb-1 font-medium text-lg">Restored Photo</h2>
              <a href={restoredImage} target="_blank" rel="noreferrer">
                <Image
                  alt="restored photo"
                  src={restoredImage}
                  className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in"
                  width={475}
                  height={475}
                  onLoadingComplete={() => setRestoredLoaded(true)}
                />
                 <Button onClick={() => window.open(restoredImage as string)} variant="secondary" className="w-full">
               <Download className="h-4 w-4 mr-2" />
               Download
             </Button>
              </a>
            </div>
          </div>
        )}
     
        {loading && (
          <button
            disabled
            className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
          >
            <span className="pt-4">
              <Loader />
            </span>
          </button>
        )}
   
        <div className="flex space-x-2 justify-center">
          {originalPhoto && !loading && (
            <button
              onClick={() => {
                setOriginalPhoto(null);
                setRestoredImage(null);
                setRestoredLoaded(false);

               
              }}
              className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 transition"
            >
              Upload New Photo
            </button>
          )}
          {restoredLoaded && (
           <Card key={restoredImage} className="rounded-lg overflow-hidden">
           <div className="relative aspect-square">
             <Image
               fill
               alt="Restored Image"
               src={restoredImage as string}
             />
           </div>
          
         </Card>
          )}
        </div>
      </div>
    </main>
  </div>
  );
};

export default RestorePhotoPage;
