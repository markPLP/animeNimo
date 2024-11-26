import { useLoaderData } from 'react-router-dom';
import { formatNumber } from '../utils';
import { useState } from 'react';

const AnimeDetailed = () => {
  const { animeDetails } = useLoaderData();
  const [showMore, setShowMore] = useState(false);

  const {
    title,
    images,
    score,
    members,
    rank,
    favorites,
    popularity,
    synopsis,
  } = animeDetails;
  const imgURL = images?.webp?.image_url;
  const moretitles = animeDetails.titles.map((i) => i.title);
  console.log(moretitles.length - 1);

  return (
    <>
      <section className="bg-base-300 rounded-lg p-5 mt-8">
        <h2 className="text-4xl pt-0 pb-2">{title}</h2>
        <p>
          {moretitles.map((item, index) => {
            return (
              <span key={index} className="italic inline-block mr-1">
                {item}
                {index < moretitles.length - 1 ? ',' : ''}
              </span>
            );
          })}
        </p>

        <article className="flex flex-col gap-4 mt-7 [@media(min-width:518px)]:grid grid-cols-[225px,1fr] gap-4 grid-rows-[auto,auto] md:grid-rows-[auto,1fr]">
          <figure className="flex-grow md:grid-rows-1 md:col-start-1 md:row-span-2 md:row-start-1">
            <img src={imgURL} alt={title} className="" />
          </figure>
          <div className="">
            <ul className="flex flex-col gap-1 sm:grid grid-cols-2 md:grid-cols-4 md:gap-[20px]">
              <li className="flex flex-col gap-2 sm:text-center">
                <div>
                  <span className="bg-secondary text-white uppercase font-bold text-[10px] inline-block p-0 px-3 text-center">
                    score
                  </span>
                </div>

                <span className="font-bold text-[34px] text-white leading-[27px]">
                  {score}
                </span>
                <span className="leading-[10px] inline-block mb-3">
                  {formatNumber(favorites)} users
                </span>
              </li>
              <li className="sm:text-center">
                <p className="text-[18px] text-white">
                  Ranked <span className="font-bold">#{rank}</span>
                </p>
              </li>
              <li className="sm:text-center">
                <p className="text-[18px] text-white">
                  Popularity <span className="font-bold">#{popularity}</span>
                </p>
              </li>
              <li className="sm:text-center">
                <p className="text-[18px] text-white">
                  Members{' '}
                  <span className="font-bold">{formatNumber(members)}</span>
                </p>
              </li>
            </ul>
          </div>
          {/*sm:row-start-2 sm:col-span-2  [@media(min-width:518px)]:col-span-2 md:row-start-2 md:col-start-2 md:col-span-1*/}
          <div className="col-span-2 md:row-start-2 md:col-start-2">
            <h4 className="font-bold border-b pb-2 mb-2">Synopsis</h4>
            <p>
              {!showMore ? `${synopsis.substring(0, 390)}` : synopsis}
              {synopsis.length > 390 ? (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-secondary ml-2"
                >
                  {showMore ? 'Show less' : 'Read more...'}
                </button>
              ) : (
                ''
              )}
            </p>
          </div>
        </article>
      </section>
    </>
  );
};

export default AnimeDetailed;
