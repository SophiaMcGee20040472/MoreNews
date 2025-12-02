import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

// Mock Chakra UI components (safe props only)
jest.mock("@chakra-ui/react", () => ({
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ onClick, "aria-label": ariaLabel }) => (
    <button onClick={onClick} aria-label={ariaLabel} />
  ),
  Text: ({ children }) => <span>{children}</span>,
}));

jest.mock("@chakra-ui/icons", () => ({
  ChevronLeftIcon: () => <span>{"<"}</span>,
  ChevronRightIcon: () => <span>{">"}</span>,
}));

describe("Pagination component", () => {
  test("renders pages and handles clicks", () => {
    const goToPrevPage = jest.fn();
    const goToNextPage = jest.fn();
    const handlePageChange = jest.fn();

    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        handlePageChange={handlePageChange}
      />
    );

    // Page numbers present?
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    // Ellipsis present
    expect(screen.getByText("…")).toBeInTheDocument();

    // Clicking a numbered page
    fireEvent.click(screen.getByText("4"));
    expect(handlePageChange).toHaveBeenCalledWith(4);

    // Prev + next buttons
    fireEvent.click(screen.getByLabelText("Previous Page"));
    expect(goToPrevPage).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText("Next Page"));
    expect(goToNextPage).toHaveBeenCalled();
  });
});
