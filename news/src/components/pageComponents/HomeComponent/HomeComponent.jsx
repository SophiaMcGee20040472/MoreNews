import { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import SpinLoader from "../../ui-components/Spinner/Spinner";
import SelectFilter from "../../ui-components/SelectFilter/SelectFilter";
import Pagination from "../../ui-components/Pagination/Pagination";
import NewsGrid from "../../ui-components/NewsGrid/NewsGrid";
import {
  API_ENDPOINTS,
  formatUnixTime,
  parseTimeString,
} from "../../../utils/apiEndpoints";
import fetchBatches from "../../../utils/fetchBatches";

// Default settings
const DEFAULT_ITEMS_PER_PAGE = 50;
const FETCH_LIMIT = 600;

function HomeComponent() {
  // State Management 
  const [filter, setFilter] = useState("top"); // Top or New stories
  const [sortBy, setSortBy] = useState("rank"); // How to sort stories
  const [page, setPage] = useState(1); // Current page number
  const [showAll, setShowAll] = useState(false); // Showing all the items or paginate
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE); // How many items per page
  const [data, setData] = useState([]); // Story data
  const [loading, setLoading] = useState(true); // Load state

  // Fetch from API 
  const fetchNews = useCallback(async () => {
    setLoading(true); // Start loader

    // Deciding which API endpoint to use
    const listUrl =
      filter === "top"
        ? API_ENDPOINTS.TOP_STORIES_LIST
        : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      // Fetch story IDs
      const ids = await (await fetch(listUrl)).json();

      // Fetch story details in batches
      const items = await fetchBatches(ids.slice(0, FETCH_LIMIT));

      // Format stories
      const formatted = items
        .filter((item) => item?.title) // This is removing items with no titles
        .map((item, i) => ({
          key: item.id,
          rank: i + 1,
          title: item.title,
          site: item.url ? new URL(item.url).hostname.replace("www.", "") : "self.hn", 
          points: item.score || 0,
          author: item.by || "N/A",
          time: formatUnixTime(item.time),
          comments: item.descendants ?? 0,
          url: item.url,
        }));

      setData(formatted); // Save formatted data
    } catch {
      console.error("Failed to load stories");
    } finally {
      setLoading(false); // Stopping loader
    }
  }, [filter]);

  // Fetches news when filter might changes 
  useEffect(() => {
    setShowAll(false); // Reset showAll
    setPage(1); // Reset page
    fetchNews();
  }, [filter, fetchNews]);

  // Resets page if showAll has taken effect
  useEffect(() => {
    if (showAll) setPage(1);
  }, [showAll]);

  //  Sort stories
  const sorted = useMemo(() => {
    const copy = [...data];
    return copy.sort((a, b) => {
      //switch statement for sorting items and parsing string item times eg. 1 hour and 23 mins
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

  //Pagination
  //got a little help from ai here as I kept confusing myself.
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = showAll
    ? sorted
    : sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const startIndex = showAll ? 0 : (page - 1) * itemsPerPage;

  // Showing custom made Spinner I decided to make a spinner on a tv icon gotten from reactIcons
  if (loading) {
    return (
      <Flex justify="center" align="center" minH="40vh">
        <SpinLoader />
      </Flex>
    );
  }

  return (
    <Box px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/* Filters & sorting custom reusable component */}
      <SelectFilter
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showAll={showAll}
        setShowAll={setShowAll}
        setPage={setPage}
      />

      <NewsGrid items={paginated} startIndex={startIndex} />

      {/* Pagination & controls */}
      <Flex mt={4} justify="space-between" align="center" flexWrap="wrap" gap={2}>
        {/* Item count - hidden on small screens */}
        <Text mt="30px" display={{ base: "none", md: "block" }}>
          {paginated.length} of {sorted.length} items
        </Text>

        {/* Pagination - only if not showing all */}
        {!showAll && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            goToPrevPage={() => setPage((p) => Math.max(1, p - 1))}
            goToNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
            handlePageChange={(p) => setPage(p)}
          />
        )}

        {/* Items per page selected - hidden for small screens */}
        <Flex align="center" gap={2} mt="30px" display={{ base: "none", md: "flex" }}>
          <Text>Items per page:</Text>
          <Select
            value={itemsPerPage}
            w="fit-content"
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1); // Reset page when items per page changes
            }}
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HomeComponent;
