import Accordion from "./Components/Accordion/Accordion";
import Container from "./Components/Container";

function App() {
	return (
		<Container>
			<Accordion allowToggleMultiple>
				<Accordion.Header>Example Accordion</Accordion.Header>
				<Accordion.Item index={0}>
					<Accordion.Title>Item 1</Accordion.Title>
					<Accordion.Button></Accordion.Button>
					<Accordion.Body> text 1</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item index={1}>
					<Accordion.Title>Item 2</Accordion.Title>
					<Accordion.Body>item text 2</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item index={2}>
					<Accordion.Title>Item 3</Accordion.Title>
					<Accordion.Button></Accordion.Button>
					<Accordion.Body>item text</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
}

export default App;
