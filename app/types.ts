import type { JSX, SetStateAction, Dispatch } from "react";

export type NavigationLink = {
  to: string;
  label: string;
  icon: JSX.Element;
  aria: string;
};

export type MenuNavigationLinksProps = {
  links: NavigationLink[];
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};
