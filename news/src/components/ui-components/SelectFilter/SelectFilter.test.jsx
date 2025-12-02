import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectFilter from "./SelectFilter";

// --- Mock Chakra UI components ---
jest.mock("@chakra-ui/react", () => ({
  Flex: ({ children }) => <div>{children}</div>,
  HStack: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <span>{children}</span>,
  Select: ({ children, value, onChange }) => (
    <select value={value} onChange={onChange} data-testid="select-filter">
      {children}
    </select>
  ),
}));

// --- Mock ToggleButton ---
jest.mock("../ToggleButton/ToggleButton", () => (props) => (
  <button data-testid="toggle-btn" onClick={() => props.setShowAll(!props.showAll)}>
    Toggle
  </button>
));

describe("SelectFilter Component", () => {
  test("renders correct title based on filter prop", () => {
    render(
      <SelectFilter
        filter="top"
        sortBy="sort"
        setSortBy={() => {}}
        showAll={false}
        setShowAll={() => {}}
        setPage={() => {}}
      />
    );

    expect(screen.getByText("MN Top News")).toBeInTheDocument();
  });

  test("renders New Stories title when filter=new", () => {
    render(
      <SelectFilter
        filter="new"
        sortBy="sort"
        setSortBy={() => {}}
        showAll={false}
        setShowAll={() => {}}
        setPage={() => {}}
      />
    );

    expect(screen.getByText("MN New Stories")).toBeInTheDocument();
  });

  test("calls setSortBy when selecting a new option", () => {
    const setSortBy = jest.fn();

    render(
      <SelectFilter
        filter="top"
        sortBy="sort"
        setSortBy={setSortBy}
        showAll={false}
        setShowAll={() => {}}
        setPage={() => {}}
      />
    );

    const select = screen.getByTestId("select-filter");

    fireEvent.change(select, { target: { value: "newest" } });

    expect(setSortBy).toHaveBeenCalledWith("newest");
  });

  test("ToggleButton renders and receives props correctly", () => {
    const setShowAll = jest.fn();
    const setPage = jest.fn();

    render(
      <SelectFilter
        filter="top"
        sortBy="sort"
        setSortBy={() => {}}
        showAll={false}
        setShowAll={setShowAll}
        setPage={setPage}
      />
    );

    const button = screen.getByTestId("toggle-btn");

    fireEvent.click(button);
    expect(setShowAll).toHaveBeenCalledWith(true);
  });
});
