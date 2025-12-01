import { Badge, Flex, Link } from "@chakra-ui/react";

const ORANGE = "#ff7600";

function Stats({ story }) {
  return (
    <Flex gap={3} wrap="wrap" mb={3}>
      {story.descendants !== undefined && (
        <Badge
          px={3}
          py={1}
          bg={ORANGE}
          color="white"
          borderRadius="full"
          fontWeight="medium"
        >
          {story.descendants} comments
        </Badge>
      )}

      {story.url && (
        <Link href={story.url} isExternal color={ORANGE} fontWeight="medium">
          Source
        </Link>
      )}
    </Flex>
  );
}
export default Stats