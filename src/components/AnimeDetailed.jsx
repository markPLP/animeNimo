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

        <article className="mt-7 sm:grid grid-cols-[225px,1fr] gap-4 lg:grid-cols-6 grid-rows-[auto,1fr]">
          <figure className="mb-3 flex-grow lg:col-span-2">
            <img src={imgURL} alt={title} className="" />
          </figure>
          <div className="lg:col">
            <ul className="flex flex-col gap-1 mb-4">
              <li className="flex flex-col gap-2 u">
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
              <li>
                <p className="text-[18px] text-white">
                  Ranked <span className="font-bold">#{rank}</span>
                </p>
              </li>
              <li>
                <p className="text-[18px] text-white">
                  Popularity <span className="font-bold">#{popularity}</span>
                </p>
              </li>
              <li>
                <p className="text-[18px] text-white">
                  Members <span className="font-bold">{members}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1 col-start-3 col-end-auto">
            <h4 className="font-bold border-b pb-2 mb-2">Synopsis</h4>
            <p>
              {!showMore ? `${synopsis.substring(0, 390)}` : synopsis}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-secondary ml-2"
              >
                {showMore ? 'Show less' : 'Read more...'}
              </button>
            </p>
          </div>
        </article>
      </section>
    </>
  );
};

export default AnimeDetailed;
