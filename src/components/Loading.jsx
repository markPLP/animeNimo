const Loading = ({ extendClass }) => {
  return (
    <div className={`flex items-center justify-center ${extendClass}`}>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};
export default Loading;
