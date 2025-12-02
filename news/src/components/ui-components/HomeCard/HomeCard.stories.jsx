import React from "react";
import { Box } from "@chakra-ui/react";
import NewsItemCard from "../NewsItemCard/NewsItemCard";
import HomeCard from "./HomeCard";

// Dummy news data
const dummyNews = Array.from({ length: 10 }, (_, i) => ({
  key: `item-${i}`,
  rank: i + 1,
  title: `Sample News #${i + 1}`,
  site: `example${i}.com`,
  points: Math.floor(Math.random() * 500),
  author: `user${i}`,
  time: "2 hours ago",
  comments: Math.floor(Math.random() * 100),
  url: `https://example.com/news/${i}`,
}));

export default {
  title: "Components/HomeCard",
  component: HomeCard,
};

export const Default = () => <HomeCardWrapper />;

// Wrapper for fetching and loading
function HomeCardWrapper() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      setData(dummyNews);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box maxW="1200px" mx="auto" px={4}>
      <HomeCardMock data={data} loading={loading} />
    </Box>
  );
}

function HomeCardMock({ data, loading }) {
  if (loading) {
    return (
      <Box py="40px" textAlign="center">
        Loading...
      </Box>
    );
  }

  return <HomeCardStory data={data} />;
}

function HomeCardStory({ data }) {
  return (
    <Box>
      {data.map((item, i) => (
        <HomeCardItem key={item.key} item={item} rank={i + 1} />
      ))}
    </Box>
  );
}


function HomeCardItem({ item, rank }) {
  return <NewsItemCard item={item} rank={rank} />;
}
