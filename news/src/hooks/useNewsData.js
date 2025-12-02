import { useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS, formatUnixTime } from "../utils/apiEndpoints";
import { fetchAll, getHost, applySort } from "../utils/helper";

const FETCH_LIMIT = 600; // Maximum number of news items to fetch

// Custom hook to fetch and manage news data
export default function useNewsData(filter, sortBy, toast) {
  const [data, setData] = useState([]); // Holds the fetched news stories
  const [loading, setLoading] = useState(true); // Loading state

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

      // Fetch story details in batches using helper function
      const items = await fetchAll(
        ids.slice(0, FETCH_LIMIT), // Limit number of stories
        20, // Batch size for fetching
        async (id) => await fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((r) => r.json())
      );

      // Format the stories for UI
      const formatted = items
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

      // Sort stories based on current sort option
      const sorted = applySort(formatted, sortBy);

      setData(sorted); // Update state with sorted stories
    } catch {
      // Show error toast if API fails
      toast({
        title: "Failed to Load Stories",
        description: "Could not connect to API.",
        status: "error",
        duration: 4000,
      });
    } finally {
      setLoading(false); // Stop loading spinner
    }
  }, [filter, sortBy, toast]);

  // Fetch news when filter or sort option changes
  useEffect(() => {
    fetchNews();
  }, [filter, sortBy, fetchNews]);

  // Return data and loading state for component to use
  return { data, loading };
}
