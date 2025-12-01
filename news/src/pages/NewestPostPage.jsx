import { Box, Divider } from "@chakra-ui/react";
import { styles } from "../styles/styles";
import NewestPost from "../components/ui-components/NewestPost/NewestPost";
const NewestPostPage = () => {
  return (
    <Box sx={styles.container}>
      <NewestPost />
      <Divider my={8} />
    </Box>
  );
};
export default NewestPostPage;
