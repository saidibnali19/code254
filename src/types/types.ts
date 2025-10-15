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
  author: {
    id: string;
    name: string;
  };
  tags: string[];
  isFeatured: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
  published: boolean;
}
