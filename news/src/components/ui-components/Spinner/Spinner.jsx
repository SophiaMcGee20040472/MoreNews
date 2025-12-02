import { Box, Spinner, Text, VStack, Icon} from "@chakra-ui/react";
import { TbDeviceTvOld } from "react-icons/tb";
import { styles } from "../../../styles/styles";


const SpinLoader = () => {
  return (
    <VStack spacing={4} align="center" justify="center" py={10}>
      <Box position="relative" display="inline-flex">
        <Spinner
        sx={styles.spinnerStyle}
          speed="0.9s"
        />
          {/* I added a Tv icon and had a spinner show centred in the middle */}
        <Icon
          as={TbDeviceTvOld}
          boxSize='100px'
          color="#ff7600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
      <Text fontSize="lg" color="gray.600" fontWeight="medium" mt='20px'>
        Loading MoreNews
      </Text>
    </VStack>
  );
};

export default SpinLoader;
