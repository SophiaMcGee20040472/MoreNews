import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  StackDivider,
  Link,
} from "@chakra-ui/react";
import { API_ENDPOINTS, formatUnixTime } from "../utils/apiEndpoints"; 
import SpinLoader from "../components/ui-components/Spinner";

const AskUsPage = () => {
  const [asks, setAsks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAskStories = async () => {
      try {
        const listRes = await fetch(API_ENDPOINTS.ASK_IDS);
        const askIds = await listRes.json();
        const results = await Promise.allSettled(
          askIds.map((id) =>
            fetch(API_ENDPOINTS.ITEM_DETAIL(id)).then((res) => res.json())
          )
        );
        const askObjects = results
          .filter((res) => res.status === "fulfilled")
          .map((res) => res.value);

        setAsks(askObjects);
      } catch (err) {
        console.error("Failed to load Ask MoreNews:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAskStories();
  }, []);

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <SpinLoader size="xl" />
      </Box>
    );
  }
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Ask MoreNews
      </Heading>
      <VStack
        align="stretch"
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
      >
        {asks.map((item) => (
          <Box key={item.id}>
            <Heading size="md">{item.title}</Heading>
            <Text fontSize="sm" color="gray.500">
              {formatUnixTime(item.time)} — by {item.by}
            </Text>
            <Text>
              <strong>Score:</strong> {item.score ?? 0}
            </Text>
            <Text>
              <strong>Comments:</strong> {item.descendants ?? 0}
            </Text>

            {item.url && (
              <Link
                href={item.url}
                isExternal
                color="blue.500"
                textDecoration="underline"
                mt={1}
                display="block"
              >
                {item.url}
              </Link>
            )}
            {item.text && (
              <Box
                mt={3}
                fontSize="sm"
                //I used this because hn posts can have html content
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default AskUsPage;
