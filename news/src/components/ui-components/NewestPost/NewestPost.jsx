import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Box, SimpleGrid, Flex, useToast } from "@chakra-ui/react";

import NewsItemCard from "../NewsItemCard/NewsItemCard";
import Pagination from "../Pagination/Pagination";
import SpinLoader from "../Spinner/Spinner";
import SelectFilter from "../SelectFilter/SelectFilter";
import fetchBatches from "../../../utils/fetchBatches";
import { API_ENDPOINTS, formatUnixTime, parseTimeString } from "../../../utils/apiEndpoints";

const ITEMS_PER_PAGE = 50;
const FETCH_LIMIT = 550; // Maximum stories to fetch
const INITIAL_BATCH = 50; // Number of stories to show immediately
const CHUNK_SIZE = 50; // Size of each progressive batch

function NewestPost() {
  const toast = useToast();

  // State management
  const [data, setData] = useState([]); // Story data
  const [loading, setLoading] = useState(true); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [showAll, setShowAll] = useState(false); // Show all items
  const [filter, setFilter] = useState("new"); // New / Top stories
  const [sortBy, setSortBy] = useState("newest"); // Sort criteria

  // Ref to track already fetched story IDs
  const fetchedIds = useRef(new Set());

  // --- Fetch stories progressively ---
  const fetchNews = useCallback(async () => {
    setLoading(true); // Start loader

    const listUrl =
      filter === "top"
        ? API_ENDPOINTS.TOP_STORIES_LIST
        : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      // Fetch story IDs
      const ids = await (await fetch(listUrl)).json();
      const limitedIds = ids.slice(0, FETCH_LIMIT);

      // --- Step 1: Fetch initial batch immediately ---
      const firstBatchIds = limitedIds.slice(0, INITIAL_BATCH);
      const firstBatch = await fetchBatches(firstBatchIds);

      // Format stories
      const formatItems = (items) =>
        items
          .filter((item) => item?.title) // Remove items without titles
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

      // Mark first batch IDs as fetched
      firstBatch.forEach(item => fetchedIds.current.add(item.id));

      // Save first batch for immediate render
      setData(formatItems(firstBatch));
      setLoading(false); // Stop loader after first batch

      // --- Step 2: Load remaining batches progressively ---
      const remainingIds = limitedIds.slice(INITIAL_BATCH);

      for (let i = 0; i < remainingIds.length; i += CHUNK_SIZE) {
        const chunk = remainingIds.slice(i, i + CHUNK_SIZE);
        const results = await fetchBatches(chunk);

        // Only append items that haven't been fetched yet
        const newItems = results.filter(item => !fetchedIds.current.has(item.id));
        newItems.forEach(item => fetchedIds.current.add(item.id));

        // Append new items to existing data
        setData(prev => [...prev, ...formatItems(newItems)]);
      }
    } catch (err) {
      console.error("Failed to load stories", err);
      setLoading(false);
      toast({
        title: "Failed to load stories",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [filter,toast]); // removed toast from deps to prevent unnecessary re-renders

  // --- Fetch news when filter changes ---
  useEffect(() => {
    setShowAll(false); // Reset showAll
    setPage(1); // Reset page
    fetchNews();
  }, [filter, fetchNews]);

  // --- Reset page if showAll is toggled ---
  useEffect(() => {
    if (showAll) setPage(1);
  }, [showAll]);

  // --- Sort stories ---
  const sorted = useMemo(() => {
    const copy = [...data];
    return copy.sort((a, b) => {
      // Switch statement for sorting items and parsing string item times eg. 1 hour and 23 mins
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

  // --- Pagination ---
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    if (showAll) return sorted;
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [sorted, page, showAll]);
  const startIndex = showAll ? 0 : (page - 1) * ITEMS_PER_PAGE;

  // --- Loading state for first batch ---
  if (loading && data.length === 0) {
    return (
      <Flex justify="center" align="center" minH="40vh">
        <SpinLoader />
      </Flex>
    );
  }

  return (
    <Box px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      {/* Filters & Sorting */}
      <SelectFilter
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showAll={showAll}
        setShowAll={setShowAll}
        setPage={setPage}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {paginated.map((item, i) => (
          <NewsItemCard key={item.key} item={item} rank={startIndex + i + 1} />
        ))}
      </SimpleGrid>

      {/* Pagination - only if not showing all */}
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

export default NewestPost;
