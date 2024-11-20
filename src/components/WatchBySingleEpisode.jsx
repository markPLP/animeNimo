import React from 'react';

const WatchBySingleEpisode = () => {
  return (
    <div className="bg-base-300 p-5">
      <div className="mb-5">
        <p>title: {title}</p>
        <p>aired: {aired}</p>
        <p>duration: {duration}</p>
        <p>mal_id: {mal_id}</p>
        <p>synopsis: {synopsis}</p>
        <p>url: {url}</p>
      </div>
      {/* <WatchPerEpisode
        onSelectionChange={selectedsingleEpisode}
        episodes={memoizedEpData}
      /> */}
    </div>
  );
};

export default WatchBySingleEpisode;
