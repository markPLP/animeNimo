import { Link } from 'react-router-dom';
import { social } from '../assets/dataIcon';
const Header = () => {
  return (
    <header className="bg-primary py-2 text-neutral-content">
      <div className="align-element flex items-center gap-x-[13px] justify-between">
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
        <div className="flex gap-x-3">
          <Link to="/login" className="link link-hover text-sm">
            Signin / Guest
          </Link>
          <Link to="/register" className="link link-hover text-sm">
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
