import axios from 'axios';

const apiURL = 'https://api.jikan.moe/v4';

export const customFetch = axios.create({
  baseURL: apiURL,
});

export const themes = [
  'mytheme',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

export const filterAnimeType = [
  'tv',
  'movie',
  'ova',
  'special',
  'ona',
  'music',
  'cm',
  'pv',
  'tv_special',
];

export const filterAnimeStatus = ['airing', 'complete', 'upcoming'];
export const topAnimeFilter = ['favorite', 'bypopularity', 'airing'];
export const filterAnimeOrderBy = [
  'title',
  'episodes',
  'score',
  'rank',
  'popularity',
];

export const filterRating = ['g', 'pg', 'pg13', 'r17', 'r'];

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
