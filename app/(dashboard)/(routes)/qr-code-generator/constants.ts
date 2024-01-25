import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
  submittedURL: z.string().url({
    message: "Please enter a valid URL for the website."
  }),
});


export const promptSuggestions = [
  { value: 1, label: 'A city view with clouds' },
  { value: 2, label: 'A beautiful glacier' },
  { value: 3, label: 'A forest overlooking a mountain' },
  { value: 4, label: 'A Saharan desert' },
  
];
