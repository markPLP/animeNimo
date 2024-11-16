import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { GridAnime, GridSearchResults } from '../components';

const url = '/watch/episodes';

export const loader = async () => {
  try {
    const response = await customFetch.get(url);

    const items = response.data.data;
    // console.log('recently added items', items);
    console.log('recently added response', response);
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
      {/* <GridSearchResults data={items} /> */}
    </div>
  );
};

export default RecentlyAdded;
