import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Products from '../sections/Products';
import About from '../sections/About';
import Newsletter from '../sections/Newsletter';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function HomePage({ sections = {} }) {
  return (
    <div>
      <Header {...(sections.header || {})} />
      <Hero {...(sections.hero || {})} />
      <Products {...(sections.products || {})} />
      <About {...(sections.about || {})} />
      <Newsletter {...(sections.newsletter || {})} />
      <Contact {...(sections.contact || {})} />
      <Footer {...(sections.footer || {})} />
    </div>
  );
}

HomePage.cmsConfig = {
  name: "Home Page",
  sections: ['header', 'hero', 'products', 'about', 'newsletter', 'contact', 'footer']
};
