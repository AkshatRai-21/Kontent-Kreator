"use client";

import * as z from "zod";
import axios from "axios";
import { RefreshCcwIcon, TwitterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

// Define the ChatCompletionRequestMessage type
interface ChatCompletionRequestMessage {
  role: string;
  content: string;
}

const ExcusePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [tweet, setTweet] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setTweet("");

      const response = await axios.post("/api/excuse", values);

      setTweet(response.data);
      form.reset();
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
    <div>
      <Heading
        title="Excuse Generation"
        description="llama-2-70b-chat |Your Convenient Escape: Crafting Creative Excuses with Ease!"
        icon={RefreshCcwIcon}
        iconColor="text-blue-500"
        bgColor="bg-white-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Excuse Express: Your Fun Partner in Crime for Turning Life's Oops Moments into Hilariously Crafted Explanations, Making Everyday Hiccups a Giggle-Filled Adventure!"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {tweet.length === 0 && !isLoading && (
            <Empty label="No Excuse Generated." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {tweet && !isLoading && (
              <div className="p-4 rounded-lg bg-gray-100 relative">
                <p className="text-lg font-bold mb-2">Generated Excuses</p>
                <p className="text-sm italic text-gray-700">{tweet}</p>
                <CopyToClipboard
                  text={tweet}
                  onCopy={() => toast.success("Copied to clipboard!")}
                >
                  <button
                    className="absolute top-0 right-0 p-2 text-blue-500 hover:underline focus:outline-none"
                    aria-label="Copy to Clipboard"
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcusePage;
