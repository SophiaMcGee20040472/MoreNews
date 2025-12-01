import { API_ENDPOINTS } from "./apiEndpoints";
export const sortStories = (stories, sortBy) => {
  if (!sortBy || sortBy === "sort") return stories;

  return [...stories].sort((a, b) => {
    const scoreA = a.score || 0;
    const scoreB = b.score || 0;

    switch (sortBy) {
      case "points":
        return scoreB - scoreA;
      case "comments":
        return (b.descendants || 0) - (a.descendants || 0);
      case "newest":
        return b.time - a.time;
      case "oldest":
        return a.time - b.time;
      default:
        return 0;
    }
  });
};

export const fetchStoryDetails = async (ids) => {
  const requests = ids.map((id) =>
    fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((res) => res.json())
  );
  return Promise.all(requests);
};
