import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { type NavigationRoutesProps } from "types";
import MobileNavigationLinks from "./MobileNavigationLinks";
export const ResponsiveMenu = ({ links }: NavigationRoutesProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div>
        <button
          id="menu-hamburger"
          className="text-blue-400 text-xl md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <MobileNavigationLinks
          links={links}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />
      </div>
    </>
  );
};
