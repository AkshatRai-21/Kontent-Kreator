import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required"
  }),
  categories: z.string().array().min(1, {
    message: "You have to select at least one category.",
  }),
  cinemaType: z.string().min(1, {
    message: "CinemaType is required"
  }),
});

export const categoryOptions = [
  { value: 1, label: 'Action' },
  { value: 2, label: 'Adventure' },
  { value: 3, label: 'Animation' },
  { value: 4, label: 'Biography' },
  { value: 5, label: 'Comedy' },
  { value: 6, label: 'Crime' },
  { value: 7, label: 'Documentary' },
  { value: 8, label: 'Drama' },
  { value: 9, label: 'Family' },
  { value: 10, label: 'Fantasy' },
  { value: 11, label: 'Film-Noir' },
  { value: 12, label: 'History' },
  { value: 13, label: 'Horror' },
  { value: 14, label: 'Musical' },
  { value: 15, label: 'Mystery' },
  { value: 16, label: 'Romance' },
  { value: 17, label: 'Sci-Fi' },
  { value: 18, label: 'Sport' },
  { value: 19, label: 'Thriller' },
  { value: 20, label: 'War' },
  { value: 21, label: 'Western' },
  { value: 22, label: 'Art-house' },
  { value: 23, label: 'Black-Comedy' },
  { value: 24, label: 'Chick-flick' },
  { value: 25, label: 'Cult-classic' },
  { value: 26, label: 'Dark-Comedy' },
  { value: 27, label: 'Epic' },
  { value: 28, label: 'Erotic' },
  { value: 29, label: 'Experimental' },
  { value: 30, label: 'Fairy-tale' },
  { value: 31, label: 'Film-within-a-film' },
  { value: 32, label: 'Futuristic' },
  { value: 33, label: 'Gangster' },
  { value: 34, label: 'Heist' },
  { value: 35, label: 'Historical' },
  { value: 36, label: 'Holiday' },
  { value: 37, label: 'Indie' },
  { value: 38, label: 'Juvenile' },
  { value: 39, label: 'Melodrama' },
  { value: 40, label: 'Monster' },
  { value: 41, label: 'Political' },
  { value: 42, label: 'Psychological' },
  { value: 43, label: 'Road-movie' },
  { value: 44, label: 'Satire' },
  { value: 45, label: 'Science-Fiction' },
  { value: 46, label: 'Slapstick' },
  { value: 47, label: 'Social-issue' },
  { value: 48, label: 'Superhero' },
  { value: 49, label: 'Surreal' },
  { value: 50, label: 'Teen' },
  { value: 51, label: 'Vampire' },
  { value: 52, label: 'Zombie' },
];




export const cinemaOptions = [
  { value: 'tv show', title: 'TV Show' },
  { value: 'movie', title: 'Movie' },
  { value: 'tv show or movie', title: 'No Preference' }
];

