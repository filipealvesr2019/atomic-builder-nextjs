import styles from './WorkshopInfoRow.module.css';

export default function WorkshopInfoRow({
    items = [
        {
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
            title: "Artistic Vision",
            description: "Learn to see beyond the obvious and capture the ethereal."
        },
        {
            image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
            title: "Technical Mastery",
            description: "Master the tools that allow your creativity to flourish."
        },
        {
            image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
            title: "Client Connection",
            description: "Build relationships that lead to authentic and raw emotion."
        }
    ]
}) {
    return (
        <section className={styles.infoSection}>
            <div className={styles.container}>
                {items.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <img src={item.image} alt={item.title} className={styles.image} />
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

WorkshopInfoRow.cmsConfig = {
    name: "Workshop Info Row",
    props: {
        items: {
            type: "array",
            label: "Info Items",
            itemSchema: {
                image: { type: "image", label: "Image" },
                title: { type: "string", label: "Title" },
                description: { type: "string", label: "Description" }
            }
        }
    }
};
