import AtoZbuttons from './AtoZbuttons';

const Footer = () => {
  return (
    <div className="bg-base-300 py-[70px] px-6">
      <div className="align-element mb-8 p-0">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl mb-6 mt-7">
          We love
          <span className="inline-block ml-3 bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent font-bold">
            AnimeNimo!
          </span>
        </h1>
        <p className="mb-4">
          Welcome to our practice website! This project is created to showcase
          our skills in React development. The website pulls anime data from the
          Jikan API, a popular API for accessing a vast collection of anime
          information.
        </p>
        <p className="mb-4">
          As a learning project, this website allows us to experiment with
          various React features, including routing with React Router v6, state
          management using Context API and Redux Toolkit, and styling with
          TailwindCSS and daisyUI. We also utilize Axios for efficient API
          requests and ensure a smooth user experience throughout the site.
        </p>
        <p className="mb-4">
          Feel free to explore, search for your favorite anime, and experience
          how we bring this project to life with React and the Jikan API!
        </p>
        <p>
          You can view the source code on GitHub:
          <a
            href="https://github.com/markPLP/animeNimo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary pl-1"
          >
            GitHub Repository.
          </a>
        </p>
      </div>
      <div className="align-element border-t-2 p-0 pt-4 ">
        <p className="mb-6">
          <span className="font-bold">A-Z LIST</span>{' '}
          <span className="px-8">|</span> Searching anime order by alphabet name
          A to Z.
        </p>
        <AtoZbuttons />
      </div>
    </div>
  );
};

export default Footer;
