import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Paper,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { Post as PostType, Comment } from "@/mock/posts";

interface PostProps {
  post: PostType;
  onAddComment: (
    postId: string,
    comment: string,
    parentId: string | undefined,
    author: string
  ) => void;
}

const Post: React.FC<PostProps> = ({ post, onAddComment }) => {
  const [commentForm, setCommentForm] = useState({
    text: "",
    author: "",
  });

  const [replyForm, setReplyForm] = useState({
    text: "",
    author: "",
    replyToCommentId: undefined as string | undefined,
  });

  const handleCommentFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReplyFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReplyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (commentForm.text.trim() && commentForm.author.trim()) {
      onAddComment(post.id, commentForm.text, undefined, commentForm.author);
      setCommentForm({ text: "", author: "" });
    }
  };

  const handleAddReply = () => {
    if (replyForm.text.trim() && replyForm.author.trim()) {
      onAddComment(
        post.id,
        replyForm.text,
        replyForm.replyToCommentId,
        replyForm.author
      );
      setReplyForm({ text: "", author: "", replyToCommentId: undefined });
    }
  };

  const handleReply = (commentId: string) => {
    setReplyForm({ text: "", author: "", replyToCommentId: commentId });
  };

  const renderComments = (comments: Comment[], depth = 0) =>
    comments.map((comment) => (
      <Box key={comment.id} sx={{ marginLeft: depth * 3, marginBottom: 2 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: depth > 0 ? "none" : "1px 1px 10px rgba(0, 0, 0, 0.1)",
            marginTop: depth > 0 ? 2 : 0,
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {comment.author[0]}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                {comment.author}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {comment.text}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", padding: "8px 16px" }}>
            <Button size="small" onClick={() => handleReply(comment.id)}>
              Reply
            </Button>
          </CardActions>

          {replyForm.replyToCommentId === comment.id && (
            <Box
              sx={{
                padding: 2,
                backgroundColor: "#f1f1f1",
                borderRadius: "8px",
              }}
            >
              <TextField
                label="Your Name"
                name="author"
                value={replyForm.author}
                onChange={handleReplyFormChange}
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 1 }}
              />
              <TextField
                label="Add a Comment"
                name="text"
                value={replyForm.text}
                onChange={handleReplyFormChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleAddReply}
                sx={{ marginTop: 1 }}
              >
                Submit Reply
              </Button>
            </Box>
          )}
        </Card>

        {comment.children &&
          comment.children.length > 0 &&
          renderComments(comment.children, depth + 1)}
      </Box>
    ));

  return (
    <Paper
      key={post.id}
      sx={{
        p: 3,
        mb: 2,
        backgroundColor: "#fff",
        boxShadow: 1,
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {post.title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Avatar>{post.author[0]}</Avatar>
        <Typography variant="body1" fontWeight="bold">
          {post.author}
        </Typography>
      </Stack>
      <Typography variant="body1" mb={2}>
        {post.content}
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <TextField
          label="Your Name"
          name="author"
          value={commentForm.author}
          onChange={handleCommentFormChange}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 1 }}
        />
        <TextField
          label="Add a Comment"
          name="text"
          value={commentForm.text}
          onChange={handleCommentFormChange}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{ marginTop: 1 }}
        >
          Add Comment
        </Button>
      </Box>

      {renderComments(post.comments)}
    </Paper>
  );
};

export default Post;
