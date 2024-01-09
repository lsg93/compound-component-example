type ContainerProps = {
	readonly children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
	return <div className="container max-w-full">{children}</div>;
}

export default Container;
