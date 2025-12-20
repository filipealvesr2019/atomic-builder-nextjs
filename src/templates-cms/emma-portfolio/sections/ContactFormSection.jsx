'use client';
import styles from './ContactFormSection.module.css';
import { Facebook, Twitter, Youtube } from 'lucide-react';

export default function ContactFormSection({
    image = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    name = "Emma",
    bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    buttonText = "SEND"
}) {
    return (
        <section className={styles.section}>
            <div className={styles.sidebar}>
                <img src={image} alt={name} className={styles.sidebarImage} />
                <h3 className={styles.sidebarName}>{name}</h3>
                <p className={styles.sidebarText}>{bio}</p>
                <div className={styles.socialIcons}>
                    <div className={styles.icon}><Facebook size={18}/></div>
                    <div className={styles.icon}><Twitter size={18}/></div>
                    <div className={styles.icon}><Youtube size={18}/></div>
                </div>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>First name*</label>
                            <input type="text" className={styles.input} placeholder="Jane" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Name*</label>
                            <input type="text" className={styles.input} placeholder="Doe" />
                        </div>
                    </div>
                    <div className={styles.formGroup} style={{marginBottom: 20}}>
                        <label className={styles.label}>Email*</label>
                        <input type="email" className={styles.input} placeholder="contact@email.com" />
                    </div>
                    <div className={styles.formGroup} style={{marginBottom: 20}}>
                        <label className={styles.label}>Subject*</label>
                        <input type="text" className={styles.input} placeholder="This message is about..." />
                    </div>
                    <div className={styles.formGroup} style={{marginBottom: 20}}>
                        <label className={styles.label}>Message*</label>
                        <textarea className={styles.textarea} placeholder="Hello..."></textarea>
                    </div>
                    
                    <div className={styles.formGroup}>
                         <label className={styles.label}>RGPD checkbox*</label>
                         <div className={styles.checkboxContainer}>
                            <input type="checkbox" />
                            <span>I accept your privacy policy...</span>
                        </div>
                    </div>

                    <div style={{textAlign: 'center'}}>
                         <button className={styles.submitButton}>{buttonText}</button>
                         <p className={styles.privacyText}>More details of your privacy policy here</p>
                    </div>
                </form>
            </div>
        </section>
    );
}

ContactFormSection.cmsConfig = {
    name: "Emma Contact Form Section",
    props: {
        image: { type: "image", label: "Sidebar Image" },
        name: { type: "string", label: "Sidebar Name" },
        bio: { type: "text", label: "Sidebar Bio" },
        buttonText: { type: "string", label: "Button Text" }
    }
};
