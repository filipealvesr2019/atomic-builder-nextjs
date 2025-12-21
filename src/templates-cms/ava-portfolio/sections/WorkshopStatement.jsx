import styles from './WorkshopStatement.module.css';

export default function WorkshopStatement({
    text = "The Art of Moments: More than just a photograph, it's about the feeling captured within the frame."
}) {
    return (
        <section className={styles.statement}>
            <div className={styles.container}>
                <h2 className={styles.text}>{text}</h2>
            </div>
        </section>
    );
}

WorkshopStatement.cmsConfig = {
    name: "Workshop Statement",
    props: {
        text: { type: "string", label: "Statement Text" }
    }
};
