import { NavLink } from "react-router";
import { RiPlanetLine } from "react-icons/ri";
import Tooltip from "./Tooltip";
const NavigationLogo = () => {
  return (
		<>
			<div className=" md:block items-center gap-6 text-gray-300">
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

					<Tooltip label="Page d'accueil" />
				</div>
			</div>
		</>
  );
};

export default NavigationLogo;
