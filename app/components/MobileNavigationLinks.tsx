import { links } from "@/root";
import type { MenuNavigationLinksProps } from "@/types";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import  { NavLink } from "react-router";

const MobileNavigationLinks = ({ links }: MenuNavigationLinksProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (<><button
            id="menu-hamburger"
            className="text-blue-400 text-xl md:hidden"
            onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
			
			{ menuOpen && (
                <ul
                id="dropdown-menu"
                className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center flex flex-row items-center-safe justify-center">
                {links.map(({ to, label, icon }) => (
                    <div className=" flex size-fit">
                        <NavLink
                            to={to}
                            end
                            onClick={() => setMenuOpen(() => false)}
                            className="pt-4 nav-link text-gray-300 hover:text-blue-400 transition flex flex-row-reverse "
                            aria-label={label}>
                            {label} {icon}
                        </NavLink>
                    </div>
                ))}
            </ul>
        )
    }
        </>
    )
}
 
export default MobileNavigationLinks;