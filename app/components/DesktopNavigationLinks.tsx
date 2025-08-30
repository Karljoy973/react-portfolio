import { NavLink } from "react-router-dom";
import Tooltip from "./Tooltip";
import type { NavigationRoutesProps } from "types";

const DesktopNavigationLinks = ({ links }: NavigationRoutesProps) => {
  return (
    <ul className="hidden md:flex  gap-6 text-gray-300">
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
          <Tooltip label={label} />
          {/* Tooltip */}
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavigationLinks;
