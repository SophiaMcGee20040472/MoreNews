import { useState, useMemo } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";

import NewsItemCard from "../NewsItemCard/NewsItemCard";
import Pagination from "../Pagination/Pagination";
import SpinLoader from "../Spinner/Spinner";
import useNewsData from "../../../hooks/useNewsData";

const ITEMS_PER_PAGE = 50;
const ORANGE = "#ff7600";

function NewestPost() {
  const toast = useToast();

  const { data, loading } = useNewsData("new", "newest", toast);

  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    if (showAll) return data;
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, showAll, page]);

  const startIndex = showAll ? 0 : (page - 1) * ITEMS_PER_PAGE;

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="40vh">
        <SpinLoader />
      </Flex>
    );
  }

  return (
    <Box px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Flex
        mb={6}
        mt="50px"
        flexDir={{ base: "column", md: "row" }}
        justify="space-between"
        gap={4}
      >
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color={ORANGE}
          noOfLines={1}
        >
          MN New Stories
        </Text>

        <HStack spacing={4} flexWrap="wrap">
          <Button
            size="sm"
            bg="white"
            border={`2px solid ${ORANGE}`}
            onClick={() => {
              setShowAll(true);
              setPage(1);
            }}
          >
            Show All
          </Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {paginated.map((item, i) => (
          <NewsItemCard key={item.key} item={item} rank={startIndex + i + 1} />
        ))}
      </SimpleGrid>

       {!showAll && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          goToPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          goToNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
          handlePageChange={setPage}
        />
      )} 
    </Box>
  );
}
export default NewestPost