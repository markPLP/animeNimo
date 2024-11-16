import SidebarTopAnimeItem from './SidebarTopAnimeItem';

const SidebarTopAnimeList = ({ dataTopAnime }) => {
  return (
    <>
      {dataTopAnime.map((item, index) => {
        return (
          <SidebarTopAnimeItem
            key={item.mal_id}
            dataItem={item}
            index={index}
          />
        );
      })}
    </>
  );
};

export default SidebarTopAnimeList;
