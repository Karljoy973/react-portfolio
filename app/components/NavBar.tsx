import NavigationLinks from "./NavigationLinks";
import NavigationLogo from "./NavigationLogo";

const NavBar = () => {
	return (
		<nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
			<div className="mx-auto px-6 py-4 flex justify-between items-center text-blue-400">
				<NavigationLogo />
				<NavigationLinks />
			</div>
		</nav>
	);
};

export default NavBar;
