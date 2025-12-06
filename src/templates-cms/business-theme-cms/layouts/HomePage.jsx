import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Contact from '../sections/Contact';

export default function HomePage({ sections = {} }) {
  return (
    <div>
      <Header {...(sections.header || {})} />
      <Hero {...(sections.hero || {})} />
      <Features {...(sections.features || {})} />
      <Contact {...(sections.contact || {})} />
    </div>
  );
}

HomePage.cmsConfig = {
  name: "Página Inicial",
  sections: ['hero', 'features', 'contact']
};
