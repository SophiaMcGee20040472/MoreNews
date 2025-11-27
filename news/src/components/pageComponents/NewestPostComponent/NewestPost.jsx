import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";

import NewsItemCard from "../NewsItemCardComponent/NewsItemCard";
import Pagination from "../PaginationComponent/Pagination";
import {
  API_ENDPOINTS,
  formatUnixTime,
  parseTimeString,
} from "../../../utils/apiEndpoints";
import SpinLoader from "../../ui-components/Spinner";

const NewPostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [liveData, setLiveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const itemsPerPage = 50;
  const FETCH_LIMIT = 500;

  const fetchNewsData = useCallback(async () => {
    setIsLoading(true);
    setLiveData([]);

    try {
      const listResponse = await fetch(API_ENDPOINTS.NEW_STORIES_LIST);
      const storyIds = await listResponse.json();
      const limitedIds = storyIds.slice(0, FETCH_LIMIT);

      const itemPromises = limitedIds.map((id) =>
        fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((res) => res.json())
      );

      const allItems = await Promise.all(itemPromises);

      const formattedData = allItems
        .filter((item) => item && item.title)
        .map((item, index) => ({
          key: item.id,
          rank: index + 1,
          title: item.title,
          site: item.url
            ? new URL(item.url).hostname.replace("www.", "")
            : "self.hn",
          points: item.score || 0,
          author: item.by || "N/A",
          time: formatUnixTime(item.time),
          comments: item.descendants ?? 0,
          url: item.url,
        }));

      setLiveData(formattedData);
    } catch (error) {
      console.error("Error fetching new posts:", error);
      toast({
        title: "Failed to Load!",
        description: "Could not Connect",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    setCurrentPage(1);
    setShowAll(false);
    fetchNewsData();
  }, [fetchNewsData]);

  const sortedData = useMemo(
    () =>
      [...liveData].sort(
        (a, b) => parseTimeString(b.time) - parseTimeString(a.time)
      ),
    [liveData]
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const currentItems = useMemo(() => {
    if (showAll) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, showAll, currentPage]);

  const startIndex = showAll ? 0 : (currentPage - 1) * itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowAll(false);
  };

  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  if (isLoading) {
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
        flexDirection={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          whiteSpace="nowrap"
          color={"#ff7600"}
          noOfLines={1}
          flexShrink={1}
        >
          MN New Stories
        </Text>
        <HStack spacing={4} flexWrap="wrap">
          <Button
            size="sm"
            bg="white"
            border="1px solid #ff7600"
            colorScheme={showAll ? "yellow" : "gray"}
            _hover={{ borderColor: "orange.400", bg: "gray.50" }}
            onClick={() => {
              setShowAll(true);
              setCurrentPage(1);
            }}
          >
            Show All ({sortedData.length} items)
          </Button>
        </HStack>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {currentItems.map((item, i) => (
          <NewsItemCard key={item.key} item={item} rank={startIndex + i + 1} />
        ))}
      </SimpleGrid>
      {!showAll && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          handlePageChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default NewPostsPage;
