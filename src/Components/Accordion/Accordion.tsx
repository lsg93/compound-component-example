import React, { createContext, useContext, useMemo, useState } from "react";
import {
	AccordionProps,
	AccordionContextType,
	AccordionHeaderProps,
	AccordionItemBodyProps,
	AccordionToggleComponents,
	AccordionItemButtonProps,
	AccordionItemContextType,
	AccordionItemProps,
	AccordionItemTitleProps,
} from "./types";

const AccordionContext = createContext<AccordionContextType | null>(null);
const AccordionItemContext = createContext<AccordionItemContextType | null>(
	null
);

const getAccordionContext = () => {
	const context = useContext(AccordionContext);
	return context ?? null;
};

const getAccordionItemContext = () => {
	const context = useContext(AccordionItemContext);
	return context ?? null;
};

function Accordion({ children, multiple, defaultOpen }: AccordionProps) {
	// functionality goes here...
	const [activeItems, setActiveItems] = useState<number[]>(
		defaultOpen ? [defaultOpen] : []
	);

	// Needs to be memoized otherwise
	// functions will recreate themselves on rerender.
	const contextValues = useMemo(() => {
		return {
			activeItems,
			setActiveItems,
		};
	}, [JSON.stringify(activeItems)]);

	return (
		<AccordionContext.Provider value={contextValues}>
			<div className="mx-auto w-5/6">{children}</div>
		</AccordionContext.Provider>
	);
}

function AccordionHeader({ children }: AccordionHeaderProps) {
	return <div className="mb-4 text-2xl">{children}</div>;
}

function AccordionItem({ children, index }: AccordionItemProps) {
	const { activeItems, setActiveItems } = getAccordionContext();

	// Need to decide which child component is responsible for toggling in this parent component
	// And bake this into the handle toggle function.
	// This will alleviate messy cloning of elements with extra props.
	// Figure out which child should handle toggle :
	// Filter down all children to the ones that can handle a toggle
	// And take the index of the last one.

	// Check against TS enum to see which components are allowed to handle toggle.
	const canHandleToggle = (name: string) =>
		(Object.values(AccordionToggleComponents) as string[]).includes(name);

	// Could use filter and findLastIndex() to make this cleaner but only works on newer browsers.
	const componentResponsibleForToggle = React.Children.toArray(children)
		.map((child) => {
			return canHandleToggle(child.type.name);
		})
		.lastIndexOf(true);

	if (componentResponsibleForToggle === -1) {
		throw Error(
			"There are no child components responsible for toggling this item."
		);
	}

	// Create context once we know which child component is responsible for handling toggling.
	const contextValues = {
		index,
		isActive: activeItems.indexOf(index) !== -1,
		toggleHandler: function (canToggle: boolean) {
			if (!canToggle) return;
			if (contextValues.isActive) {
				//TODO
				setActiveItems([]);
				console.log(`handle closing child ${index + 1}`);
			} else {
				//TODO
				setActiveItems([index]);
				console.log(`handle opening child ${index + 1}`);
			}
		},
	};

	return (
		<AccordionItemContext.Provider value={contextValues}>
			<div className="flex border-2 flex-wrap">
				{React.Children.map(children, (child, index) => {
					return React.cloneElement(child as React.ReactElement, {
						handlesToggle: index === componentResponsibleForToggle,
					});
				})}
			</div>
		</AccordionItemContext.Provider>
	);
}

function AccordionBody({ children }: AccordionItemBodyProps) {
	const { isActive } = getAccordionItemContext();
	return (
		<div
			className={`${isActive ? "" : "hidden"} basis-full h-60 border-2 p-2 `}
		>
			{children}
		</div>
	);
}

function AccordionButton({
	children = "",
	handlesToggle,
}: AccordionItemButtonProps) {
	const { toggleHandler } = getAccordionItemContext();

	return (
		<div
			className="ms-auto w-16 border-2"
			onClick={() => toggleHandler(handlesToggle)}
		>
			{children || "Button"}
		</div>
	);
}

function AccordionTitle({
	children,
	handlesToggle = false,
}: AccordionItemTitleProps) {
	const { toggleHandler } = getAccordionItemContext();

	return (
		<div
			className="flex-1 text-xl"
			onClick={() => toggleHandler(handlesToggle)}
		>
			<span>{children}</span>
		</div>
	);
}

Accordion.Button = AccordionButton;
Accordion.Body = AccordionBody;
Accordion.Header = AccordionHeader;
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;

export default Accordion;
