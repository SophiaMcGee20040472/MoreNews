import { Box, Divider } from "@chakra-ui/react";
import { styles } from "../styles/styles";
import SubmitComponent from "../components/pageComponents/SubmitComponent/SubmitComponent";
const HomePage = () => {
  return (
    <Box sx={styles.container}>
      <SubmitComponent />
      <Divider my={8} />
    </Box>
  );
};
export default HomePage;
