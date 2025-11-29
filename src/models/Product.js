import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: [String], // URLs from Cloudinary
  categories: [String],
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
