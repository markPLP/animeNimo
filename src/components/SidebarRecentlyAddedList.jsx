import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { memo } from 'react';
import SidebarRecentlyAddedItem from './SidebarRecentlyAddedItem';
import { useMemo } from 'react';

const SidebarRecentlyAddedList = ({ data }) => {
  const settings = useMemo(
    () => ({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      fade: false,
      autoplay: false,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      appendDots: (dots) => (
        <div>
          <ul style={{ margin: '0px' }}> {dots} </ul>
        </div>
      ),
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 751,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 519,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
      ],
    }),
    []
  );

  return (
    <div className="slick-container px-[10px]">
      <Slider {...settings}>
        {data.slice(0, 10).map((item) => {
          return (
            <SidebarRecentlyAddedItem key={item.entry.mal_id} dataItem={item} />
          );
        })}
      </Slider>
    </div>
  );
};

// Memoize the component to prevent re-renders if `data` does not change
export default memo(SidebarRecentlyAddedList);
