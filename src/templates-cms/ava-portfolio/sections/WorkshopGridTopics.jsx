import styles from './WorkshopGridTopics.module.css';

export default function WorkshopGridTopics({
    topics = [
        {
            title: "LIGHTING",
            description: "Understanding how to work with natural light in any condition."
        },
        {
            title: "COMPOSITION",
            description: "Learning the rules of framing and when to break them for impact."
        },
        {
            title: "STORYTELLING",
            description: "Capturing the emotional narrative behind every shot."
        },
        {
            title: "BUSINESS",
            description: "Building a brand that attracts your ideal high-end clientele."
        }
    ]
}) {
    return (
        <section className={styles.gridSection}>
            <div className={styles.container}>
                {topics.map((topic, index) => (
                    <div key={index} className={styles.item}>
                        <h3 className={styles.title}>{topic.title}</h3>
                        <p className={styles.description}>{topic.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

WorkshopGridTopics.cmsConfig = {
    name: "Workshop Grid Topics",
    props: {
        topics: {
            type: "array",
            label: "Topics",
            itemSchema: {
                title: { type: "string", label: "Title" },
                description: { type: "string", label: "Description" }
            }
        }
    }
};
