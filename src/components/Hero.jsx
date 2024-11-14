import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { memo, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Hero = ({ data }) => {
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: false,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }),
    []
  );

  return (
    <section className="slick-container bg-primary">
      <Slider
        key={settings.autoplay ? 'hero-autoplay' : 'hero-no-autoplay'}
        {...settings}
      >
        {data.map((item) => {
          const image = item.images?.webp?.image_url;
          const { synopsis, title_english, title, genres, status, year } = item;

          return (
            <div key={item.mal_id}>
              <article className="clearfix p-5">
                <figure className="relative h-auto overflow-hidden w-full pt-[136%] min-[437px]:float-left min-[437px]:pt-[70%] min-[437px]:w-[50%] mr-4 min-[665px]:w-[30%] min-[665px]:pt-[40%]">
                  <LazyLoadImage
                    src={image}
                    alt={title_english || title}
                    className="w-full h-full object-cover absolute top-0"
                  />
                  {/* <img
                    src={image}
                    alt={title_english || title}
                    className="w-full h-full object-cover absolute top-0"
                    loading="lazy"
                  /> */}
                </figure>
                <div>
                  <h1 className="font-bold text-primary-content text-2xl lg:text-3xl mb-2">
                    {title_english || title}
                  </h1>
                  <ul>
                    Genres:
                    {genres.map((genre, index) => (
                      <li key={index} className="inline-block ml-1">
                        <a
                          href="#"
                          className="text-primary-content underline-offset-2 italic"
                        >
                          {genre.name}
                          {index === genres.length - 1 ? '' : ', '}
                        </a>
                      </li>
                    ))}
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

// Use React.memo to wrap Hero component for memoization
export default memo(Hero);
