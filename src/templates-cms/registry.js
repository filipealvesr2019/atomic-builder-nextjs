// Sistema de registro de templates CMS-compatíveis
import MinimalBusinessHome from './minimal-business/layouts/HomePage';
import business_theme_cms_home from './business-theme-cms/layouts/HomePage.jsx';

const templates = {
  'business-theme-cms': {
    name: 'Business Theme',
    layouts: {
      home: business_theme_cms_home
    }
  },
  'minimal-business': {
    name: 'Minimal Business',
    layouts: {
      home: MinimalBusinessHome
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
