import Header from '../sections/Header';
import Footer from '../sections/Footer';
import WorkshopHero from '../sections/WorkshopHero';
import WorkshopStatement from '../sections/WorkshopStatement';
import WorkshopFeatures from '../sections/WorkshopFeatures';
import WorkshopSteps from '../sections/WorkshopSteps';
import WorkshopAbout from '../sections/WorkshopAbout';
import WorkshopPricing from '../sections/WorkshopPricing';
import WorkshopFinalCTA from '../sections/WorkshopFinalCTA';
import WorkshopGridTopics from '../sections/WorkshopGridTopics';
import WorkshopImageOverlap from '../sections/WorkshopImageOverlap';
import WorkshopInfoRow from '../sections/WorkshopInfoRow';
import WorkshopAccordion from '../sections/WorkshopAccordion';
import WorkshopValueProp from '../sections/WorkshopValueProp';

const SECTION_MAP = {
    'header': Header,
    'footer': Footer,
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
    'workshop-value-prop': WorkshopValueProp
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
