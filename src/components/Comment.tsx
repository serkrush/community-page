import { Comment as CommentType, Post as PostType } from '@/mock/posts';
import CommentForm from './CommentForm';

interface CommentProps {
  comment: CommentType;
  postId: string;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

export default function Comment({ comment, postId, posts, setPosts }: CommentProps) {
  const handleAddNestedComment = (parentCommentId: string, text: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updateComments = (comments: CommentType[]): CommentType[] =>
          comments.map((c) => {
            if (c.id === parentCommentId) {
              return {
                ...c,
                children: [
                  ...(c.children || []),
                  {
                    id: `${parentCommentId}-${(c.children || []).length + 1}`,
                    text,
                    author: 'User',
                  },
                ],
              };
            }
            if (c.children) {
              return { ...c, children: updateComments(c.children) };
            }
            return c;
          });

        return { ...post, comments: updateComments(post.comments) };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <small>Author: {comment.author}</small>

      <CommentForm
        postId={postId}
        onAddComment={(text) => handleAddNestedComment(comment.id, text)}
      />

      {comment.children && (
        <div className="nested-comments">
          {comment.children.map((child) => (
            <Comment
              key={child.id}
              comment={child}
              postId={postId}
              posts={posts}
              setPosts={setPosts}
            />
          ))}
        </div>
      )}
    </div>
  );
}
