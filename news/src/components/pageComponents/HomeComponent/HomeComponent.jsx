import { useState, useMemo, useEffect, useCallback, useRef } from "react";
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

const DEFAULT_ITEMS_PER_PAGE = 50;
const FETCH_LIMIT = 500;
const INITIAL_BATCH = 50;

function HomeComponent() {
  const [filter, setFilter] = useState("top"); // Top or New stories
  const [sortBy, setSortBy] = useState("rank"); // How to sort stories
  const [page, setPage] = useState(1); // Current page number
  const [showAll, setShowAll] = useState(false); // Showing all the items or paginate
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE); // How many items per page
  const [data, setData] = useState([]); // Story data
  const [loading, setLoading] = useState(true); // Load state

  const fetchedIds = useRef(new Set());

  const fetchNews = useCallback(async () => {
    setLoading(true);

    // Deciding which API endpoint to use
    const listUrl =
      filter === "top"
        ? API_ENDPOINTS.TOP_STORIES_LIST
        : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      const ids = await (await fetch(listUrl)).json();
      const limitedIds = ids.slice(0, FETCH_LIMIT);

      const firstBatchIds = limitedIds.slice(0, INITIAL_BATCH);
      const firstBatch = await fetchBatches(firstBatchIds);

      const formatItems = (items) =>
        items
          .filter((item) => item?.title) // This is removing items with no titles
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

      firstBatch.forEach((item) => fetchedIds.current.add(item.id));
      setData(formatItems(firstBatch));
      setLoading(false);

      const remainingIds = limitedIds.slice(INITIAL_BATCH);
      const chunkSize = 50;

      for (let i = 0; i < remainingIds.length; i += chunkSize) {
        const chunk = remainingIds.slice(i, i + chunkSize);
        const results = await fetchBatches(chunk);

        const newItems = results.filter(
          (item) => !fetchedIds.current.has(item.id)
        );
        newItems.forEach((item) => fetchedIds.current.add(item.id));

        setData((prev) => [...prev, ...formatItems(newItems)]);
      }
    } catch {
      console.error("Failed to load stories");
      setLoading(false); // Stopping loader
    }
  }, [filter]);

  // Fetches news when filter might changes
  useEffect(() => {
    setShowAll(false);
    setPage(1);
    fetchNews();
  }, [filter, fetchNews]);

  // Resets page if showAll has taken effect
  useEffect(() => {
    setPage(1);
  }, [showAll, itemsPerPage]);
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

  const startItem = showAll ? 1 : startIndex + 1;
  const endItem = showAll
    ? sorted.length
    : Math.min(page * itemsPerPage, sorted.length);
  // Showing custom made Spinner I decided to make a spinner on a tv icon gotten from reactIcons
  if (loading && data.length === 0) {
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
      <Flex
        mt={4}
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap={2}
      >
        {/* Item range display */}
        <Text mt="30px" display={{ base: "none", md: "block" }}>
          {startItem}–{endItem} of {sorted.length} items
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
        <Flex
          align="center"
          gap={2}
          mt="30px"
          display={{ base: "none", md: "flex" }}
        >
          <Text>Items per page:</Text>
          <Select
            borderColor="#ff7600"
            value={itemsPerPage}
            w="fit-content"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
