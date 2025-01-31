import { useState } from 'react';

interface CommentFormProps {
  postId: string;
  onAddComment: (postId: string, text: string) => void;
}

export default function CommentForm({ postId, onAddComment }: CommentFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      onAddComment(postId, text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}
