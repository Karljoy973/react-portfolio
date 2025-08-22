import { NavLink } from "react-router";
import { RiPlanetLine } from "react-icons/ri";

const links = [
	{ to: "/contact", label: "Contact", testid: "contact" },
	{ to: "/blog", label: "Blog", testid: "blog" },
	{ to: "/cv", label: "Expériences", testid: "cv" },
	{ to: "/projets", label: "Projets", testid: "projets" },
	{ to: "/a-propos", label: "À propos", testid: "about" },
	{ to: "/connect", label: "Se Connecter", testid: "connect" },
];

const NavBar = () => {
	const base = "transition hover:text-blue-400 gap-2";
	const active = "text-blue-400 font-semibold gap-2";

	return (
		<nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
			<div className="mx-auto px-6 py-4 flex justify-between items-center text-blue-400">
				{/* Logo */}
				<NavLink
					to="/"
					aria-label="accueil"
					data-testid="accueil"
					className="flex items-center gap-2 text-lg font-bold hover:text-blue-300 active:text-blue-400">
					<RiPlanetLine className="text-xl" />
					<span>StackFolio 2.0</span>
				</NavLink>

				{/* Desktop nav */}
				<ul className="hidden md:flex items-center gap-6 text-lg text-gray-300">
					{links.map(({ to, label, testid }) => (
						<li key={label}>
							<NavLink
								to={to}
								aria-label={label.toLowerCase()}
								data-testid={testid}
								className={({ isActive }) =>
									isActive ? active : base
								}>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
