import React, { createContext, useContext, useMemo, useState } from "react";
import {
	AccordionProps,
	AccordionContextType,
	AccordionHeaderProps,
	AccordionItemBodyProps,
	AccordionButtonComponents,
	AccordionItemButtonProps,
	AccordionItemProps,
	AccordionItemTitleProps,
} from "./types";

const AccordionContext = createContext<AccordionContextType | null>(null);
const AccordionItemContext = createContext<AccordionItemContextType | null>(
	null
);

// Get context, can
const getAccordionContext = () => {
	const context = useContext(AccordionContext);
	return context ?? null;
};

function Accordion({ children, multiple, defaultOpen }: AccordionProps) {
	// functionality goes here...
	const [activeItems, setActiveItems] = useState<number[]>(
		defaultOpen ? [defaultOpen] : []
	);

	/**
	 * Handles toggling of individual items in the accordion
	 * @param index
	 */
	const handleToggle = (index: number) => {
		// Use array intersection
		console.log("clicked");
		console.log(index);
		// setActiveItems([index]);
	};

	// Needs to be memoized otherwise
	// functions will recreate themselves on rerender.
	const contextValues = useMemo(() => {
		return {
			activeItems,
			handleToggle,
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
	const { handleToggle } = getAccordionContext();

	// Some hacky stuff here... not sure about this, but probably will work just fine.
	// I guess, if no child component that handles toggle is specified, then pass toggle down to title here
	// Look at all children
	// Figure out if a child that could be used for toggling is present
	// If present, pass down handleToggle with index to that component
	// If not, pass it to title component.

	// TODO : Below works, but Needs major refactoring

	console.log(`for item index ${index}`);

	const wrapChildWithToggle = (child: React.ReactNode) => {
		console.log(`wrapping ${child?.type.name} with toggle func`);
		return React.cloneElement(child, {
			handleToggle: () => handleToggle(index),
		});
	};

	const wrapChildWithIndex = (child: React.ReactNode) => {
		return React.cloneElement(child, { index });
	};

	let canHandleToggle = (name: string) =>
		(Object.values(AccordionButtonComponents) as string[]).includes(name);

	const childrenWithToggleAndIndex = () => {
		let childrenWithIndex = React.Children.map(children, (child) =>
			wrapChildWithIndex(child)
		);

		let childWithToggleExists = false;

		let childrenWithToggleAndIndex = React.Children.map(
			childrenWithIndex,
			(child) => {
				// If there is a child with the toggle added, just return the child with the relevant index.
				// If no toggle has been added and the child is one that is designated as handling toggle,
				// add the toggle function to its props
				if (canHandleToggle(child.type.name) && !childWithToggleExists) {
					childWithToggleExists = true;
					return wrapChildWithToggle(child);
				}
				return child;
			}
		);

		// As a failsafe, add the toggle to the title component.
		if (!childWithToggleExists) {
			const titleComponentIndex = React.Children.toArray(
				childrenWithToggleAndIndex
			).findIndex((child) => child.type.name === "AccordionTitle");

			if (titleComponentIndex === -1) {
				throw new Error(
					"Accordion Items must have a title as one of their children."
				);
			}
			//Replace the title component with one with a toggle.
			childrenWithToggleAndIndex = childrenWithToggleAndIndex?.map(
				(child, i) => {
					if (i !== titleComponentIndex) return child;
					return wrapChildWithToggle(child);
				}
			);
		}

		return childrenWithToggleAndIndex;
	};

	return (
		<div className="flex border-2 flex-wrap">
			{childrenWithToggleAndIndex()}
		</div>
	);
}

function AccordionBody({
	children,
	index,
}: AccordionItemBodyProps & { index?: number }) {
	const { activeItems } = getAccordionContext();
	const display = activeItems.indexOf(index) !== -1;
	return (
		<div className={`${display ? "" : "hidden"} basis-full h-60 border-2 p-2 `}>
			{children}
		</div>
	);
}

function AccordionButton({
	handleToggle = null,
}: {
	handleToggle: () => void;
}) {
	// should take on/off props
	// should take icons
	return (
		<div className="ms-auto w-16 border-2" onClick={handleToggle}>
			Button
		</div>
	);
}

function AccordionTitle({
	children,
	handleToggle,
	index,
}: AccordionItemTitleProps & { index: number; handleToggle?: () => void }) {
	if (handleToggle) {
		console.log(`title @ index ${index} is clickable`);
	} else {
		console.log(`title @ index ${index} is not clickable`);
	}
	return (
		<div
			onClick={handleToggle ? handleToggle : () => null}
			className="flex-1 text-xl"
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
