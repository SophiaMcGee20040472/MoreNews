import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Spinner,
  Link,
  Flex,
  Select,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { API_ENDPOINTS, formatUnixTime } from "../utils/apiEndpoints";
import { useRef } from "react";

const ORANGE = "#ff7600";

const fetchStoryDetails = async (ids) => {
  const requests = ids.map((id) =>
    fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((res) => res.json())
  );
  return Promise.all(requests);
};

const sortStories = (stories, sortBy) => {
  if (!sortBy || sortBy === "sort") return stories;
  const sorted = [...stories];
  return sorted.sort((a, b) => {
    switch (sortBy) {
      case "points":
        return (b.score || 0) - (a.score || 0);
      case "comments":
        return (b.descendants || 0) - (a.descendants || 0);
      case "newest":
        return b.time - a.time;
      case "oldest":
        return a.time - b.time;
      default:
        return 0;
    }
  });
};

const StoryCard = ({ story }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el && story.text) {
      setShowToggle(el.scrollHeight > el.clientHeight);
    }
  }, [story.text]);

  return (
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
        <Heading size={{ base: "md", md: "md" }}>{story.title}</Heading>
        <Badge
          px={3}
          py={1}
          borderRadius="full"
          fontWeight="bold"
          bg={ORANGE}
          color="white"
        >
          {story.score ?? 0} pts
        </Badge>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={3}>
        {formatUnixTime(story.time)} — by {story.by}
      </Text>
      <Flex
        gap={3}
        mb={3}
        wrap="wrap"
        direction={{ base: "column", sm: "row" }}
      >
        {story.descendants !== undefined && (
          <Badge
            px={2}
            py={1}
            borderRadius="full"
            fontWeight="medium"
            bg={ORANGE}
            color="white"
            w="fit-content"
          >
            {story.descendants} comments
          </Badge>
        )}
        {story.url && (
          <Link href={story.url} isExternal color={ORANGE} fontWeight="medium">
            Source
          </Link>
        )}
      </Flex>
      {story.text && (
        <Box position="relative" mt={2}>
          <Box
            ref={textRef}
            fontSize="sm"
            color="gray.700"
            dangerouslySetInnerHTML={{ __html: story.text }}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: expanded ? "none" : 3,
              transition: "all .3s ease",
            }}
          />
          {showToggle && (
            <IconButton
              aria-label="Toggle Text"
              icon={<ChevronDownIcon />}
              size="sm"
              variant="ghost"
              position="absolute"
              right="0"
              bottom="-4px"
              onClick={() => setExpanded(!expanded)}
              transform={expanded ? "rotate(180deg)" : "rotate(0deg)"}
              transition="transform 0.2s"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

const StorySection = ({
  title,
  stories,
  showAll,
  setShowAll,
  sortBy,
  setSortBy,
}) => {
  const sortedStories = sortStories(stories, sortBy);
  const displayed = showAll ? sortedStories : sortedStories.slice(0, 8);
  return (
    <Box mb={{ base: 8, md: 10 }}>
      <Flex
        justify="space-between"
        align="center"
        mb={3}
        direction={{ base: "column", sm: "row" }}
        gap={3}
      >
        <Heading size={{ base: "lg", md: "lg" }} color={ORANGE}>
          {title}
        </Heading>
        <Flex gap={3}>
          {sortBy && (
            <Select
              border="1px solid #ff7600"
              bg="white"
              height="32px"
              width={{ base: "60%", md: "200px" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="sort">Select Filter</option>
              <option value="points">Top Rated</option>
              <option value="comments">Most Comments</option>
            </Select>
          )}
          {stories.length > 8 && (
            <Button
              bg={ORANGE}
              color="white"
              _hover={{ bg: "#e66a00" }}
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Collapse" : "Show All"}
            </Button>
          )}
        </Flex>
      </Flex>
      <VStack align="stretch" spacing={4}>
        {displayed.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </VStack>
    </Box>
  );
};

const ShowUsPage = () => {
  const [askStories, setAskStories] = useState([]);
  const [showStories, setShowStories] = useState([]);
  const [jobStories, setJobStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllAsk, setShowAllAsk] = useState(false);
  const [showAllShow, setShowAllShow] = useState(false);
  const [showAllJob, setShowAllJob] = useState(false);
  const [askSort, setAskSort] = useState("sort");
  const [showSort, setShowSort] = useState("sort");

  useEffect(() => {
    const loadStories = async () => {
      try {
        const [askIDs, showIDs, jobIDs] = await Promise.all([
          fetch(API_ENDPOINTS.ASK_IDS).then((r) => r.json()),
          fetch(API_ENDPOINTS.STORY_IDS).then((r) => r.json()),
          fetch(API_ENDPOINTS.JOB_IDS).then((r) => r.json()),
        ]);
        const [ask, show, jobs] = await Promise.all([
          fetchStoryDetails(askIDs.slice(0, 200)),
          fetchStoryDetails(showIDs.slice(0, 200)),
          fetchStoryDetails(jobIDs.slice(0, 200)),
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
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 6 }} maxW="900px" mx="auto">
      <StorySection
        title="Ask Us"
        stories={askStories}
        showAll={showAllAsk}
        setShowAll={setShowAllAsk}
        sortBy={askSort}
        setSortBy={setAskSort}
      />
      <StorySection
        title="Show More News"
        stories={showStories}
        showAll={showAllShow}
        setShowAll={setShowAllShow}
        sortBy={showSort}
        setSortBy={setShowSort}
      />
      <StorySection
        title="Job Posts"
        stories={jobStories}
        showAll={showAllJob}
        setShowAll={setShowAllJob}
        sortBy={null}
        setSortBy={null}
      />
    </Box>
  );
};

export default ShowUsPage;
