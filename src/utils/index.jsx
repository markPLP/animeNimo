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
import { nanoid } from 'nanoid';
import { useFetchAnimeGenres } from '../hooks/useFetchAnimeGenres';

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

export const formatDurationInMinutes = (number) => {
  const minutes = Math.floor((number % 3600) / 60);
  return minutes;
};

// const fetchGenres = async (retryCount = 3) => {
//   let attempts = 0;

//   while (attempts < retryCount) {
//     try {
//       const response = await customFetch.get('/genres/anime');
//       console.log(response, 'from fetchGenres');
//       return response.data.data; // Return data if the request is successful
//     } catch (error) {
//       const status = error?.response?.status;

//       if (status === 404 || status === 429) {
//         attempts++;
//         console.warn(
//           `Attempt ${attempts} failed with status ${status}. Retrying...`
//         );
//         if (attempts === retryCount) {
//           console.error(`Max retries reached. Failed to fetch genres.`);
//           throw new Error(
//             `Failed to fetch genres after ${retryCount} retries.`
//           );
//         }
//       } else {
//         console.error('Error fetching genres:', error);
//         throw error;
//       }
//     }
//   }
// };

// export const generateSublinks = async () => {
//   try {
//     const genres = await fetchGenres();
//     const sublinks = [
//       {
//         pageId: nanoid(),
//         page: 'home',
//         url: '/',
//       },
//       {
//         pageId: nanoid(),
//         page: 'genre',
//         url: '/genre',
//         links: genres.map((genre) => ({
//           id: genre.mal_id,
//           label: genre.name,
//           url: `/genres/${genre.mal_id}`,
//         })),
//       },
//       {
//         pageId: nanoid(),
//         page: 'sample page',
//         url: '/sample-page',
//         links: [
//           {
//             id: nanoid(),
//             label: 'sample page1',
//             url: 'sample page1',
//           },
//           {
//             id: nanoid(),
//             label: 'sample page2',
//             url: 'sample page2',
//           },
//         ],
//       },
//     ];

//     console.log('Generated sublinks:', sublinks);
//     return sublinks;
//   } catch (error) {
//     console.error('Failed to generate sublinks:', error);
//     return [];
//   }
// };

// GENERATE SUBMENULINKS

export const useGenerateSublinks = () => {
  const { allGenreData } = useFetchAnimeGenres();

  const sublinks = [
    {
      // pageId: nanoid(),
      pageId: 1,
      page: 'home',
      url: '/',
    },
    {
      //pageId: nanoid(),
      pageId: 2,
      page: 'genre',
      url: null,
      links:
        allGenreData?.map((genre) => ({
          id: genre.mal_id,
          label: genre.name,
          url: `genre/${genre.mal_id}`,
        })) || [],
    },
    {
      // pageId: nanoid(),
      pageId: 3,
      page: 'types',
      url: '',
      links: [
        {
          id: nanoid(),
          label: 'sample page1',
          url: 'sample page1',
        },
        {
          id: nanoid(),
          label: 'sample page2',
          url: 'sample page2',
        },
      ],
    },
    // {
    //   // pageId: nanoid(),
    //   pageId: nanoid(),
    //   page: 'AZ',
    //   url: '/az-list',
    // },
  ];

  return { sublinks };
};
