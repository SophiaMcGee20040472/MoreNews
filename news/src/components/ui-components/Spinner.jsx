import { Box, Spinner, Text, VStack, Icon} from "@chakra-ui/react";
import { TbDeviceTvOld } from "react-icons/tb";


const SpinLoader = () => {
  return (
    <VStack spacing={4} align="center" justify="center" py={10}>
      <Box position="relative" display="inline-flex">
        <Spinner
          thickness="3px"
          marginRight='12px'
          marginLeft='-12px'
          marginTop='10px'
          speed="0.9s"
          emptyColor="gray.200"
          color="#ff7600"
          size="md"
        />
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
