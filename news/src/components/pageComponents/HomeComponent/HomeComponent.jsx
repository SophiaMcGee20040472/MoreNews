import { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SpinLoader from "../../ui-components/Spinner/Spinner";
import SelectFilter from "../../ui-components/SelectFilter/SelectFilter";
import Pagination from "../../ui-components/Pagination/Pagination";
import NewsGrid from "../../ui-components/NewsGrid/NewsGrid";
import { API_ENDPOINTS, formatUnixTime, parseTimeString } from "../../../utils/apiEndpoints";
import fetchBatches from "../../../utils/fetchBatches";

const ITEMS_PER_PAGE = 50;
const FETCH_LIMIT = 600;

function HomeComponent() {
  const [filter, setFilter] = useState("top");
  const [sortBy, setSortBy] = useState("rank");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    const listUrl = filter === "top" ? API_ENDPOINTS.TOP_STORIES_LIST : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      const ids = await (await fetch(listUrl)).json();
      const items = await fetchBatches(ids.slice(0, FETCH_LIMIT));

      const formatted = items
        .filter((item) => item?.title)
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

      setData(formatted);
    } catch {
      console.error("Failed to load stories");
    } finally {
      setLoading(false);
    }
  }, [filter]);

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
