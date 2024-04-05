import mongoose, { Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  points: number;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  points: { type: Number, default: 0 },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;