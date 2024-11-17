import axios from 'axios';
import {
  // BsFillEmoji
  // SmileFill,
  BsChat,
  BsEnvelopeOpen,
  BsPersonPlus,
  BsGift,
  BsPeople,
} from 'react-icons/bs';
import { format } from 'date-fns';

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

export const formatNumber = (number) => {
  return number.toLocaleString('en-US');
};

export const animeUserButtonIcons = [
  {
    id: 1,
    label: 'chat',
    icon: <BsChat />,
  },
  {
    id: 2,
    label: 'email',
    icon: <BsEnvelopeOpen />,
  },
  {
    id: 3,
    label: 'add friend',
    icon: <BsPersonPlus />,
  },
  {
    id: 4,
    label: 'gift friend',
    icon: <BsGift />,
  },
  {
    id: 5,
    label: 'friends',
    icon: <BsPeople />,
  },
];

export const dateFormat = (date = '2024-04-08T15:02:00+00:00') => {
  const isoDate = date;
  const formattedDate = format(new Date(isoDate), 'MMM d, yyyy h:mm a');

  return formattedDate;
};
