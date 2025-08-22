import { NavLink } from "react-router";
import { RiPlanetLine } from "react-icons/ri";
const NavBar = () => {
    return (
        <nav className="
      bg-gray-800
      border-b
      border-gray-700
       shadow-md
       sticky
       top-0
        z-50">
        <div
          className="
            mx-auto
            px-6
            py-4
            flex
            justify-between
            items-center
            text-blue-400
            "
        >
          <NavLink
            className="
                    flex 
                    hover:text-blue-300
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    
                    "
            to="/"
            aria-label="accueil"
            data-testid="accueil"
          >
                      <RiPlanetLine className=" text-xl" />
                      <span className="">StackFolio 2.0</span>
          </NavLink>
                {/*desktop nav*/}
                <div className="hidden md:flex items-center gap-6">
                    <div className="
                    space-x-4
                    text-sm
                    text-gray-300
                    flex
                    *:hover:text-blue-300">
                        
                  <NavLink
            className="
                    flex 
                    
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    "
            to="/contact"
            aria-label="contact"
            data-testid="contact"
          >
            Contact
          </NavLink>
          <NavLink
            className="
                    flex 
                    
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    "
            to="/blog"
            aria-label="blog"
            data-testid="blog"
          >
            Blog
          </NavLink>
          <NavLink
            className="
                    flex 
                    
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    "
            to="/cv"
            aria-label="cv"
            data-testid="cv"
          >
            Expériences
          </NavLink>
          <NavLink
            className="
                    flex 
                    
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    "
            to="/projets"
            aria-label="projets"
            data-testid="projets"
          >
            Projets
          </NavLink>
          <NavLink
            className="
                    flex 
                    
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    "
            to="/a-propos"
            aria-label="about"
            data-testid="about"
          >
            À propos
          </NavLink>
          <NavLink
            className="
                    flex 
                    
                    items-center 
                    gap-2 
                    text-lg 
                    font-bold 
                    "
            to="/"
            aria-label="connect"
            data-testid="connect"
          >
            Se Connecter
                  </NavLink>
              </div>
                    </div>
                
              
              </div>
      </nav>
    
  );
};

export default NavBar;
