import { Box, Divider } from "@chakra-ui/react";
import { styles } from "../styles/styles";
import NewPost from "../components/pageComponents/NewestPostComponent/NewestPost";
const NewestPostPage = () => {
  return (
    <Box sx={styles.container}>
      <NewPost />
      <Divider my={8} />
    </Box>
  );
};
export default NewestPostPage;
