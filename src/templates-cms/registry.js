// Sistema de registro de templates CMS-compatíveis
import AvaPortfolioHome from './ava-portfolio/layouts/HomePage';
import AvaHeader from './ava-portfolio/sections/Header';
import AvaHero from './ava-portfolio/sections/Hero';
import AvaIntroduction from './ava-portfolio/sections/Introduction';
import AvaCollage from './ava-portfolio/sections/Collage';
import AvaServices from './ava-portfolio/sections/Services';
import AvaAboutIntro from './ava-portfolio/sections/AboutIntro';
import AvaTestimonials from './ava-portfolio/sections/Testimonials';
import AvaBlogGrid from './ava-portfolio/sections/BlogGrid';
import AvaFooter from './ava-portfolio/sections/Footer';
import WorkshopHero from './ava-portfolio/sections/WorkshopHero';
import WorkshopStatement from './ava-portfolio/sections/WorkshopStatement';
import WorkshopFeatures from './ava-portfolio/sections/WorkshopFeatures';
import WorkshopSteps from './ava-portfolio/sections/WorkshopSteps';
import WorkshopAbout from './ava-portfolio/sections/WorkshopAbout';
import WorkshopPricing from './ava-portfolio/sections/WorkshopPricing';
import WorkshopFinalCTA from './ava-portfolio/sections/WorkshopFinalCTA';
import WorkshopGridTopics from './ava-portfolio/sections/WorkshopGridTopics';
import WorkshopImageOverlap from './ava-portfolio/sections/WorkshopImageOverlap';
import WorkshopInfoRow from './ava-portfolio/sections/WorkshopInfoRow';
import WorkshopAccordion from './ava-portfolio/sections/WorkshopAccordion';
import WorkshopValueProp from './ava-portfolio/sections/WorkshopValueProp';
import AvaHomePage from './ava-portfolio/layouts/HomePage';
import AvaWorkshopsPage from './ava-portfolio/layouts/WorkshopsPage';
import AvaServicesPage from './ava-portfolio/layouts/ServicesPage';

import ServicesTripleHero from './ava-portfolio/sections/ServicesTripleHero';
import ServicesIntroRef from './ava-portfolio/sections/ServicesIntroRef';
import ServicesProcess from './ava-portfolio/sections/ServicesProcess';
import ServicesOverlap from './ava-portfolio/sections/ServicesOverlap';
import ServicesBanner from './ava-portfolio/sections/ServicesBanner';
import ServicesFAQ from './ava-portfolio/sections/ServicesFAQ';
import ServicesFeatured from './ava-portfolio/sections/ServicesFeatured';
import ServicesGridDetailed from './ava-portfolio/sections/ServicesGridDetailed';
import PortfolioPage from './ava-portfolio/layouts/PortfolioPage';
import PortfolioGrid from './ava-portfolio/sections/PortfolioGrid';
import PortfolioSlider from './ava-portfolio/sections/PortfolioSlider';
import PortfolioMasonry from './ava-portfolio/sections/PortfolioMasonry';


import { avaDefaultContent } from './ava-portfolio/default-content';
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

import EmmaServicesPage from './emma-portfolio/layouts/ServicesPage';
import EmmaServicesHero from './emma-portfolio/sections/ServicesHero';
import EmmaDetailedServices from './emma-portfolio/sections/DetailedServices';
import EmmaImageCTA from './emma-portfolio/sections/ImageCTA';

import EmmaContactPage from './emma-portfolio/layouts/ContactPage';
import EmmaContactHero from './emma-portfolio/sections/ContactHero';
import EmmaContactFormSection from './emma-portfolio/sections/ContactFormSection';
import EmmaContactInfoBar from './emma-portfolio/sections/ContactInfoBar';

