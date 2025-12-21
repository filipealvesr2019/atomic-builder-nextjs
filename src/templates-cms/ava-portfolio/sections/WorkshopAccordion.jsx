'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './WorkshopAccordion.module.css';

export default function WorkshopAccordion({
    title = "Frequently Asked Questions",
    items = [
        {
            question: "What equipment do I need?",
            answer: "A DSLR or mirrorless camera with manual controls is recommended. We also suggest bringing your favorite prime lens."
        },
        {
            question: "Is this suitable for beginners?",
            answer: "Yes! While we cover advanced techniques, the core principles of lighting and composition are universal."
        },
        {
            question: "What if the weather is bad?",
            answer: "We embrace all conditions! Learning to shoot in challenging weather is part of the experience."
        }
    ]
}) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className={styles.accordionSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.list}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <button 
                                className={styles.header}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={styles.question}>{item.question}</span>
                                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                            </button>
                            {openIndex === index && (
                                <div className={styles.content}>
                                    <p className={styles.answer}>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

WorkshopAccordion.cmsConfig = {
    name: "Workshop Accordion",
    props: {
        title: { type: "string", label: "Title" },
        items: {
            type: "array",
            label: "FAQ Items",
            itemSchema: {
                question: { type: "string", label: "Question" },
                answer: { type: "string", label: "Answer" }
            }
        }
    }
};
