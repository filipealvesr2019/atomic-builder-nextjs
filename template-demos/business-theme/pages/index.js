// Página Principal - Home
import Hero from '../components/Hero';
import Features from '../components/Features';
import Contact from '../components/Contact';
import AboutPage from '../components/about';

export default function HomePage() {
  return (
    <main data-block-type="container">
      <div data-block-type="container" data-block-props='{"blockType":"header"}'>
        <Hero />
      </div>
      <div data-block-type="container" data-block-props='{"blockType":"section"}'>
        <Features />
      </div>
        <div data-block-type="container" data-block-props='{"blockType":"section"}'>
        <AboutPage />
      </div>
      
      <div data-block-type="container" data-block-props='{"blockType":"footer"}'>
        <Contact />
      </div>
    </main>
  );
}
