import type { JSX } from "react"

export type NavigationLink = {
    to: string, 
    label: string, 
    icon: JSX.Element, 
    aria:string
}


export type MenuNavigationLinksProps = {links: NavigationLink[]}