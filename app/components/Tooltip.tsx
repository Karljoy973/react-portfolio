const Tooltip = ({label}:TooltipProps) => {
    return (
		<>
			<span
				className="
        tooltip
     absolute
     bottom-[-2.2rem]
     left-1/2
     -translate-x-1/2
     whitespace-nowrap
     text-sm
     bg-gray-900
     text-white
     px-2
     py-1
     rounded-md
     opacity-0
     group-hover:opacity-100
    transition-opacity
    duration-200
    pointer-events-none">
				{label}
			</span>
		</>
	);
}

export type TooltipProps = {label:string}
 
export default Tooltip;