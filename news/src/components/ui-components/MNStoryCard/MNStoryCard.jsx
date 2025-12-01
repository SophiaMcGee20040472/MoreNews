import { useState, useRef, useEffect } from "react";
import { Box, Heading, Text, Badge, Flex, Link, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatUnixTime } from "../../../utils/apiEndpoints";

const ORANGE = "#ff7600";

const MNStoryCard = ({ story }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el && story.text) {
      setShowToggle(el.scrollHeight > el.clientHeight);
    }
  }, [story.text]);

  return (
    <Box
      p={{ base: 3, md: 4 }}
      borderRadius="md"
      border={`2px solid ${ORANGE}`}
      bg="white"
      transition="all .2s ease"
      _hover={{ bg: "#fff7f0", boxShadow: "lg", transform: "translateY(-2px)" }}
      w="100%"
    >
      <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} mb={2} direction={{ base: "column", md: "row" }} gap={2}>
        <Heading size={{ base: "md", md: "md" }}>{story.title}</Heading>
        <Badge px={3} py={1} borderRadius="full" fontWeight="bold" bg={ORANGE} color="white">
          {story.score ?? 0} pts
        </Badge>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={3}>
        {formatUnixTime(story.time)} — by {story.by}
      </Text>
      <Flex gap={3} mb={3} wrap="wrap" direction={{ base: "column", sm: "row" }}>
        {story.descendants !== undefined && (
          <Badge px={2} py={1} borderRadius="full" fontWeight="medium" bg={ORANGE} color="white" w="fit-content">
            {story.descendants} comments
          </Badge>
        )}
        {story.url && (
          <Link href={story.url} isExternal color={ORANGE} fontWeight="medium">
            Source
          </Link>
        )}
      </Flex>
      {story.text && (
        <Box position="relative" mt={2}>
          <Box
            ref={textRef}
            fontSize="sm"
            color="gray.700"
            dangerouslySetInnerHTML={{ __html: story.text }}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: expanded ? "none" : 3,
              transition: "all .3s ease",
            }}
          />
          {showToggle && (
            <IconButton
              aria-label="Toggle Text"
              icon={<ChevronDownIcon />}
              size="sm"
              variant="ghost"
              position="absolute"
              right="0"
              bottom="-4px"
              onClick={() => setExpanded(!expanded)}
              transform={expanded ? "rotate(180deg)" : "rotate(0deg)"}
              transition="transform 0.2s"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MNStoryCard;
