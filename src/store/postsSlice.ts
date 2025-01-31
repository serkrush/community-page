import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { posts as initialPosts } from "@/mock/posts";
import { Post } from "@/mock/posts";
import { v4 as uuidv4 } from "uuid";

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: initialPosts,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      const newPost = {
        ...action.payload,
        id: uuidv4(),
      };
      state.posts.unshift(newPost);
    },
    addComment(
      state,
      action: PayloadAction<{
        postId: string;
        comment: string;
        parentCommentId: string | undefined;
        author: string;
      }>
    ) {
      const { postId, comment, parentCommentId, author } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        const newComment = {
          id: uuidv4(),
          text: comment,
          author,
          comments: [],
        };
        if (parentCommentId && parentCommentId !== null) {
          const addCommentToTree = (
            comments: typeof post.comments,
            parentId: string | null
          ): typeof post.comments => {
            if (!parentId) {
              return [...comments, newComment];
            }

            return comments.map((existingComment) => {
              if (existingComment.id === parentId) {
                return {
                  ...existingComment,
                  children: [...(existingComment.children ?? []), newComment],
                };
              }

              return {
                ...existingComment,
                children: addCommentToTree(
                  existingComment.children ?? [],
                  parentId
                ),
              };
            });
          };

          post.comments = addCommentToTree(post.comments, parentCommentId);
        } else {
          post.comments.push(newComment);
        }
      }
    },
  },
});

export const { addPost, addComment } = postsSlice.actions;

export default postsSlice.reducer;
