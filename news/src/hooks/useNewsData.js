import { useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS, formatUnixTime } from "../utils/apiEndpoints";
import { fetchAll, getHost, applySort } from "../utils/helper";

const FETCH_LIMIT = 600;

export default function useNewsData(filter, sortBy, toast) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);

    const listUrl =
      filter === "top"
        ? API_ENDPOINTS.TOP_STORIES_LIST
        : API_ENDPOINTS.NEW_STORIES_LIST;

    try {
      const ids = await (await fetch(listUrl)).json();

      const items = await fetchAll(
        ids.slice(0, FETCH_LIMIT),
        20,
        async (id) => await fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((r) => r.json())
      );

      const formatted = items
        .filter((item) => item?.title)
        .map((item, i) => ({
          key: item.id,
          rank: i + 1,
          unix: item.time * 1000,
          time: formatUnixTime(item.time),
          title: item.title,
          site: getHost(item.url),
          points: item.score || 0,
          comments: item.descendants ?? 0,
          author: item.by || "N/A",
          url: item.url,
        }));

      const sorted = applySort(formatted, sortBy);
      setData(sorted);
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
  }, [filter, sortBy, toast]);

  useEffect(() => {
    fetchNews();
  }, [filter, sortBy, fetchNews]);

  return { data, loading };
}
