import { Flex, Button, IconButton, Text, Select } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
  handlePageChange,
}) => {
  if (totalPages <= 1) return null;

  const buildPages = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 2) pages.push("left-ellipsis");
    if (currentPage > 3) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (currentPage < totalPages - 2) pages.push("right-ellipsis");

    pages.push(totalPages);
    return [...new Set(pages)];
  };

  const pages = buildPages();

  return (
    <Flex direction="column" align="center" mt={8} gap={4}>
      <Flex align="center" wrap="wrap" justify="center" gap={2}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={goToPrevPage}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
          variant="outline"
        />

        {pages.map((p, i) =>
          p === "left-ellipsis" || p === "right-ellipsis" ? (
            <Text key={`ellipsis-${i}`} px={2}>
              …
            </Text>
          ) : (
            <Button
              key={p}
              onClick={() => handlePageChange(p)}
              colorScheme={currentPage === p ? "orange" : "gray"}
              variant={currentPage === p ? "solid" : "outline"}
              size="sm"
              minW="36px"
            >
              {p}
            </Button>
          )
        )}

        <IconButton
          icon={<ChevronRightIcon />}
          onClick={goToNextPage}
          isDisabled={currentPage === totalPages}
          aria-label="Next Page"
          variant="outline"
        />
      </Flex>
      </Flex>
  );
};

export default Pagination;
