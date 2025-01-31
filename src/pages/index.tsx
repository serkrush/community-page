import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addPost, addComment } from "@/store/postsSlice";
import Post from "@/components/Post";
import PostForm from "@/components/PostForm";
import {
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function Home() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();

  const handleAddPost = (title: string, content: string, author: string) => {
    const newPost = {
      title,
      content,
      author,
      comments: [],
      id: "",
    };
    dispatch(addPost(newPost));
  };

  const handleAddComment = (
    postId: string,
    comment: string,
    parentCommentId: string | undefined,
    author: string
  ) => {
    dispatch(addComment({ postId, comment, parentCommentId, author }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Community Page
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <PostForm onAddPost={handleAddPost} />
      </Paper>

      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} onAddComment={handleAddComment} />
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No posts available. Add a new post to get started!
        </Typography>
      )}
    </Container>
  );
}