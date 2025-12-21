import styles from './WorkshopSteps.module.css';

export default function WorkshopSteps({
    title = "How It Works",
    steps = [
        {
            number: "01",
            title: "Phase One",
            description: "We start by understanding the fundamentals of lighting and composition."
        },
        {
            number: "02",
            title: "Phase Two",
            description: "Hands-on shooting session with a professional model and live feedback."
        },
        {
            number: "03",
            title: "Phase Three",
            description: "Mastering the editing process to bring your unique vision to life."
        }
    ]
}) {
    return (
        <section className={styles.steps}>
            <div className={styles.container}>
                <h2 className={styles.mainTitle}>{title}</h2>
                <div className={styles.grid}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.innerBorder}>
                                <span className={styles.number}>{step.number}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.description}>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

WorkshopSteps.cmsConfig = {
    name: "Workshop Steps",
    props: {
        title: { type: "string", label: "Main Title" },
        steps: {
            type: "array",
            label: "Steps",
            itemSchema: {
                number: { type: "string", label: "Number" },
                title: { type: "string", label: "Step Title" },
                description: { type: "string", label: "Description" }
            }
        }
    }
};
