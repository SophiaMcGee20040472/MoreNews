import { Box, Divider } from "@chakra-ui/react";
import { styles } from "../styles/styles";
import LoginComponent from "../components/pageComponents/LoginComponent/LoginComponent";
const LoginPage = () => {
  return (
    <Box sx={styles.container}>
      <LoginComponent />
      <Divider my={8} />
    </Box>
  );
};
export default LoginPage;
