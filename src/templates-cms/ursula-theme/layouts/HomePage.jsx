import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedContent from '../sections/FeaturedContent';
import ClientLove from '../sections/ClientLove';
import LatestPosts from '../sections/LatestPosts';
import Footer from '../sections/Footer';

export default function HomePage({ sections = {}, forceMobile = false }) {
  return (
    <div>
      <Header {...(sections.header || {})} forceMobile={forceMobile} />
      <Hero {...(sections.hero || {})} forceMobile={forceMobile} />
      <CategoryGrid {...(sections.categories || {})} forceMobile={forceMobile} />
      <FeaturedContent {...(sections['featured-content'] || {})} forceMobile={forceMobile} />
      <ClientLove {...(sections['client-love'] || {})} forceMobile={forceMobile} />
      <LatestPosts {...(sections['latest-posts'] || {})} forceMobile={forceMobile} />
      <Footer {...(sections.footer || {})} forceMobile={forceMobile} />
    </div>
  );
}

HomePage.cmsConfig = {
  name: "Ursula Home Page",
  sections: ['header', 'hero', 'categories', 'featured-content', 'client-love', 'latest-posts', 'footer']
};
