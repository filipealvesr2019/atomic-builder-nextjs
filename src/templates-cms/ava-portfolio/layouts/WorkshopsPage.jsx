import Header from '../sections/Header';
import Footer from '../sections/Footer';
import WorkshopHero from '../sections/WorkshopHero';
import WorkshopStatement from '../sections/WorkshopStatement';
import WorkshopFeatures from '../sections/WorkshopFeatures';
import WorkshopSteps from '../sections/WorkshopSteps';
import WorkshopAbout from '../sections/WorkshopAbout';
import WorkshopPricing from '../sections/WorkshopPricing';
import WorkshopFinalCTA from '../sections/WorkshopFinalCTA';

const SECTION_MAP = {
    'header': Header,
    'footer': Footer,
    'workshop-hero': WorkshopHero,
    'workshop-statement': WorkshopStatement,
    'workshop-features': WorkshopFeatures,
    'workshop-steps': WorkshopSteps,
    'workshop-about': WorkshopAbout,
    'workshop-pricing': WorkshopPricing,
    'workshop-final-cta': WorkshopFinalCTA
};

export default function WorkshopsPage({ content = [] }) {
  return (
    <main style={{ backgroundColor: '#ebeae6' }}>
      {content.map((section, index) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) return <div key={index}>Section type "{section.type}" not found</div>;
        return (
          <Component 
            key={section.id || index} 
            {...section.props} 
          />
        );
      })}
    </main>
  );
}
