import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-primary py-2 text-neutral-content">
      <div className="align-element flex items-center gap-x-[13px] justify-end">
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
