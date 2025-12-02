
import React from "react"; // <- Make sure React is imported
import { render, screen } from "@testing-library/react";
import NewsGrid from "./NewsGrid";

jest.mock("@chakra-ui/react", () => ({
  SimpleGrid: ({ children }) => <div>{children}</div>,
}));

// render a div with rank for testing
jest.mock("../NewsItemCard/NewsItemCard", () => {
  return ({ item, rank }) => <div data-testid="news-item">{item.title} - Rank: {rank}</div>;
});

describe("NewsGrid component", () => {
  test("renders correct number of NewsItemCards with proper rank", () => {
    const items = [
      { key: "a", title: "Item A" },
      { key: "b", title: "Item B" },
      { key: "c", title: "Item C" },
    ];
    const startIndex = 5;

    render(<NewsGrid items={items} startIndex={startIndex} />);

    const renderedItems = screen.getAllByTestId("news-item");
    expect(renderedItems).toHaveLength(3);

    expect(renderedItems[0].textContent).toBe("Item A - Rank: 6");
    expect(renderedItems[1].textContent).toBe("Item B - Rank: 7");
    expect(renderedItems[2].textContent).toBe("Item C - Rank: 8");
  });
});
