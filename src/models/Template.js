import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['page', 'section', 'block', 'theme'],
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // The JSON structure of the template
    required: true,
  },
  pages: [
    {
      name: String,
      slug: String,
      content: mongoose.Schema.Types.Mixed, // Array of blocks for this page
      rawHtml: String, // HTML/JSX original completo
      rawCss: String, // CSS original (modules, inline, etc)
      componentCode: String, // Código do componente original completo
    }
  ], // Used for 'theme' type templates
  authorId: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);
