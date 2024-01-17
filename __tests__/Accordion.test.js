import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Accordion from "../src/Components/Accordion/Accordion";

describe("Testing Accordion component", () => {
	it("Should render", async () => {
		render(<Accordion />);
		const element = await screen.getByText("Accordion");
		expect(element).toBeNull();
	});

	it("Should optionally display a text header", async () => {});

	it("Should render an indeterminate amount of children when provided", async () => {});

	it("Should have children with buttons that change on open/close", async () => {});

	it("Should not display the body in a child item while it is not active", async () => {});

	it("Should still be able to toggle items even if an item is not provided with a button", async () => {});

	it("Should be able to handle multiple open/closed states simultaneously", async () => {});
});
