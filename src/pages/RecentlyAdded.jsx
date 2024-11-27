import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { GridAnime } from '../components';

const url = '/watch/episodes';

export const loader = async () => {
  try {
    const response = await customFetch.get(url);
    const items = response.data.data;

    return items || [];
  } catch (error) {
    console.error('Error fetching recently added anime:', error);
    throw new Response('Failed to load recently added anime', {
      status: 500,
    });
  }
};

const RecentlyAdded = () => {
  const items = useLoaderData();

  return (
    <div className="pt-6">
      <GridAnime data={items} />
    </div>
  );
};

export default RecentlyAdded;
