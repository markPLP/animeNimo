import { social } from '../assets/dataIcon';

const Socials = () => {
  return (
    <ul className="flex">
      {social.map((list) => {
        return (
          <li key={list.id}>
            <a
              href={list.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl pr-2 block hover:text-secondary"
            >
              {list.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Socials;
