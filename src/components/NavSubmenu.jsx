import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NavSubmenu = ({ links }) => {
  // const currentPage = useMemo(() => {
  //   return sublinks.find((item) => item.pageId === pageId);
  // }, [sublinks, pageId]);

  const gridCols = 'grid-cols-3';

  return (
    <ul
      className={`p-2 grid border-0 m-0 rounded-none ${
        links?.length >= 3 && gridCols
      }`}
    >
      {links?.map((link) => (
        <li className="border-0 p-0 m-0" key={link.id}>
          <NavLink className="border-0" to={link.url}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavSubmenu;
