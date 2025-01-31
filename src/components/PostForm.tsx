import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

interface PostFormProps {
  onAddPost: (title: string, content: string, author: string) => void;
}

export default function PostForm({ onAddPost }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && author.trim()) {
      onAddPost(title, content, author);
      setTitle("");
      setContent("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="body1" component="p" gutterBottom>
        New post.
      </Typography>
      <TextField
        label="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        variant="outlined"
        fullWidth
        required
        sx={{ mb: 1 }}
      />
      <TextField
        label="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
        required
        sx={{ mb: 1 }}
      />
      <TextField
        label="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        required
      />
      <Stack direction="row" justifyContent="space-between">
        <Box></Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: "flex-end" }}
        >
          Add Post
        </Button>
      </Stack>
    </Box>
  );
}
