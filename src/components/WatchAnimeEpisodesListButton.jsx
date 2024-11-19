const WatchAnimeEpisodesListButton = ({ malId, title }) => {
  const handleClick = () => {
    console.log(malId);
  };
  return (
    <button
      className="btn btn-primary h-auto min-h-[32px] min-w-[57px] rounded-md px-3 hover:bg-secondary"
      onClick={() => handleClick()}
      data-title={title}
    >
      {malId}
    </button>
  );
};

export default WatchAnimeEpisodesListButton;
