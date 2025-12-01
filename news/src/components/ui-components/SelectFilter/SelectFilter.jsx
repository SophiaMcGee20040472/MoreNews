import { Select, HStack, Flex, Text } from "@chakra-ui/react";
import ToggleButton from "../ToggleButton/ToggleButton";

export default function SelectFilter({
  filter,
  sortBy,
  setSortBy,
  showAll,
  setShowAll,
  setPage,
}) {
  const ORANGE = "#ff7600";

  return (
    <Flex
      mb={6}
      mt="40px"
      flexDir={{ base: "column", md: "row" }}
      justify="space-between"
      gap={4}
    >
      <Text
        fontSize={{ base: "md", md: "xl" }}
        fontWeight="bold"
        color={ORANGE}
      >
        MN {filter === "top" ? "Top News" : "New Stories"}
      </Text>

      <HStack spacing={3} flexWrap="wrap">
        <Select
          border={`2px solid ${ORANGE}`}
          bg="white"
          height="32px"
          width={{ base: "60%", md: "200px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="sort">Sort By</option>
          <option value="oldest">Oldest First</option>
          <option value="newest">Newest First</option>
          <option value="points">Top Rated</option>
          <option value="comments">Most Comments</option>
        </Select>
        <ToggleButton
          showAll={showAll}
          setShowAll={setShowAll}
          setPage={setPage}
        />
      </HStack>
    </Flex>
  );
}
