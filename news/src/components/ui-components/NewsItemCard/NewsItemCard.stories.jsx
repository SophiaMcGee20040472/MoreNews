// NewsItemCard.stories.jsx
import React from "react";
import NewsItemCard from "./NewsItemCard";

export default {
  title: "Components/NewsItemCard",
  component: NewsItemCard,
};

//I would normally split this into a separate file and import it back in but I am just building a few storybooks 
const dummyItem = {
  key: "12345",
  title: "Breaking News: ChatGPT Helps Developers Build Storybooks Faster Than Ever",
  url: "https://example.com/news/chatgpt-storybook",
  site: "example.com",
  points: 256,
  author: "devUser",
  time: "2 hours ago",
  comments: 42,
};

export const Default = () => <NewsItemCard item={dummyItem} rank={1} />;

const longTitleItem = {
  ...dummyItem,
  key: "67890",
  title:
    "This is an extremely long news headline designed to test the collapse and expand functionality of the NewsItemCard component in Storybook so that we can ensure that everything displays correctly without breaking layout",
};

export const LongTitle = () => <NewsItemCard item={longTitleItem} rank={2} />;
