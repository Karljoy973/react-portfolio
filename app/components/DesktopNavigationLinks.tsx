import type { MenuNavigationLinksProps } from "@/types";
import { NavLink } from "react-router-dom";


const DesktopNavigationLinks = ({ links }: MenuNavigationLinksProps) => {
  return (
    <ul className="hidden md:flex items-center gap-6 text-gray-300">
      {links.map(({ to, label, icon, aria }) => (
        <li
          key={label}
          className="relative group"
          aria-label={aria}
          data-testid={aria}
        >
          <NavLink
            to={to}
            end
            className="pt-4 nav-link hover:text-blue-400 transition"
            aria-label={label}
          >
            {icon}
          </NavLink>

          {/* Tooltip */}
          <span className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-gray-900 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavigationLinks;
