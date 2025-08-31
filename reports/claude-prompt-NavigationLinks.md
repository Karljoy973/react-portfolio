# Prompt pour Claude - Creation de tests pour NavigationLinks

Salut Claude ! Je veux que tu crees des tests d'integration complets pour le composant **NavigationLinks**.

## Informations du composant :
- **Nom :** NavigationLinks
- **Chemin :** C:\Users\Karlj\react\react-portfolio\app\components\NavigationLinks.tsx
- **Utilise le routeur :** True
- **Utilise l'etat :** False
- **Utilise des effets :** False

## Analyse automatique :
- **Imports detectes :** react-icons/gr, ./DesktopNavigationLinks, ./ResponsiveMenu
- **Hooks utilises :** 
- **Elements JSX :** DesktopNavigationLinks, GrAchievement, ResponsiveMenu, RiBook2Line, RiBriefcaseLine, RiLockFill, RiMailLine, RiUserLine
- **Event handlers :** onLinks

## Exigences pour les tests :

1. **Structure de base :**
   - Fichier : `__test__/NavigationLinks.test.tsx`
   - Documentation JSDoc complete
   - Au minimum 8-12 tests

2. **Tests obligatoires :**
   - Rendu sans crash
   - Affichage du contenu correct
   - Gestion des props (si applicable)
   - Interactions utilisateur
   - Accessibilite (getByRole, ARIA)
   - Cas limites et erreurs

3. **Configuration technique :**
   - Utiliser `createMemoryRouter` de `'react-router'` (pas react-router-dom)
   - `@testing-library/react` pour les tests
   - `fireEvent` pour les interactions
   - `beforeEach/afterEach` pour cleanup
   - Composants mock appropries

4. **Tests specifiques selon l'analyse :**
   - Tests de routage et navigation


   - Tests des event handlers : onLinks

## Code du composant a analyser :
`	sx
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
      label: "Ã€ propos",
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
      label: "ExpÃ©riences",
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

`

Peux-tu creer le fichier de test complet avec tous les tests necessaires ?
