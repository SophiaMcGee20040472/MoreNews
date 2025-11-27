import { Box, Divider } from "@chakra-ui/react";
import HomeComponent from "../components/pageComponents/HomeComponent/HomeComponent";
import { styles } from "../styles/styles";
const HomePage = () => {
  return (
    <Box sx={styles.container}>
      <HomeComponent />
      <Divider my={8} />
    </Box>
  );
};
export default HomePage;
