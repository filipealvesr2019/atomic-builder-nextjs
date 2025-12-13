import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedContent from '../sections/FeaturedContent';
import ClientLove from '../sections/ClientLove';
import LatestPosts from '../sections/LatestPosts';
import Footer from '../sections/Footer';

export default function HomePage({ sections = {} }) {
  return (
    <div>
      <Header {...(sections.header || {})} />
      <Hero {...(sections.hero || {})} />
      <CategoryGrid {...(sections.categories || {})} />
      <FeaturedContent {...(sections['featured-content'] || {})} />
      <ClientLove {...(sections['client-love'] || {})} />
      <LatestPosts {...(sections['latest-posts'] || {})} />
      <Footer {...(sections.footer || {})} />
    </div>
  );
}

HomePage.cmsConfig = {
  name: "Ursula Home Page",
  sections: ['header', 'hero', 'categories', 'featured-content', 'client-love', 'latest-posts', 'footer']
};
