import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // 'text', 'image', 'container', etc.
  props: { type: mongoose.Schema.Types.Mixed, default: {} },
  content: { type: String }, // For simple text content
});

// Add recursive children field
BlockSchema.add({ children: [BlockSchema] });

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  authorId: {
    type: String, // Clerk ID
    required: true,
  },
  blocks: [BlockSchema],
  seo: {
    title: String,
    description: String,
    keywords: [String],
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

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
