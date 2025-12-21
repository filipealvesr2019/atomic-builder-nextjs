'use client';
import styles from './Team.module.css';

export default function Team({
    title = "Our Team",
    subtitle = "We Are Ursula Theme",
    members = [],
    backgroundImage = "",
    forceMobile
}) {
  return (
    <section className={`${styles.section} ${forceMobile ? 'ursula-mobile-grid' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
            <header className={styles.header}>
                <span className={styles.subtitle}>{subtitle}</span>
                <h2 className={styles.title}>{title}</h2>
            </header>
            <div className={styles.grid}>
                {members.map((member, idx) => (
                    <div key={idx} className={styles.member}>
                        <img src={member.image} alt={member.name} className={styles.avatar} />
                        <h3 className={styles.name}>{member.name}</h3>
                        <span className={styles.role}>{member.role}</span>
                        <div className={styles.social}>
                             <span>f</span> <span>t</span> <span>in</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
