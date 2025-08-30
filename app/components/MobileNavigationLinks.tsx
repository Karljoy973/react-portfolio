import type { MenuNavigationLinksProps } from "@/types";
import { NavLink } from "react-router";

const MobileNavigationLinks = ({
  links,
  menuOpen,
  setMenuOpen,
}: MenuNavigationLinksProps) => {
  return (
    <>
      {menuOpen && (
        <div className="md:flex flex-col items-center">
          <ul
            id="dropdown-menu"
            className="md:hidden bg-gray-800 border-t
            border-gray-700 
            px-6 py-4 space-y-2 space-x-4 text-center   justify-center"
          >
            {links.map(({ to, label, icon }) => (
              <div className=" flex size-fit" key={label}>
                <NavLink
                  to={to}
                  end
                  onClick={() => setMenuOpen(() => false)}
                  className="pt-4 nav-link text-gray-300 hover:text-blue-400 transition flex flex-row-reverse "
                  aria-label={label}
                >
                  {label} {icon}
                </NavLink>
              </div>
            ))}
          </ul>{" "}
        </div>
      )}
    </>
  );
};

export default MobileNavigationLinks;
