import { NavLink } from 'react-router-dom';
import { FaBarsStaggered } from 'react-icons/fa6';
import ThemeUI from './ThemeUI';
import Socials from './Socials';
import TypeHeadSearch from './TypeHeadSearch';

const Navbar = () => {
  return (
    <nav className="bg-base-300">
      <div className="navbar complex-grid-header align-element grid items-center gap-x-3 gap-y-2 lg:gap-5 px-3">
        <div className="header-logo-burger flex items-center">
          {/* DROPDOWN */}
          <div className="dropdown mr-5">
            <label tabIndex={0} className="btn btn-ghost p-4 h-auto">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/genre">Genre</NavLink>
              </li>
              <li>
                <NavLink to="/types">Types</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/">AnimeNimo</NavLink>
        </div>
        <div className="header-search-form block w-full lg:w-[500px]">
          <TypeHeadSearch />
        </div>
        <div className="header-main-nav">
          {/* <ul className='flex justify-self-center gap-x-4'> */}
          <Socials />
        </div>
        <ThemeUI className="header-theme" />
      </div>
    </nav>
  );
};

export default Navbar;
