import { usePopularAnime } from '../utils/reactQueryCustomHooks';
import Loading from './Loading';
import SectionTitle from './SectionTitle';

const PopularAnime = () => {
  const { isLoading, data, isError } = usePopularAnime();
  console.log(data);

  if (isLoading) return <Loading />;
  if (isError) return <div>There was an error...</div>;
  return (
    <>
      <SectionTitle title="Popular now" />
      <div className="grid grid-cols-2 gap-[10px]  min-[460px]:grid-cols-3 min-[700px]:grid-cols-4  min-[800px]:grid-cols-5">
        {data.map((card) => {
          const image = card.entry?.images?.webp?.large_image_url;
          const { title, mal_id } = card.entry;
          console.log(image);
          console.log(card.mal_id);

          return (
            <>
              <div
                key={mal_id}
                className="card bg-base-100 w-full shadow-xl rounded-md"
              >
                <figure className="relative overflow-hidden pt-[150%]">
                  <img
                    src={image}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-2 justify-items-center relative">
                  <h2 className="card-title font-normal text-[16px] justify-center">
                    {title}
                  </h2>
                  <div className="card-actions absolute bottom-[100%] left-0">
                    <div className="badge badge-outline bg-primary text-[14px] border-none rounded-none rounded-r-md p-3">
                      Ep{card.episodes.length}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default PopularAnime;
