import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const Hero = ({ data }) => {
  // const { isLoading, data, isError } = useHeroBannerFetchQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    autoplay: false,
    autoplaySpeed: 1000,
    pauseOnHover: true,
  };

  // NOTE: isLoading and isError handle in landing - parallel request
  // IMPORT! - data will be undefined if isLoading not set
  // Handle loading and error states
  // if (isLoading) return <Loading />;
  // if (isError) return <div>There was an error...</div>;

  return (
    <section className="slick-container bg-primary">
      <Slider {...settings}>
        {data.map((item) => {
          const image = item.images?.webp?.large_image_url;
          const { synopsis, title_english } = item;
          return (
            <a key={item.mal_id} href="#" className="">
              <figure className="relative h-auto pt-[80%] overflow-hidden md:pt-[50%] lg:pt-[38%]">
                <img
                  src={image}
                  alt={title_english}
                  className="absolute top-0 left-0 mr-auto object-cover object-center w-full h-full"
                />
              </figure>
              <div className="p-2 h-16 md:h-auto lg:p-5">
                <h1 className="font-bold text-primary-content text-1xl lg:text-3xl">
                  {title_english}
                </h1>
                <p className="hidden md:block lg:text-xl text-primary-content">
                  {synopsis.substring(0, 200)}...
                </p>
              </div>
            </a>
          );
        })}
      </Slider>
    </section>
  );
};

export default Hero;
