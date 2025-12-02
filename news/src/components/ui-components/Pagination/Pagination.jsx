import { Flex, Button, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({
  currentPage,    
  totalPages,     
  goToPrevPage,   // Function to go to previous page
  goToNextPage,   // Function to go to next page
  handlePageChange, // Function to go to a specific page
}) => {
  // If there is a page or less, don't render pagination
  if (totalPages <= 1) return null;

  // Build pages array to display, with ellipses
  const buildPages = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show left ellipsis if after 2
    if (currentPage > 2) pages.push("left-ellipsis");

    // Show the page before current if not close to start
    if (currentPage > 3) pages.push(currentPage - 1);

    // Show the page you are on if it's not first or last
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);

    // Show page just after current if far enough from last
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);

    // Show right ellipsis if current page is far from last
    if (currentPage < totalPages - 2) pages.push("right-ellipsis");

    // Always show last page
    pages.push(totalPages);

    // Remove duplicates in case some numbers repeat this took me a while I kept getting duplicates
    return [...new Set(pages)];
  };

  const pages = buildPages(); // Get the pages array I declared earlier

  return (
    <Flex direction="column" align="center" mt={8} gap={4}>
      <Flex align="center" wrap="wrap" justify="center" gap={2}>
        {/* Previous Page Button */}
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={goToPrevPage}
          isDisabled={currentPage === 1} // Disable on first page
          aria-label="Previous Page"
          variant="outline"
        />

        {/* Page Numbers & Ellipses */}
        {pages.map((p, i) =>
          p === "left-ellipsis" || p === "right-ellipsis" ? (
            // Render ellipsis when needed using unique identifier
            <Text key={`ellipsis-${i}`} px={2}>
              …
            </Text>
          ) : (
            // Render page number button
            <Button
              key={p}
              onClick={() => handlePageChange(p)} // Go to clicked page
              colorScheme={currentPage === p ? "orange" : "gray"} // Highlight current page
              variant={currentPage === p ? "solid" : "outline"}
              size="sm"
              minW="36px"
            >
              {p}
            </Button>
          )
        )}

        {/* Next Page Button */}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={goToNextPage}
          isDisabled={currentPage === totalPages} // Disable on last page
          aria-label="Next Page"
          variant="outline"
        />
      </Flex>
    </Flex>
  );
};

export default Pagination;
