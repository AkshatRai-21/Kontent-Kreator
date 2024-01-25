"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { Download, FileAudio, QrCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema, promptSuggestions } from "./constants";
import { PromptSuggestion } from "@/components/PromptSuggestion";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const QRCodePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [GeneratedQr, setGeneratedQr] = useState<string | null>(null);
  //   const [submittedURL, setSubmittedURL] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      submittedURL: "",
    },
  });

  const handleSuggestionClick = (selectedSuggestion: string) => {
    form.setValue("prompt", selectedSuggestion); // Assuming "prompt" is the name of your prompt field
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setGeneratedQr("");
      const response = await axios.post("/api/qr-code", values);
      
      
      setGeneratedQr(response.data[0]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="QR Code Generation"
        description="Generate your next AI QR Code in seconds"
        icon={QrCodeIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />

      <div className="flex justify-center items-center flex-col w-full  py-3 px-7 sm:mb-28 mb-0">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
          {/* <h1 className="text-3xl font-bold mb-10">Generate a QR Code</h1> */}
          <div className="col-span-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="submittedURL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="roomgpt.io" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is what your QR code will link to.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prompt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A city view with clouds"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="">
                          This is what the image in your QR code will look like.
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="my-2">
                    <p className="text-sm font-medium mb-3">
                      Prompt suggestions
                    </p>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm">
                      {promptSuggestions.map((suggestion) => (
                        <PromptSuggestion
                          key={suggestion.value}
                          suggestion={suggestion.label}
                          onClick={() =>
                            handleSuggestionClick(suggestion.label)
                          }
                          isLoading={isLoading}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </form>
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </Form>
          </div>

          
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
            {!GeneratedQr && !isLoading && (
              <div className="col-span-1 relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto max-w-full">
                <Empty label="No QR  generated Yet." />
              </div>
            )}

            {GeneratedQr && !isLoading && (
              <div className="col-span-1">
                <Card key={GeneratedQr} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image fill alt="Generated" src={GeneratedQr} />
                  </div>
                  <CardFooter className="p-2">
                    <Button
                      onClick={() => window.open(GeneratedQr)}
                      variant="secondary"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default QRCodePage;
