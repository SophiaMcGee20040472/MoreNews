import { Select, HStack, Flex, Text } from "@chakra-ui/react";
import ToggleButton from "../ToggleButton/ToggleButton";

 function SelectFilter({
  filter,       // Current filter: "top" or "new"
  sortBy,       // Current sort option
  setSortBy,    // Function to change sort option
  showAll,      // Whether "show all" is enabled
  setShowAll,   // Function to toggle "show all"
  setPage,      // Function to set current page
}) {
  const ORANGE = "#ff7600"; // Highlight color I use through the app 

  return (
    <Flex
      mb={6} 
      mt="40px"
      flexDir={{ base: "column", md: "row" }} 
      justify="space-between" 
      gap={4} 
    >
      {/* Title showing which news filter is active */}
      <Text
        fontSize={{ base: "md", md: "xl" }} 
        fontWeight="bold" 
        color={ORANGE}
      >
        MN {filter === "top" ? "Top News" : "New Stories"} 
      </Text>

      <HStack spacing={3} flexWrap="wrap">
        {/* Dropdown to select sort option */}
        <Select
          border={`2px solid ${ORANGE}`} 
          bg="white" 
          height="32px" 
          width={{ base: "60%", md: "200px" }} 
          value={sortBy} // Current selected value
          onChange={(e) => setSortBy(e.target.value)} // Update sort option on change
        >
          <option value="sort">Sort By</option>
          <option value="oldest">Oldest First</option>
          <option value="newest">Newest First</option>
          <option value="points">Top Rated</option>
          <option value="comments">Most Comments</option>
        </Select>

        {/* Toggle button to switch between paginated and show-all */}
        <ToggleButton
          showAll={showAll} // Current state of "show all"
          setShowAll={setShowAll} // Function to toggle "show all"
          setPage={setPage} // Reset page when toggling
        />
      </HStack>
    </Flex>
  );
}
export default SelectFilter