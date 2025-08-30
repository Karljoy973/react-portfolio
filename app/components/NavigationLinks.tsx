import { GrAchievement } from "react-icons/gr";
import {
  RiUserLine,
  RiBook2Line,
  RiBriefcaseLine,
  RiMailLine,
  RiLockFill,
} from "react-icons/ri";
import DesktopNavigationLinks from "./DesktopNavigationLinks";
import { ResponsiveMenu } from "./ResponsiveMenu";

const NavigationLinks = () => {
  const links = [
    {
      to: "/a-propos",
      label: "À propos",
      icon: <RiUserLine size={22} data-testid="icone-a-propos" />,
      aria: "page-a-propos",
    },
    {
      to: "/blog",
      label: "Blog",
      icon: <RiBook2Line size={22} data-testid="icone-blog" />,
      aria: "page-blog",
    },
    {
      to: "/projets",
      label: "Projets",
      icon: <RiBriefcaseLine size={22} data-testid="icone-projets" />,
      aria: "page-projets",
    },
    {
      to: "/contact",
      label: "Contact",
      icon: <RiMailLine size={22} data-testid="icone-contact" />,
      aria: "page-contact",
    },
    {
      to: "/cv",
      label: "Expériences",
      icon: <GrAchievement size={22} data-testid="icone-cv" />,
      aria: "page-cv",
    },
    {
      to: "/connexion",
      label: "Se Connecter",
      icon: <RiLockFill size={22} data-testid="icone-connexion" />,
      aria: "page-cv",
    },
  ];

  return (
    <>
      <DesktopNavigationLinks links={links} />
      <ResponsiveMenu links={links} />
    </>
  );
};

export default NavigationLinks;
