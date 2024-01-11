type AccordionProps = {
	readonly children: React.ReactNode;
	multiple: boolean; // Specifies whether multiple parts of the accordion be opened at once
	defaultOpen?: number; // Optionally specifies an index that should be open by default.
};
type AccordionHeaderProps = {
	children: string;
};

type AccordionItemProps = {
	readonly children: React.ReactNode;
};

type AccordionItemBodyProps = {
	readonly children: React.ReactNode;
};

type AccordionItemButtonProps = {
	children: string;
};

type AccordionItemTitleProps = {
	readonly children: string;
};
