import { API_ENDPOINTS } from "../utils/apiEndpoints";
import MNStoryPage from "../components/stories/MNStoryPage/MNStoryPage";
import { styles } from "../styles/styles";
import { Box } from "@chakra-ui/react";

const ShowUsPage = () => (
    <Box sx={styles.container} mt={{base:'20px',sm:'30px', md:'0px'}}>
  <MNStoryPage
    title="Show MN"
    fetchIds={() => fetch(API_ENDPOINTS.STORY_IDS).then((r) => r.json())}
    slice={200}
  />
  </Box>
);

export default ShowUsPage;
