import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Footer from '../sections/Footer';

export default function HomePage({ sections = {} }) {
  return (
    <div>
      <Hero {...(sections.hero || {})} />
      <Features {...(sections.features || {})} />
      <Footer {...(sections.footer || {})} />
    </div>
  );
}

HomePage.cmsConfig = {
  name: "Página Inicial",
  description: "Layout padrão da página inicial",
  sections: ['hero', 'features', 'footer']
};
