import { createContext, useContext, useMemo, useState } from "react";
import { AccordionProps, AccordionHeaderProps } from "./types";

const AccordionContext = createContext(null);

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
		if (multiple) {
			// Probably use an array?
		}
		console.log("open/close");
	};

	const contextValues = useMemo(() => {
		return {
			activeItems,
			handleToggle,
		};
	}, []);

	return (
		<AccordionContext.Provider value={contextValues}>
			<div className="mx-auto w-5/6">{children}</div>
		</AccordionContext.Provider>
	);
}

function AccordionHeader({ children }: AccordionHeaderProps) {
	return <div className="mb-4 text-2xl">{children}</div>;
}

function AccordionItem({ children }: AccordionItemProps) {
	return <div className="flex border-2 flex-wrap">{children}</div>;
}

function AccordionBody({ children }: AccordionItemBodyProps) {
	// should take children maybe?
	return <div className="basis-full h-60 border-2 p-2">{children}</div>;
}

function AccordionButton() {
	// should take on/off props
	// should take icons
	const { handleToggle } = getAccordionContext();
	return (
		<div className="ms-auto w-16 border-2" onClick={handleToggle}>
			Button
		</div>
	);
}

function AccordionTitle({ children }: AccordionItemTitleProps) {
	return (
		<div className="flex-1 text-xl">
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
