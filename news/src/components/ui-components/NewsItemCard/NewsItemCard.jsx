import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Link,
  Image,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const CollapseTotal = 2;

const NewsItemCard = ({ item, rank }) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (el) {
      setShowButton(el.scrollHeight > el.clientHeight);
    }
  }, [item.title]);

  return (
    <Card
      border="2px solid #ff7600"
      borderRadius="xl"
      bg="white"
      p={4}
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-3px)" }}
      transition="all 0.2s"
      width="100%"
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <Box flex="1" pr={4} position="relative">
            <Link href={item.url || "#"} isExternal _hover={{ textDecoration: "none" }}>
              <Text
                ref={titleRef}
                fontSize="md"
                fontWeight="bold"
                color="#444A51"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: expanded ? "none" : CollapseTotal,
                  pr: showButton ? "24px" : "0",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {item.title}
              </Text>
            </Link>

            {showButton && (
              <IconButton
                aria-label="Toggle title"
                icon={<ChevronDownIcon />}
                size="sm"
                variant="ghost"
                position="absolute"
                right="0"
                top="0"
                onClick={() => setExpanded(!expanded)}
                transform={expanded ? "rotate(180deg)" : "rotate(0deg)"}
                transition="transform 0.2s"
              />
            )}

            <Text
              fontSize="sm"
              color="gray.500"
              mt={1}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              {item.site}
            </Text>
          </Box>

          <Text
            fontSize="md"
            fontWeight="extrabold"
            color="#ff7600"
            textDecoration="underline"
            whiteSpace="nowrap"
            ml={3}
          >
            {rank}
          </Text>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <Text fontSize="sm" color="gray.600" mb={2}>
          <Text as="span" color="#ff7600" fontWeight="bold">
            {item.points} points
          </Text>
          {" • "}
          <Link
            href={`https://news.ycombinator.com/user?id=${item.author}`}
            isExternal
            _hover={{ textDecoration: "underline" }}
          >
            {item.author}
          </Link>
          {" • "}
          {item.time}
          {" • "}
          <Link
            href={`https://news.ycombinator.com/item?id=${item.key}`}
            isExternal
            _hover={{ textDecoration: "underline" }}
          >
            {item.comments} comments
          </Link>
        </Text>

        <Image
          src={`https://picsum.photos/seed/${item.key}/600/300`}
          alt={item.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          height="100px"
          fallbackSrc="https://via.placeholder.com/300x150?text=No+Image"
          mt={2}
        />
      </CardBody>
    </Card>
  );
};

export default NewsItemCard;
