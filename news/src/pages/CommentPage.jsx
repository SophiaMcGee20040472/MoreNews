import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import SpinLoader from "../components/ui-components/Spinner";
import { API_ENDPOINTS, formatUnixTime } from "../utils/apiEndpoints";


const fetchCommentWithReplies = async (commentId) => {
  try {
    const res = await fetch(API_ENDPOINTS.ITEM_DETAIL(commentId));
    const comment = await res.json();

    if (!comment) return null;

    if (comment.kids && comment.kids.length > 0) {
      const children = await Promise.all(
        comment.kids.map((kidId) => fetchCommentWithReplies(kidId))
      );
      comment.kids = children.filter(Boolean);
    }
    return comment;
  } catch (err) {
    console.error("Failed to fetch comment:", commentId, err);
    return null;
  }
};

const CommentBox = ({ comment, level = 0 }) => {
  return (
    <Box
      key={comment.id}
      pl={level * 6}
      mt={4}
      borderLeft={level > 0 ? "2px solid #E2E8F0" : "none"}
      borderColor="gray.300"
    >
      <Box mb={1} display="flex" alignItems="center" gap={2}>
        <Badge bg="yellow.300">{comment.type}</Badge>
        <Text fontSize="sm" color="gray.500">
          By {comment.by} — {formatUnixTime(comment.time)}
        </Text>
      </Box>
      {comment.text && (
        <Box
          fontSize="md"
          mt={1}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      )}
      <Box mt={2} fontSize="sm" color="gray.600">
        <Text>
          <strong>ID:</strong> {comment.id}
        </Text>
        <Text>
          <strong>Parent:</strong> {comment.parent ?? "N/A"}
        </Text>
        {comment.kids && (
          <Text>
            <strong>Replies:</strong> {comment.kids.length}
          </Text>
        )}
      </Box>
      {comment.kids &&
        comment.kids.map((kid) => (
          <CommentBox key={kid.id} comment={kid} level={level + 1} />
        ))}
    </Box>
  );
};

const CommentPage = ({ commentId }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComment = async () => {
      const data = await fetchCommentWithReplies(commentId);
      setComment(data);
      setLoading(false);
    };
    loadComment();
  }, [commentId]);

  if (loading) {
    return (
      <Box p={6} textAlign="center">
         <SpinLoader size="xl" />
      </Box>
    );
  }
  if (!comment) {
    return (
      <Box p={6}>
        <Text>Comment not found.</Text>
      </Box>
    );
  }
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Comment Thread
      </Heading>
      <VStack align="stretch" spacing={2}>
        <CommentBox comment={comment} />
      </VStack>
    </Box>
  );
};

export default CommentPage;
