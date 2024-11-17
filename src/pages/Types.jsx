import { Hero } from '../components';
import { useFetchHero } from '../hooks/useFetchHero';

const Types = () => {
  const { data } = useFetchHero();
  return (
    <div>
      <Hero data={data} />
    </div>
  );
};

export default Types;
