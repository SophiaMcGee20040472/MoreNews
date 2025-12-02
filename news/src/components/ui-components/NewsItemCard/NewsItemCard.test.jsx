// NewsItemCard.test.jsx
import { render, screen } from "@testing-library/react";
import NewsItemCard from "./NewsItemCard";

describe("NewsItemCard", () => {
  const item = {
    id: 1,
    key: "123",
    title: "Test News Title",
    site: "example.com",
    points: 42,
    author: "johndoe",
    time: "1 hour ago",
    comments: 10,
    url: "https://example.com/news/123",
  };

  it("renders the title, site, and rank", () => {
    render(<NewsItemCard item={item} rank={1} />);

    // Check title
    expect(screen.getByText("Test News Title")).toBeInTheDocument();

    // Check site
    expect(screen.getByText("example.com")).toBeInTheDocument();

    // Check rank
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
