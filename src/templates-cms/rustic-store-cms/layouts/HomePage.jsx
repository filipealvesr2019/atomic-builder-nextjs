import Hero from '../sections/Hero';
import Products from '../sections/Products';
import About from '../sections/About';
import Newsletter from '../sections/Newsletter';
import Contact from '../sections/Contact';

export default function HomePage({ sections = {} }) {
  return (
    <div>
      <Hero {...(sections.hero || {})} />
      <Products {...(sections.products || {})} />
      <About {...(sections.about || {})} />
      <Newsletter {...(sections.newsletter || {})} />
      <Contact {...(sections.contact || {})} />
    </div>
  );
}

HomePage.cmsConfig = {
  name: "Página Inicial",
  sections: ['hero', 'products', 'about', 'newsletter', 'contact']
};
