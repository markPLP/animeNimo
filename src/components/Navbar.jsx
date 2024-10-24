import { Form, NavLink } from 'react-router-dom';
import { FaBarsStaggered } from 'react-icons/fa6';
import FormInput from './FormInput';
import { BsSearch } from 'react-icons/bs';
import ThemeUI from './ThemeUI';

const Navbar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar complex-grid-header align-element grid items-center gap-2 lg:gap-5">
        <div className="header-logo-burger flex items-center">
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden pl-0">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {/* DYNAMIC LINKS HERE */}
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
        <div className="header-main-nav hidden lg:block">
          {/* <ul className='flex justify-self-center gap-x-4'> */}
          <ul className="menu menu-horizontal flex justify-self-center gap-x-4">
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
        <ThemeUI className="header-theme" />
      </div>
    </nav>
  );
};

export default Navbar;
