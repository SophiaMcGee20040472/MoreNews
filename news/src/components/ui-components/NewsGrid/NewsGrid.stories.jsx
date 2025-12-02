// NewsGrid.stories.jsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import NewsGrid from "./NewsGrid";

// Mock data for NewsGrid
const mockItems = Array.from({ length: 6 }, (_, i) => ({
  key: `news-${i + 1}`,
  title: `News Story ${i + 1}`,
  site: "example.com",
  points: Math.floor(Math.random() * 500),
  author: `Author${i + 1}`,
  time: "2 hours ago",
  comments: Math.floor(Math.random() * 100),
  url: `https://example.com/story-${i + 1}`,
}));

export default {
  title: "Components/NewsGrid",
  component: NewsGrid,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export const Default = () => <NewsGrid items={mockItems} startIndex={0} />;

export const WithManyItems = () => {
  const manyItems = Array.from({ length: 12 }, (_, i) => ({
    ...mockItems[i % mockItems.length],
    key: `news-${i + 1}`,
    title: `News Story ${i + 1}`,
  }));
  return <NewsGrid items={manyItems} startIndex={0} />;
};
