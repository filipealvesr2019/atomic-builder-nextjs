import { useState } from 'react';
import styles from './ServicesFAQ.module.css';

export default function ServicesFAQ({ 
    title = "Common Questions",
    questions = [
        { q: "HOW DO WE BOOK OUR DATE?", a: "To secure your date, we require a signed agreement and a retainer. Contact us to check availability." },
        { q: "DO YOU TRAVEL FOR WEDDINGS?", a: "Yes! We love to travel and are available for weddings worldwide." },
        { q: "WHEN WILL WE RECEIVE OUR PHOTOS?", a: "Full galleries are typically delivered within 6-8 weeks after your wedding day." },
        { q: "HOW MANY PHOTOS DO WE GET?", a: "We typically deliver between 500-800 edited high-resolution images." }
    ]
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
            {questions.map((item, idx) => (
                <div 
                    key={idx} 
                    className={`${styles.item} ${activeIndex === idx ? styles.active : ''}`}
                    onClick={() => toggle(idx)}
                >
                    <div className={styles.question}>
                        <span>{item.q}</span>
                        <span className={styles.plus}>{activeIndex === idx ? '−' : '+'}</span>
                    </div>
                    <div className={styles.answer}>
                        <p>{item.a}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

ServicesFAQ.cmsConfig = {
    name: "Services FAQ",
    props: {
        title: { type: "string", label: "Title" },
        questions: {
            type: "array",
            label: "Questions",
            itemSchema: {
                q: { type: "string", label: "Question" },
                a: { type: "string", label: "Answer" }
            }
        }
    }
};
