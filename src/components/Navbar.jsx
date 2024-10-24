import { Form, NavLink } from 'react-router-dom';
import { FaBarsStaggered } from 'react-icons/fa6';
import FormInput from './FormInput';
import { BsSearch } from 'react-icons/bs';
import ThemeUI from './ThemeUI';
import Socials from './Socials';

const Navbar = () => {
  return (
    <nav className="bg-base-300">
      <div className="navbar complex-grid-header align-element grid items-center gap-x-4 gap-y-2 lg:gap-5">
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
        <div className="header-search-form">
          <Form className="relative max-w-full w-full">
            <FormInput
              type="text"
              name="search"
              placeholder="Enter anime name"
              extendClass="rounded-full appearance-none pr-14 max-w-full"
            />
            <button
              type="submit"
              className="absolute top-0 bottom-0 right-0 w-12 flex justify-center items-center"
            >
              <BsSearch className="text-xl font-bold" />
            </button>
          </Form>
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
