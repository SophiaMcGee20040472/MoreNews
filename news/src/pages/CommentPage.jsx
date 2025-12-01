import { Box, Divider, Heading } from "@chakra-ui/react";
import { styles } from "../styles/styles";
import CommentComponent from "../components/pageComponents/CommentComponent/CommentComponent";

const ORANGE = "#ff7600";

const CommentPage = () => {
  const topCommentId = '2921983'; 

  return (
    <Box sx={styles.container} p={{ base: 4, md: 6 }}>
      <Heading size="lg" color={ORANGE} mb={4}  ml={{ base: 'auto', md: 'auto',lg:'40px', xl:'auto' }} mt={{ base: '60px', md: '40px' }}>
        Comment Thread
      </Heading>
      <CommentComponent commentId={topCommentId} />
      <Divider my={8} />
    </Box>
  );
};

export default CommentPage;
