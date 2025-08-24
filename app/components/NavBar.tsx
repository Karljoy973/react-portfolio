import { NavLink } from "react-router";
import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import {
	RiPlanetLine,
	RiUserLine,
	RiBook2Line,
	RiBriefcaseLine,
	RiMailLine,
	RiLockFill,
	RiLockUnlockFill,
} from "react-icons/ri";
import { GrAchievement } from "react-icons/gr";

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

const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
			<div className="mx-auto px-6 py-4 flex justify-between items-center text-blue-400">
				{/* Logo */}
				<div className="items-center gap-6 text-gray-300">
					<div className="relative group" aria-label="accueil">
						<NavLink
							to="/"
							data-testid="accueil"
							className="
							nav-link 
							flex
							items-center
							 gap-2
							 text-lg
							  font-bold hover:text-blue-300 active:text-blue-400">
							<RiPlanetLine
								className="text-2xl"
								data-testid="icone-accueil"
							/>
						</NavLink>
						{/* Tooltip */}
						<span className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-gray-900 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
							Page Principale
						</span>
					</div>
				</div>
				{/* Desktop nav */}
				<ul className="hidden md:flex items-center gap-6 text-gray-300">
					{links.map(({ to, label, icon, aria }) => (
						<li
							key={label}
							className="relative group"
							aria-label={aria}
							data-testid={aria}>
							{/** do not use this method with throttling */}
							<NavLink
								to={to}
								end
								className="pt-4 nav-link hover:text-blue-400 transition"
								aria-label={label}>
								{icon}
							</NavLink>
							{/* Tooltip */}
							<span className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-gray-900 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
								{label}
							</span>
						</li>
					))}
				</ul>
				<button
					id="menu-hamburger"
					className="text-blue-400 text-xl md:hidden"
					onClick={() => setMenuOpen((value) => !value)}>
					{menuOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>
			{/**mobile nav */}
			{menuOpen && (
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
			)}
		</nav>
	);
};

export default NavBar;
