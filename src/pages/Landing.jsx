import { useOutletContext } from 'react-router-dom';
import { Hero, GridAnime, SectionTitle } from '../components';

const Landing = () => {
  // const [random, setRandom] = useState('')
  // useOutletContext - props from <Outlet />
  const { heroBanner, popularAnime } = useOutletContext();
  console.log(popularAnime, 'popularAnime landing');

  return (
    <>
      <Hero data={heroBanner} />
      <SectionTitle title="Popular now" />
      <GridAnime data={popularAnime} />
    </>
  );
};

export default Landing;
