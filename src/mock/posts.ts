import { v4 as uuidv4 } from 'uuid';
export interface Comment {
    id: string;
    text: string;
    author: string;
    children?: Comment[];
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    comments: Comment[];
  }
  
  export const posts: Post[] = [
    {
      id: uuidv4(),
      title: 'Welcome to the Community',
      content: 'This is the first post in our community. Feel free to comment and share your thoughts!',
      author: 'Admin',
      comments: [
        {
          id: uuidv4(),
          text: 'This is a great platform!',
          author: 'User1',
          children: [
            {
              id: uuidv4(),
              text: 'Totally agree!',
              author: 'User2',
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Community Guidelines',
      content: 'Please follow our guidelines to maintain a healthy environment.',
      author: 'Admin',
      comments: [],
    },
  ];
  