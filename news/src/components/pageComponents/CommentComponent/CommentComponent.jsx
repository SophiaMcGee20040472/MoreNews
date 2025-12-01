import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Collapse,
  IconButton,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { API_ENDPOINTS, formatUnixTime } from "../../../utils/apiEndpoints";
import SpinLoader from "../../ui-components/Spinner/Spinner";

const ORANGE = "#ff7600";
const MAX_COMMENT_LENGTH = 200;

const fetchComment = async (commentId) => {
  try {
    const res = await fetch(API_ENDPOINTS.ITEM_DETAIL(commentId));
    const data = await res.json();
    return data || null;
  } catch (err) {
    console.error("Failed to fetch comment:", commentId, err);
    return null;
  }
};

const CommentBox = ({ commentId, initialComment, level = 0 }) => {
  const [comment, setComment] = useState(initialComment || null);
  const [children, setChildren] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (initialComment) return;

    const loadComment = async () => {
      const data = await fetchComment(commentId);
      setComment(data);
    };
    loadComment();
  }, [commentId, initialComment]);

  const loadChildren = async () => {
    if (!comment?.kids || comment.kids.length === 0) return;
    setLoadingChildren(true);
    const kidsData = await Promise.all(
      comment.kids.map((kidId) => fetchComment(kidId))
    );
    setChildren(kidsData.filter(Boolean));
    setLoadingChildren(false);
  };

  const toggleReplies = () => {
    if (!open && children.length === 0) loadChildren();
    setOpen(!open);
  };

  if (!comment) return <SpinLoader />;
  if (!comment.id) return null;

  const showExpandButton = comment.text?.length > MAX_COMMENT_LENGTH;
  const toggleExpand = () => setExpanded(!expanded);

  const renderCommentText = () => {
    if (!comment.text) {
      if (comment.deleted) return <Text color="gray.500">[deleted]</Text>;
      if (comment.dead) return <Text color="gray.500">[dead]</Text>;
      return null;
    }

    const content =
      comment.text.length <= MAX_COMMENT_LENGTH || expanded
        ? comment.text
        : `${comment.text.substring(0, MAX_COMMENT_LENGTH)}...`;

    return (
      <Box
        fontSize="md"
        color="gray.800"
        lineHeight="1.6"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <Box
      mt={4}
      pl={level * 6}
      borderLeft={level > 0 ? `3px solid ${ORANGE}` : "none"}
    >
      <Box
        p={4}
        borderRadius="md"
        border={`2px solid ${ORANGE}`}
        bg="white"
        boxShadow="md"
      >
        <Flex justify="space-between" mb={2} align="center">
          <Flex gap={3} align="center">
            <Badge px={3} py={1} borderRadius="full" bg={ORANGE} color="white">
              {comment.type}
            </Badge>
            <Text fontSize="sm" color="gray.600">
              {comment.by ? `by ${comment.by}` : "by [unknown]"} —{" "}
              {comment.time ? formatUnixTime(comment.time) : "[unknown time]"}
            </Text>
          </Flex>
          {comment.kids?.length > 0 && (
            <IconButton
              size="sm"
              icon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              aria-label="Toggle Replies"
              onClick={toggleReplies}
              title={`${comment.kids.length} replies`}
            />
          )}
        </Flex>

        <Box position="relative">
          {renderCommentText()}
          {showExpandButton && (
            <IconButton
              size="sm"
              aria-label="Expand/Collapse Comment"
              icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              variant="ghost"
              position="absolute"
              right="0"
              top="0"
              onClick={toggleExpand}
            />
          )}
        </Box>

        <Flex gap={5} mt={3} fontSize="sm" color="gray.600">
          <Text>
            <strong>ID:</strong> {comment.id}
          </Text>
          {comment.parent && (
            <Text>
              <strong>Parent:</strong> {comment.parent}
            </Text>
          )}
          {comment.kids && comment.kids.length > 0 && (
            <Text>
              <strong>Replies:</strong> {comment.kids.length}
            </Text>
          )}
        </Flex>
      </Box>

      {/* Nested replies */}
      {open && (
        <Collapse in={open} animateOpacity>
          {loadingChildren ? (
            <Box mt={2} pl={6}>
              <SpinLoader size="sm" color={ORANGE} />
            </Box>
          ) : (
            children.map((kid) => (
              <CommentBox key={kid.id} initialComment={kid} level={level + 1} />
            ))
          )}
        </Collapse>
      )}
    </Box>
  );
};

const CommentComponent = ({ commentId }) => {
  if (!commentId)
    return <Text color="red.500">No comment ID provided.</Text>;

  return (
    <Box>
      <VStack align="stretch" spacing={2} ml={{ base: 'auto', md: 'auto',lg:'40px', xl:'auto' }}>
        <CommentBox commentId={commentId} />
      </VStack>
    </Box>
  );
};

export default CommentComponent;
