import { Flex, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
  handlePageChange,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex direction="column" align="center" mt={8} gap={4}>
      <Flex
        align="center"
        wrap="wrap"       
        justify="center"
        gap={2}
        maxW="100%"    
      >
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={goToPrevPage}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
          colorScheme="yellow"
          variant="outline"
        />
        {pageNumbers.map((p) => (
          <Button
            key={p}
            onClick={() => handlePageChange(p)}
            colorScheme={currentPage === p ? "yellow" : "gray"}
            variant={currentPage === p ? "solid" : "ghost"}
            size="sm"
            minW={{base:"20px", md:"40px", lg:"40px"}}
          >
            {p}
          </Button>
        ))}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={goToNextPage}
          isDisabled={currentPage === totalPages}
          aria-label="Next Page"
          colorScheme="orange"
          variant="outline"
        />
      </Flex>
    </Flex>
  );
};

export default Pagination;
