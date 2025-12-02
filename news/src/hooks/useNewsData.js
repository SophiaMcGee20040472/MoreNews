import { useState, useEffect, useCallback, useRef } from "react";
import { API_ENDPOINTS, formatUnixTime } from "../utils/apiEndpoints";
import { getHost, applySort } from "../utils/helper";
import fetchBatches from "../utils/fetchBatches";

const FETCH_LIMIT = 600; 
const INITIAL_BATCH = 50; // Number of stories to fetch immediately
const CHUNK_SIZE = 50; // Batch size for progressive loading

// Custom hook to fetch and manage news data
export default function useNewsData(filter, sortBy, toast) {
  const [data, setData] = useState([]); // Holds the fetched news stories
  const [loading, setLoading] = useState(true); // Loading state

  // Ref to track already fetched story IDs
  const fetchedIds = useRef(new Set());

  // Function to fetch news from API
  const fetchNews = useCallback(async () => {
    setLoading(true); // Start loading spinner

    // Choose API endpoint based on filter: "top" or "new"
    const listUrl =
      filter === "top"
        ? API_ENDPOINTS.TOP_STORIES_LIST
        : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      // Fetch the list of story IDs
      const ids = await (await fetch(listUrl)).json();
      const limitedIds = ids.slice(0, FETCH_LIMIT);

      // --- Step 1: Fetch initial batch immediately ---
      const firstBatchIds = limitedIds.slice(0, INITIAL_BATCH);
      const firstBatch = await fetchBatches(firstBatchIds);

      // Format stories for UI
      const formatItems = (items) =>
        items
          .filter((item) => item?.title) // Remove items without titles
          .map((item, i) => ({
            key: item.id,
            rank: i + 1,
            unix: item.time * 1000, // Unix timestamp in ms
            time: formatUnixTime(item.time), // Human-readable time
            title: item.title,
            site: getHost(item.url), // Extract hostname from URL
            points: item.score || 0,
            comments: item.descendants ?? 0, // Number of comments
            author: item.by || "N/A",
            url: item.url,
          }));

      // Mark first batch IDs as fetched
      firstBatch.forEach(item => fetchedIds.current.add(item.id));

      setData(formatItems(firstBatch)); // Set initial batch
      setLoading(false); // Stop loader after first batch

      // --- Step 2: Load remaining batches progressively ---
      const remainingIds = limitedIds.slice(INITIAL_BATCH);
      for (let i = 0; i < remainingIds.length; i += CHUNK_SIZE) {
        const chunk = remainingIds.slice(i, i + CHUNK_SIZE);
        const results = await fetchBatches(chunk);

        // Only append items that haven't been fetched yet
        const newItems = results.filter(item => !fetchedIds.current.has(item.id));
        newItems.forEach(item => fetchedIds.current.add(item.id));

        // Append to existing data and apply current sort
        setData(prev => {
          const combined = [...prev, ...formatItems(newItems)];
          return applySort(combined, sortBy);
        });
      }
    } catch {
      // Show error toast if API fails
      toast({
        title: "Failed to Load Stories",
        description: "Could not connect to API.",
        status: "error",
        duration: 4000,
      });
      setLoading(false);
    }
  }, [filter, sortBy, toast]);

  // Fetch news when filter or sort option changes
  useEffect(() => {
    fetchNews();
  }, [filter, sortBy, fetchNews]);

  // Return data and loading state for component to use
  return { data, loading };
}
