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

import UrsulaHome from './ursula-theme/layouts/HomePage';
import UrsulaHeader from './ursula-theme/sections/Header';
import UrsulaHero from './ursula-theme/sections/Hero';
import UrsulaCategoryGrid from './ursula-theme/sections/CategoryGrid';
import UrsulaFeaturedContent from './ursula-theme/sections/FeaturedContent';
import UrsulaClientLove from './ursula-theme/sections/ClientLove';
import UrsulaLatestPosts from './ursula-theme/sections/LatestPosts';

import UrsulaFooter from './ursula-theme/sections/Footer';
import { ursulaDefaultContent } from './ursula-theme/default-content';

import EmmaPortfolioHome from './emma-portfolio/layouts/HomePage';
import EmmaHeader from './emma-portfolio/sections/Header';
import EmmaHero from './emma-portfolio/sections/Hero';
import EmmaIntroduction from './emma-portfolio/sections/Introduction';
import EmmaServices from './emma-portfolio/sections/Services';
import EmmaStepsNewsletter from './emma-portfolio/sections/StepsNewsletter';
import EmmaPodcast from './emma-portfolio/sections/Podcast';
import EmmaTestimonials from './emma-portfolio/sections/Testimonials';
import EmmaRecentPosts from './emma-portfolio/sections/RecentPosts';
import EmmaQuote from './emma-portfolio/sections/Quote';
import EmmaImpact from './emma-portfolio/sections/Impact';
import EmmaExclusiveContent from './emma-portfolio/sections/ExclusiveContent';
import EmmaFooter from './emma-portfolio/sections/Footer';
import { emmaDefaultContent } from './emma-portfolio/default-content';

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
  },
  'ursula-theme': {
    name: 'Ursula Blog',
    category: 'blog',
    defaultContent: ursulaDefaultContent,
    layouts: {
      home: UrsulaHome
    },
    sections: {
      header: UrsulaHeader,
      hero: UrsulaHero,
      categories: UrsulaCategoryGrid,
      'featured-content': UrsulaFeaturedContent,
      'client-love': UrsulaClientLove,
      'latest-posts': UrsulaLatestPosts,
      footer: UrsulaFooter
    }
  },
  'emma-portfolio': {
    name: 'Emma Portfolio',
    category: 'portfolio',
    defaultContent: emmaDefaultContent,
    layouts: {
      home: EmmaPortfolioHome
    },
    sections: {
        header: EmmaHeader,
        hero: EmmaHero,
        introduction: EmmaIntroduction,
        services: EmmaServices,
        'steps-newsletter': EmmaStepsNewsletter,
        podcast: EmmaPodcast,
        testimonials: EmmaTestimonials,
        'recent-posts': EmmaRecentPosts,
        quote: EmmaQuote,
        impact: EmmaImpact,
        'exclusive-content': EmmaExclusiveContent,
        footer: EmmaFooter
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
