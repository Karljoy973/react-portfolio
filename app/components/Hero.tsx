import { Link } from "react-router";

export const Hero = () => {
  return (
    <>
      <header
        className="text-center py-20
      px-4
      bg-gray-900 
      text-whitetransition-colors 
      duration-300"
      >
        <h2
          className="
          text-gray-300
        text-4xl
        font-bold
        mb-4
        "
        >
          Coucou cest Karl !
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
          Jaime developper des projets personnels qui font intervenir du web, de
          lIA et de la realité virutelle ! Nhésitez pas à revenir de temps en
          temps pour voir mon évolution !
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/projects"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Mes Projets !
          </Link>
        </div>
      </header>
    </>
  );
};