import EmmaAboutPage from './emma-portfolio/layouts/AboutPage';
import EmmaAboutIntro from './emma-portfolio/sections/AboutIntro';
import EmmaAboutStory from './emma-portfolio/sections/AboutStory';
import EmmaAboutThings from './emma-portfolio/sections/AboutThings';
import EmmaAboutBehindScenes from './emma-portfolio/sections/AboutBehindScenes';
import EmmaAboutPassion from './emma-portfolio/sections/AboutPassion';

import EmmaBlogPage from './emma-portfolio/layouts/BlogPage';
import EmmaBlogHero from './emma-portfolio/sections/BlogHero';
import EmmaBlogGrid from './emma-portfolio/sections/BlogGrid';
import EmmaInstagramTitle from './emma-portfolio/sections/InstagramTitle';

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
      home: EmmaPortfolioHome,
      services: EmmaServicesPage,
      services: EmmaServicesPage,
      contact: EmmaContactPage,
      about: EmmaAboutPage,
      blog: EmmaBlogPage
    },
    sections: {
        header: EmmaHeader,
        hero: EmmaHero,
        'services-hero': EmmaServicesHero,
        'contact-hero': EmmaContactHero,
        'blog-hero': EmmaBlogHero,
        'instagram-title': EmmaInstagramTitle,
        'about-intro': EmmaAboutIntro,
        'about-story': EmmaAboutStory,
        'about-things': EmmaAboutThings,
        'about-behind': EmmaAboutBehindScenes,
        'about-passion': EmmaAboutPassion,
        'about-quote': EmmaQuote,
        'blog-grid': EmmaBlogGrid,
        introduction: EmmaIntroduction,

        services: EmmaServices,
        'detailed-services': EmmaDetailedServices,
        'contact-form-section': EmmaContactFormSection,
        'contact-info-bar': EmmaContactInfoBar,
        'steps-newsletter': EmmaStepsNewsletter,
        podcast: EmmaPodcast,
        testimonials: EmmaTestimonials,
        'recent-posts': EmmaRecentPosts,
        quote: EmmaQuote,
        impact: EmmaImpact,
        'image-cta': EmmaImageCTA,
        'exclusive-content': EmmaExclusiveContent,
        footer: EmmaFooter
    }
  },
  'ava-portfolio': {
    name: 'Ava Portfolio',
    category: 'portfolio',
    defaultContent: avaDefaultContent,
    layouts: {
        home: AvaPortfolioHome,
        workshops: AvaWorkshopsPage,
        services: AvaServicesPage,
        portfolio: PortfolioPage
    },
    sections: {
        header: AvaHeader,
        footer: AvaFooter,
        hero: AvaHero,
        introduction: AvaIntroduction,
        collage: AvaCollage,
        services: AvaServices,
        'about-intro': AvaAboutIntro,
        testimonials: AvaTestimonials,
        'blog-grid': AvaBlogGrid,
        'workshop-hero': WorkshopHero,
        'workshop-statement': WorkshopStatement,
        'workshop-features': WorkshopFeatures,
        'workshop-steps': WorkshopSteps,
        'workshop-about': WorkshopAbout,
        'workshop-pricing': WorkshopPricing,
        'workshop-final-cta': WorkshopFinalCTA,
        'workshop-grid-topics': WorkshopGridTopics,
        'workshop-image-overlap': WorkshopImageOverlap,
        'workshop-info-row': WorkshopInfoRow,
        'workshop-accordion': WorkshopAccordion,
        'workshop-value-prop': WorkshopValueProp,
        'services-triple-hero': ServicesTripleHero,
        'services-intro-ref': ServicesIntroRef,
        'services-process': ServicesProcess,
        'services-overlap': ServicesOverlap,
        'services-banner': ServicesBanner,
        'services-faq': ServicesFAQ,
        'services-featured': ServicesFeatured,
        'services-grid-detailed': ServicesGridDetailed,
        'portfolio-grid': PortfolioGrid,
        'portfolio-slider': PortfolioSlider,
        'portfolio-masonry': PortfolioMasonry
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
