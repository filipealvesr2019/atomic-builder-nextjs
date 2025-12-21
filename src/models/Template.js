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
  templateId: {
    type: String, // ID for CMS-compatible templates (e.g., 'rustic-store-cms')
  },
  sections: {
    type: mongoose.Schema.Types.Mixed, // Props for template sections
  },
  url: {
    type: String, // URL for iframe-based templates
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
  products: [
    {
      id: mongoose.Schema.Types.String,
      name: String,
      price: Number,
      currency: String,
      category: String,
      subcategory: String,
      measurementUnit: String,
      colors: String,
      sizes: String,
      description: String,
      coverImage: String, // Main product image/cover
      coverImagePublicId: String,
      digitalProductFile: String, 
      digitalProductFilePublicId: String,
      digitalProductCover: String,
      digitalProductCoverPublicId: String,
      type: { type: String, enum: ['physical', 'digital'] }
    }
  ],
  authorId: {
    type: String,
    required: true,
  },
  plugins: [
    {
      id: String,
      installedAt: { type: Date, default: Date.now }
    }
  ],
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
