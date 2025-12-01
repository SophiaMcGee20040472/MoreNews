import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SpinLoader from "../../ui-components/Spinner/Spinner";
import MNStorySection from "../MNStorySection/MNStorySection";
import { API_ENDPOINTS } from "../../../utils/apiEndpoints";

export const fetchStoryDetails = async (ids) => {
  const requests = ids.map((id) =>
    fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((res) => res.json())
  );
  return Promise.all(requests);
};
const MNStoryPage = ({ title, fetchIds, slice = 200, showSortDefault = true }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState(showSortDefault ? "sort" : null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const ids = await fetchIds();
        const data = await fetchStoryDetails(ids.slice(0, slice));
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, [fetchIds, slice]);

  if (loading) return <Flex justify="center" align="center" minH="40vh"><SpinLoader /></Flex>;

  return (
    <Box p={{ base: 4, md: 6 }} maxW="900px" mx="auto" >
      <MNStorySection
        title={title}
        stories={stories}
        showAll={showAll}
        setShowAll={setShowAll}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </Box>
  );
};

export default MNStoryPage;
