import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1,{
    message: "Photo prompt is required"
  }),
  amount: z.string().min(1),
  height: z.string().min(1),
  width: z.string().min(1),
});

export const amountOptions = [
  { value: "1", label: "1 Photo" },
  { value: "2", label: "2 Photos" },
  { value: "3", label: "3 Photos" },
  { value: "4", label: "4 Photos" },
  { value: "5", label: "5 Photos" },
];

export const heightOptions = [
  { value: "256", label: "256" },
  { value: "512", label: "512" },
  { value: "640", label: "640" },
  { value: "1024", label: "1024" },
];

export const widthOptions = [
  { value: "256", label: "256" },
  { value: "512", label: "512" },
  { value: "640", label: "640" },
  { value: "1024", label: "1024" },
];
