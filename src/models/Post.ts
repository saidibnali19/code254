import mongoose, { Schema, Document, models } from "mongoose";

// This type is for use in Mongoose i.e backend
export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  isFeatured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Prevent model overwrite on hot reloads
export default models.Post || mongoose.model<IPost>("Post", PostSchema);
