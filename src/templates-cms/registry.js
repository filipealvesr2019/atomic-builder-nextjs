// Sistema de registro de templates CMS-compatíveis
import MinimalBusinessHome from './minimal-business/layouts/HomePage';
import MinimalBusinessHero from './minimal-business/sections/Hero';
import MinimalBusinessFeatures from './minimal-business/sections/Features';
import MinimalBusinessFooter from './minimal-business/sections/Footer';
import MinimalBusinessHeader from './minimal-business/sections/Header';

import BusinessThemeHome from './business-theme-cms/layouts/HomePage';
import BusinessThemeHero from './business-theme-cms/sections/Hero';
import BusinessThemeFeatures from './business-theme-cms/sections/Features';
import BusinessThemeContact from './business-theme-cms/sections/Contact';
import BusinessThemeHeader from './business-theme-cms/sections/Header';

import RusticStoreHome from './rustic-store-cms/layouts/HomePage';
import RusticStoreHero from './rustic-store-cms/sections/Hero';
import RusticStoreProducts from './rustic-store-cms/sections/Products';
import RusticStoreAbout from './rustic-store-cms/sections/About';
import RusticStoreNewsletter from './rustic-store-cms/sections/Newsletter';
import RusticStoreContact from './rustic-store-cms/sections/Contact';
import RusticStoreHeader from './rustic-store-cms/sections/Header';
import RusticStoreFooter from './rustic-store-cms/sections/Footer';
import { rusticStoreDefaultContent } from './rustic-store-cms/default-content';

const templates = {
  'rustic-store-cms': {
    name: 'Rustic Store',
    category: 'ecommerce',
    defaultContent: rusticStoreDefaultContent,
    layouts: {
      home: RusticStoreHome
    },
    sections: {
      hero: RusticStoreHero,
      products: RusticStoreProducts,
      about: RusticStoreAbout,
      newsletter: RusticStoreNewsletter,
      newsletter: RusticStoreNewsletter,
      contact: RusticStoreContact,
      header: RusticStoreHeader,
      footer: RusticStoreFooter
    }
  },
  'business-theme-cms': {
    name: 'Business Theme',
    category: 'business',
    layouts: {
      home: BusinessThemeHome
    },
    sections: {
      hero: BusinessThemeHero,
      features: BusinessThemeFeatures,
      contact: BusinessThemeContact,
      header: BusinessThemeHeader
    }
  },
  'minimal-business': {
    name: 'Minimal Business',
    category: 'landing',
    layouts: {
      home: MinimalBusinessHome
    },
    sections: {
      hero: MinimalBusinessHero,
      features: MinimalBusinessFeatures,
      footer: MinimalBusinessFooter,
      header: MinimalBusinessHeader
    }
  }
};

export function getTemplate(templateId) {
  return templates[templateId] || null;
}

export function getTemplateLayout(templateId, layoutId) {
  const template = templates[templateId];
  if (!template) return null;
  return template.layouts[layoutId] || null;
}

export function registerTemplate(id, config) {
  templates[id] = config;
}

export default templates;
