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
          const image = item.images?.webp?.image_url;
          const { synopsis, title_english, title, genres, status, year } = item;
          console.log(item);

          return (
            <div key={item.mal_id}>
              <article className="clearfix p-5">
                <figure className="relative h-auto overflow-hidden w-full pt-[136%] min-[437px]:float-left min-[437px]:pt-[70%] min-[437px]:w-[50%] mr-4 min-[665px]:w-[30%] min-[665px]:pt-[40%]">
                  <img
                    src={image}
                    alt={title_english}
                    className="w-full h-full object-cover absolute top-0"
                  />
                </figure>
                <div className="">
                  <h1 className="font-bold text-primary-content text-2xl lg:text-3xl mb-2">
                    {title_english ? title_english : title}
                  </h1>
                  <ul>
                    Genres:
                    {genres.map((genre, index) => {
                      const { name } = genre;
                      return (
                        <li key={index} className="inline-block ml-1">
                          <a
                            href="#"
                            className="text-primary-content underline-offset-2 italic"
                          >
                            {name}
                            {index === genres.length - 1 ? '' : ', '}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <p>
                    Status:
                    <span className="text-primary-content italic ml-1">
                      {status}
                    </span>
                  </p>
                  {year && (
                    <p>
                      Year:
                      <span className="text-primary-content italic ml-1">
                        {year}
                      </span>
                    </p>
                  )}

                  <p className="text-md text-primary-content mt-2">
                    Summary:
                    <span className="block text-primary-content italic">
                      {synopsis.substring(0, 200)}...
                    </span>
                  </p>
                  <a href="#" className="btn btn-secondary mt-5">
                    Watch now
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Hero;
