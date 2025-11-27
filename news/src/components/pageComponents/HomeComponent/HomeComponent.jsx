import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Flex,
  useToast,
  Select,
} from "@chakra-ui/react";

import NewsItemCard from "../NewsItemCardComponent/NewsItemCard";
import Pagination from "../PaginationComponent/Pagination";
import SpinLoader from "../../ui-components/Spinner";
import {
  API_ENDPOINTS,
  formatUnixTime,
  parseTimeString,
} from "../../../utils/apiEndpoints";

const ITEMS_PER_PAGE = 50;
const FETCH_LIMIT = 600;
const BATCH_SIZE = 30;

async function fetchBatches(ids, batchSize = BATCH_SIZE) {
  const results = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((id) =>
        fetch(API_ENDPOINTS.ITEM_DETAIL(id))
          .then((r) => r.json())
          .catch(() => null)
      )
    );
    results.push(...batchResults);
  }
  return results;
}

function HomeComponent() {
  const [filter, setFilter] = useState("top");
  const [sortBy, setSortBy] = useState("rank");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    const listUrl =
      filter === "top"
        ? API_ENDPOINTS.TOP_STORIES_LIST
        : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      const ids = await (await fetch(listUrl)).json();
      const items = await fetchBatches(ids.slice(0, FETCH_LIMIT));

      const formatted = items
        .filter((item) => item?.title)
        .map((item, i) => ({
          key: item.id,
          rank: i + 1,
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

      setData(formatted);
    } catch {
      toast({
        title: "Failed to Load Stories",
        description: "Could not connect to API.",
        status: "error",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }, [filter, toast]);

  useEffect(() => {
    setShowAll(false); 
    setPage(1);        
    fetchNews();
  }, [filter, fetchNews]);

  useEffect(() => {
    if (showAll) setPage(1);
  }, [showAll]);

  const sorted = useMemo(() => {
    const copy = [...data];
    return copy.sort((a, b) => {
      switch (sortBy) {
        case "points":
          return b.points - a.points;
        case "comments":
          return b.comments - a.comments;
        case "newest":
          return parseTimeString(a.time) - parseTimeString(b.time);
        case "oldest":
          return parseTimeString(b.time) - parseTimeString(a.time);
        default:
          return a.rank - b.rank;
      }
    });
  }, [data, sortBy]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = showAll
    ? sorted
    : sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
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
        mt="40px"
        flexDir={{ base: "column", md: "row" }}
        justify="space-between"
        gap={4}
      >
        <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold" color="#ff7600">
          MN {filter === "top" ? "Top News" : "New Stories"}
        </Text>

        <HStack spacing={3} flexWrap="wrap">
          <Select
            border="1px solid #ff7600"
            bg="white"
            height="32px"
            width={{ base: "60%", md: "200px" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="sort">Select Filter</option>
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
            <option value="points">Top Rated</option>
            <option value="comments">Most Comments</option>
          </Select>
          <Button
            size="sm"
            bg="white"
            border="1px solid #ff7600"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Minimize View" : "Show All"}
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
          handlePageChange={(p) => setPage(p)}
        />
      )}
    </Box>
  );
}

export default HomeComponent;
