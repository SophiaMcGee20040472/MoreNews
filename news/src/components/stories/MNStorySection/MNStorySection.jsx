import { Box, Flex, Heading, Select, Button, VStack } from "@chakra-ui/react";
import MNStoryCard from "../MNStoryCard/MNStoryCard";

const ORANGE = "#ff7600";

const sortStories = (stories, sortBy) => {
  if (!sortBy || sortBy === "sort") return stories;
  const sorted = [...stories];
  return sorted.sort((a, b) => {
    switch (sortBy) {
      case "points": return (b.score || 0) - (a.score || 0);
      case "comments": return (b.descendants || 0) - (a.descendants || 0);
      case "newest": return b.time - a.time;
      case "oldest": return a.time - b.time;
      default: return 0;
    }
  });
};

const MNStorySection = ({ title, stories, showAll, setShowAll, sortBy, setSortBy }) => {
  const displayed = showAll ? sortStories(stories, sortBy) : sortStories(stories, sortBy).slice(0, 8);

  return (
    <Box mb={{ base: 8, md: 10 }}>
      <Flex justify="space-between" align="center" mb={3} direction={{ base: "column", sm: "row" }} gap={3}>
        <Heading size={{ base: "lg", md: "lg" }} color={ORANGE}>{title}</Heading>
        <Flex gap={3}>
          {setSortBy && (
            <Select border="1px solid #ff7600" bg="white" height="32px" width={{ base: "60%", md: "200px" }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="sort">Sort By</option>
              <option value="points">Top Rated</option>
              <option value="comments">Most Comments</option>
            </Select>
          )}
          {stories.length > 8 && (
            <Button bg={ORANGE} color="white" _hover={{ bg: "#e66a00" }} size="sm" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Collapse" : "Show All"}
            </Button>
          )}
        </Flex>
      </Flex>
      <VStack align="stretch" spacing={4}>
        {displayed.map(story => <MNStoryCard key={story.id} story={story} />)}
      </VStack>
    </Box>
  );
};

export default MNStorySection;
