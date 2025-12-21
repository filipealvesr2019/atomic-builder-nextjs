'use client';
import React from 'react';
import styles from './ServicesGridDetailed.module.css';

export default function ServicesGridDetailed({ 
    title = "Discover Our Packages",
    services = [
        { 
            number: "01", 
            name: "THE WEDDING PACKAGE", 
            description: "Full day coverage, two photographers, and a premium album to tell your story.",
            price: "FROM $3,500"
        },
        { 
            number: "02", 
            name: "GETTING ENGAGED", 
            description: "An intimate 2-hour session at a location of your choice with 50+ edited images.",
            price: "FROM $650"
        },
        { 
            number: "03", 
            name: "THE ELOPEMENT", 
            description: "4 hours of coverage for your intimate celebration, focusing on raw emotion.",
            price: "FROM $1,800"
        },
        { 
            number: "04", 
            name: "LIFESTYLE SESSION", 
            description: "Documenting your everyday magic in a natural and candid way at home.",
            price: "FROM $500"
        }
    ]
}) {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>{title}</h2>
        <div className={styles.grid}>
            {services.map((item, idx) => (
                <div key={idx} className={styles.card}>
                    <span className={styles.number}>{item.number}</span>
                    <h3 className={styles.serviceName}>{item.name}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <span className={styles.price}>{item.price}</span>
                    <div className={styles.line}></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

ServicesGridDetailed.cmsConfig = {
    name: "Services Grid Detailed",
    props: {
        title: { type: "string", label: "Title" },
        services: {
            type: "array",
            label: "Services",
            itemSchema: {
                number: { type: "string", label: "Number" },
                name: { type: "string", label: "Service Name" },
                description: { type: "string", label: "Description" },
                price: { type: "string", label: "Starting Price" }
            }
        }
    }
};
