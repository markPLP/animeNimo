import { NavLink } from 'react-router-dom';
import { FaBarsStaggered } from 'react-icons/fa6';
import ThemeUI from './ThemeUI';
import Socials from './Socials';
import TypeHeadSearch from './TypeHeadSearch';
import NavLinks from './NavLinks';

const Navbar = () => {
  return (
    <nav className="bg-base-300">
      <div className="navbar complex-grid-header align-element grid items-center gap-x-3 gap-y-2 lg:gap-5 px-3">
        <div className="header-logo-burger flex items-center">
          {/* DROPDOWN */}
          <div className="dropdown [position:unset]">
            <label
              tabIndex={0}
              className="btn btn-ghost p-4 h-auto"
              aria-haspopup="true"
            >
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            {/* SUBLINKS */}
            <NavLinks />
          </div>
          <NavLink
            to="/"
            className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent font-bold text-[30px]"
          >
            AnimeNimo
          </NavLink>
        </div>
        <div className="header-search-form block w-full lg:w-[500px]">
          <TypeHeadSearch />
        </div>
        <div className="header-main-nav">
          <Socials />
        </div>
        <ThemeUI className="header-theme" />
      </div>
    </nav>
  );
};
export default Navbar;
