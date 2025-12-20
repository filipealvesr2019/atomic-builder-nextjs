'use client';
import styles from './Services.module.css';

export default function Services({ 
    services = []
}) {
  const defaultServices = [
    { number: "01", title: "Wedding Photography", description: "Capturing the magic of your special day." },
    { number: "02", title: "Portrait Sessions", description: "Creating beautiful and authentic portraits." },
    { number: "03", title: "Lifestyle Shoots", description: "Documenting real-life moments naturally." }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        {displayServices.map((service, index) => (
            <div key={index} className={styles.card}>
                <div className={styles.number}>{service.number}</div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
            </div>
        ))}
      </div>
    </section>
  );
}

Services.cmsConfig = {
    name: "Ava Services",
    props: {
        services: {
            type: "array",
            label: "Services List",
            itemSchema: {
                number: { type: "string", label: "Number (01)" },
                title: { type: "string", label: "Title" },
                description: { type: "string", label: "Description" }
            }
        }
    }
};
