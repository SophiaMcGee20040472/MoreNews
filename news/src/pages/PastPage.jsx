import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Link,
  Flex,
  Select,
} from "@chakra-ui/react";
import SpinLoader from "../components/ui-components/Spinner/Spinner";

const ORANGE = "#ff7600";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const TOP_STORIES = `${BASE_URL}/topstories.json?print=pretty`;
const ITEM_DETAIL = (id) => `${BASE_URL}/item/${id}.json?print=pretty`;

const formatUnixTime = (ts) =>
  new Date(ts * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const sortEvents = (events, sortBy) => {
  if (!sortBy || sortBy === "sort") return events;
  const sorted = [...events];

  switch (sortBy) {
    case "points":
      return sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
    case "comments":
      return sorted.sort((a, b) => (b.descendants || 0) - (a.descendants || 0));
    case "newest":
      return sorted.sort((a, b) => b.time - a.time);
    case "oldest":
      return sorted.sort((a, b) => a.time - b.time);
    default:
      return events;
  }
};

const PastEventCard = ({ event }) => (
  <Box
    p={{ base: 3, md: 4 }}
    borderRadius="md"
    border={`2px solid ${ORANGE}`}
    bg="white"
    transition="all .2s ease"
    _hover={{
      bg: "#fff7f0",
      boxShadow: "lg",
      transform: "translateY(-2px)",
    }}
    w="100%"
  >
    <Flex
      justify="space-between"
      align={{ base: "flex-start", md: "center" }}
      mb={2}
      direction={{ base: "column", md: "row" }}
      gap={2}
    >
      <Heading size={{ base: "md", md: "md" }}>{event.title}</Heading>
      <Badge
        px={3}
        py={1}
        borderRadius="full"
        fontWeight="bold"
        bg={ORANGE}
        color="white"
      >
        {event.score ?? 0} pts
      </Badge>
    </Flex>

    <Text fontSize="sm" color="gray.500" mb={3}>
      {formatUnixTime(event.time)} — by {event.by}
    </Text>

    <Flex gap={3} mb={2} wrap="wrap" direction={{ base: "column", sm: "row" }}>
      {event.descendants !== undefined && (
        <Badge
          px={2}
          py={1}
          borderRadius="full"
          fontWeight="medium"
          bg={ORANGE}
          color="white"
          w="fit-content"
        >
          {event.descendants} comments
        </Badge>
      )}

      {event.url && (
        <Link href={event.url} isExternal color={ORANGE} fontWeight="medium">
          Source
        </Link>
      )}
    </Flex>

    <Badge
      px={2}
      py={1}
      borderRadius="full"
      fontWeight="medium"
      bg="yellow.300"
      color="black"
      mt={1}
      w="fit-content"
    >
      {event.type || "story"}
    </Badge>
  </Box>
);

const PastPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("sort");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(TOP_STORIES);
        const ids = await res.json();

        const stories = await Promise.all(
          ids.slice(0, 20).map(async (id) => {
            const storyRes = await fetch(ITEM_DETAIL(id));
            return storyRes.json();
          })
        );

        const sorted = stories.filter(Boolean);
        setEvents(sorted);
      } catch (err) {
        console.error("Failed to fetch past events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="40vh">
        <SpinLoader />
      </Flex>
    );
  }

  const sortedEvents = sortEvents(events, sortBy);

  return (
    <Box p={{ base: 4, md: 6 }} maxW="900px" mx="auto">
      <Flex
        justify="space-between"
        align="left"
        mb={4}
        mt={{ base: '20px', sm: '40px', md:'-40px' }}
        direction={{ base: "column", sm: "row" }}
        gap={3}
      >
        <Heading size="lg" color={ORANGE} mt={{base: '20px',md:'50px'}} mb={{base: '-10px',md:'20px'}}>
          Past Events
        </Heading>

        <Select
          border="1px solid #ff7600"
          bg="white"
          height="36px"
          mt={{base: '20px',md:'50px'}}
          width={{ base: "100%", sm: "220px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="sort">Sort By</option>
          <option value="points">Top Rated</option>
          <option value="comments">Most Comments</option>
        </Select>
      </Flex>
      <VStack align="stretch" spacing={4}>
        {sortedEvents.map((event) => (
          <PastEventCard key={event.id} event={event} />
        ))}
      </VStack>
    </Box>
  );
};

export default PastPage;
