export interface User {
  id: string;
  name: string;
  email: string;
}

// This type is for use in api routes and frontend UI
export interface PostData {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  author: User;
  tags: string[];
  isFeatured: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
  published: boolean;
}

export interface LoginButtonProps {
  href?: string;
  variant?: "button" | "link";
}

export interface SignupButtonProps {
  href?: string;
  variant?: "button" | "link";
}

export interface CommentData {
  _id?: string;
  post: string;
  author: {
    id: string;
    name: string;
  };
  content: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
