import { NavLink } from 'react-router-dom';
import { useGenerateSublinks } from '../utils';
import { useEffect, useState } from 'react';
import NavSubmenu from './NavSubmenu';

const NavLinks = () => {
  const { sublinks } = useGenerateSublinks();
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Track active submenu
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Set initial state based on current window width

  useEffect(() => {
    // Update isMobile on window resize

    const handleResize = () => {
      console.log(window.innerWidth); // Log window width on resize
      setIsMobile(window.innerWidth <= 768);
    };

    // Initialize resize listener
    window.addEventListener('resize', handleResize);

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleClick = (sublinkPageId) => {
    setActiveSubmenu((prev) => (prev === sublinkPageId ? null : sublinkPageId));
  };

  const handleMouseEnter = (sublinkPageId) => {
    setActiveSubmenu(sublinkPageId);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-0 shadow m-auto max-w-[95%] w-[100vw] bg-primary md:w-[190px] md:max-w-none md:bg-base-300 md:rounded-lg md:p-3"
    >
      {sublinks.map((sublink) => {
        const { page, pageId: sublinkPageId, links, url } = sublink;
        const isOpen = activeSubmenu === sublinkPageId;

        return (
          <li
            key={sublinkPageId} // Use sublinkPageId as the unique key
            className="[position:unset] overflow-hidden"
            onClick={isMobile ? () => toggleClick(sublinkPageId) : undefined}
            onMouseEnter={
              !isMobile ? () => handleMouseEnter(sublinkPageId) : undefined
            }
            onMouseLeave={!isMobile ? handleMouseLeave : undefined}
          >
            {url ? (
              <NavLink
                className="w-full m-0 rounded-none text-[18px] px-5 py-3 uppercase md:py-1 md:px-3 md:text-[16px] md:capitalize md:mx-0 md:my-1 md:rounded-lg"
                to={url}
              >
                {page}
              </NavLink>
            ) : (
              <button className="w-full m-0 rounded-none text-[18px] px-5 py-3 uppercase md:py-1 md:px-3 md:text-[16px] md:capitalize md:mx-0 md:my-1 md:rounded-lg">
                {page}
              </button>
            )}

            {links?.length > 0 && (
              <div
                ref={
                  isMobile
                    ? (ref) => {
                        // Adjust height for mobile view
                        if (ref && isOpen) {
                          ref.style.height = `${ref.scrollHeight}px`;
                        } else if (ref) {
                          ref.style.height = '0px';
                        }
                      }
                    : (ref) => {
                        // Adjust width for desktop view
                        if (ref && isOpen) {
                          ref.style.width = '490px';
                          ref.style.minHeight = '170px'; // Ensure the height is enough for content
                        } else if (ref) {
                          ref.style.width = '0px';
                        }
                      }
                }
                className="p-0 border-0 bg-base-200 transition-all duration-300 ease-in-out w-full overflow-hidden md:absolute md:top-0 md:left-full md:w-[450px] !md:bg-base-300 hover:md:bg-base-300 md:block"
                style={{
                  transition: 'width 0.3s ease, height 0.3s ease', // Explicit transition for width/height
                }}
              >
                <NavSubmenu links={links} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
