import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Accordion from "../src/Components/Accordion";

describe("Testing Accordion component", async () => {
	it("Should render", async () => {
		render(<Accordion />);
	});

	it("Should optionally display a text header", async () => {});

	it("Should render an indeterminate amount of children when provided", async () => {});

	it("Should have children with buttons that change on open/close", async () => {});

	it("Should not display the body in a child item while it is not active", async () => {});
});
