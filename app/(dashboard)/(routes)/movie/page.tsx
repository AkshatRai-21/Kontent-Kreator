"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FilmIcon, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryOptions, formSchema, cinemaOptions } from "./constants";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProModal } from "@/hooks/use-pro-modal";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { Empty } from "@/components/ui/empty";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface Recommendation {
  title: string;
  posterUrl: string;
}

const MoviePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      categories: [],
      cinemaType: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const fullSearchCriteria = `Give me a list of 
      ${values.cinemaType} recommendations ${
        values.categories
          ? `that fit all of the following categories: ${values.categories}`
          : ""
      }. ${
        values.prompt
          ? `Make sure it fits the following description as well: ${values.prompt}.`
          : ""
      } ${
        values.categories || values.prompt
          ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${values.cinemaType}'s that I might like.`
          : ""
      } Please return this response as a list with the ${
        values.cinemaType
      }'s title and no matter what give atleast 5 movies`;

      const response = await axios.post("/api/movie", {
        ...values,
        fullSearchCriteria,
      });
      setRecommendations(response.data);
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
        title="AI MOVIE Recommendation"
        description="Get curated show or movie recommendations with Open AI"
        icon={FilmIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-1 gap-2">
              <div className="space-y-2 w-full col-span-12">
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6 rounded-lg border px-3 py-4">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent py-3 px-4"
                          disabled={isLoading}
                          placeholder="A picture of a horse in Swiss alps"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem className="col-span-2 md:col-span-1 ">
                      <FormLabel className="text-base">
                        Select all categories that you want the show or movie to
                        include.
                      </FormLabel>
                      {/* <FormDescription></FormDescription> */}

                      <ScrollArea className="h-72 w-48 rounded-md border">
                        <div className="p-4">
                          {categoryOptions.map((category) => (
                            <FormField
                              key={category.value}
                              control={form.control}
                              name="categories"
                              render={({ field }) => {
                                return (
                                  <FormItem key={category.value}>
                                    <>
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            category.label
                                          )}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              // If checked, add the category label to the array
                                              const updatedValue = [
                                                ...(field.value ?? []),
                                                category.label,
                                              ];
                                              field.onChange(updatedValue);
                                            } else {
                                              // If unchecked, remove the category label from the array
                                              const updatedValue =
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== category.label
                                                );
                                              field.onChange(updatedValue);
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel>{category.label}</FormLabel>
                                    </>
                                    <Separator className="my-4" />
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      </ScrollArea>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cinemaType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">
                        What kind of cinema are you searching for?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={cinemaOptions[0].value}
                          className="flex flex-col space-y-1"
                        >
                          {cinemaOptions.map((option) => (
                            <FormItem
                              key={option.value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.title}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-center py-4 ">
              <Button size="lg" disabled={isLoading}>
                {"Get Recommendation"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {recommendations.length === 0 && !isLoading && (
          <Empty label="No Movies Recommended." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {recommendations.map((item) => (
            <Card key={item.title} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={item.posterUrl} />
              </div>
              <CardFooter className="p-2">
               
                <p className="mt-2 text-center text-gray-700">{item.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
