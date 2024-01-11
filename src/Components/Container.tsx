type ContainerProps = {
	readonly children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
	return <div className="container max-w-full flex">{children}</div>;
}

export default Container;
