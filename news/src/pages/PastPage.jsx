import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import { styles } from "../styles/styles";
import SpinLoader from "../components/ui-components/Spinner";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const TOP_STORIES = `${BASE_URL}/topstories.json?print=pretty`;
const ITEM_DETAIL = (id) => `${BASE_URL}/item/${id}.json?print=pretty`;

const EventCard = ({ event }) => (
  <Box
    key={event.id}
    p={4}
    borderWidth="1px"
    borderRadius="md"
    borderColor="gray.200"
    boxShadow="sm"
    _hover={{ boxShadow: "md" }}
  >
    <Box mb={2} display="flex" alignItems="center" gap={2}>
      <Badge bg="yellow.300">{event.type || "Story"}</Badge>
      <Text fontSize="sm" color="gray.500">
        By {event.by} — {new Date(event.time * 1000).toLocaleDateString()}
      </Text>
    </Box>

    <Heading size="md" mb={2}>
      {event.title}
    </Heading>

    <Box fontSize="sm" color="gray.600">
      <Text>
        <strong>Score:</strong> {event.score}
      </Text>
      <Text>
        <strong>Comments:</strong> {event.descendants ?? 0}
      </Text>
      {event.url && (
        <Text mt={1} color="blue.500" _hover={{ textDecoration: "underline" }}>
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            {event.url}
          </a>
        </Text>
      )}
    </Box>
  </Box>
);

const PastPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const sortedStories = stories
          .filter(Boolean)
          .sort((a, b) => a.time - b.time);

        setEvents(sortedStories);
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
      <Box p={6} textAlign="center">
        <SpinLoader size="xl" />
      </Box>
    );
  }

  if (!events.length) {
    return (
      <Box p={6}>
        <Text>No past events found.</Text>
      </Box>
    );
  }

  return (
    <Box p={6} sx={styles.container}>
      <Heading size="lg" mb={4}>
        Past Events
      </Heading>
      <VStack align="stretch" spacing={4}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </VStack>
    </Box>
  );
};

export default PastPage;
