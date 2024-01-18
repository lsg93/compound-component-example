export type AccordionProps = {
	readonly children: React.ReactNode;
	multiple: boolean; // Specifies whether multiple parts of the accordion be opened at once
	defaultOpen?: number; // Optionally specifies an index that should be open by default.
};
export type AccordionHeaderProps = {
	children: string;
};

export type AccordionItemProps = {
	readonly children: React.ReactNode;
	index: number;
};

export type AccordionItemBodyProps = {
	readonly children: React.ReactNode;
};

export enum AccordionToggleComponents {
	TITLE = "AccordionTitle",
	BUTTON = "AccordionButton",
}

export type AccordionItemButtonProps = {
	children?: string;
	handlesToggle?: boolean;
};

export type AccordionItemTitleProps = {
	readonly children: string;
	handlesToggle?: boolean;
};

export type AccordionContextType = {
	activeItems: number[];
	setActiveItems: (index: number) => void;
};

export type AccordionItemContextType = {
	isActive: boolean;
	toggleHandler: (val: boolean) => void;
};
