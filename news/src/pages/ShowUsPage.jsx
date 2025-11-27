import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Link,
  Card,
  CardHeader,
  CardBody,
  Stack
} from "@chakra-ui/react";
import { formatUnixTime, API_ENDPOINTS } from "../utils/apiEndpoints";
import SpinLoader from "../components/ui-components/Spinner";

const fetchStoryDetails = async (ids) => {
  const requests = ids.map((id) =>
    fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((res) => res.json())
  );
  return Promise.all(requests);
};




const StoryCard = ({ story }) => (
  <Card
    key={story.id}
    borderWidth="1px"
    borderRadius="lg"
    borderColor="gray.200"
    boxShadow="sm"
    _hover={{ boxShadow: "md" }}
  >
    <CardHeader pb={2}>
      <Stack direction="row" align="center" spacing={2}>
        <Badge bg="yellow.300">{story.type || "Story"}</Badge>

        <Text fontSize="sm" color="gray.500">
          By {story.by} — {formatUnixTime(story.time)}
        </Text>
      </Stack>
    </CardHeader>

    <CardBody pt={0}>
      <Heading size="md" mb={2}>
        {story.title}
      </Heading>

      {story.url && (
        <Link
          href={story.url}
          isExternal
          color="blue.500"
          textDecoration="underline"
          mt={1}
          display="block"
        >
          {story.url}
        </Link>
      )}
    </CardBody>
  </Card>
);


const ShowUsPage = () => {
  const [askStories, setAskStories] = useState([]);
  const [showStories, setShowStories] = useState([]);
  const [jobStories, setJobStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {

        const [askIDs, showIDs, jobIDs] = await Promise.all([
          fetch(API_ENDPOINTS.ASK_IDS).then((r) => r.json()),
          fetch(API_ENDPOINTS.STORY_IDS).then((r) => r.json()),
          fetch(API_ENDPOINTS.JOB_IDS).then((r) => r.json()),
        ]);

        const [ask, show, jobs] = await Promise.all([
          fetchStoryDetails(askIDs),
          fetchStoryDetails(showIDs),
          fetchStoryDetails(jobIDs),
        ]);

        setAskStories(ask);
        setShowStories(show);
        setJobStories(jobs);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <SpinLoader/>
      </Box>
    );
  }

  const renderStories = (stories) =>
    stories.map((story) => <StoryCard key={story.id} story={story} />);

  return (
    <Box p={6}>
      <Heading mb={6} size="xl">
        More News Stories
      </Heading>
      <Heading size="lg" mb={3}>
        Ask Us
      </Heading>
      <VStack align="stretch" spacing={4} mb={10}>
        {renderStories(askStories)}
      </VStack>
      <Heading size="lg" mb={3}>
        Show More News
      </Heading>
      <VStack align="stretch" spacing={4} mb={10}>
        {renderStories(showStories)}
      </VStack>
      <Heading size="lg" mb={3}>
        Job Posts
      </Heading>
      <VStack align="stretch" spacing={4}>
        {renderStories(jobStories)}
      </VStack>
    </Box>
  );
};

export default ShowUsPage;
