
export const luminaGlowDefaultContent = {
    theme: {
        colors: {
            primary: '#000000', // Sharp Black for text/headings
            secondary: '#FAFAFA', // Soft Off-white background
            accent: '#D4A373', // Soft Pastel/Earthy tone
            background: '#FFFFFF',
            text: '#1F1F1F',
            muted: '#757575',
            border: '#E0E0E0'
        },
        fonts: {
            heading: 'Tenor Sans, sans-serif', // Elegant, high-fashion feel
            body: 'Inter, sans-serif'
        }
    },
    global: {
        logo: {
            text: 'LUMINA.',
            image: null
        },
        social: {
            instagram: '#',
            tiktok: '#',
            pinterest: '#'
        }
    },
    sections: {
        header: {
            variant: 'sticky',
            navItems: [
                { label: 'Shop', href: '/iframe-preview/lumina-glow-cms' },
                { label: 'About', href: '/iframe-preview/lumina-glow-cms/about' },
                { label: 'Collections', href: '/iframe-preview/lumina-glow-cms#collections' },
                { label: 'Journal', href: '/iframe-preview/lumina-glow-cms#journal' }
            ],
            cta: {
                label: 'Cart (0)',
                link: '#cart'
            }
        },
        hero: {
            slides: [
                {
                    tagline: 'REDEFINE YOUR RADIANCE',
                    title: 'The Science of Timeless Skin',
                    features: 'Clinical Results • Pure Ingredients',
                    image: '/images/lumina-glow/lumina_light_hero_1.png.png',
                    bgColor: '#F9F4F2', // Softer, lighter peach
                    cta: { label: 'Shop the Glow', link: '#shop' }
                },
                {
                    tagline: 'ORGANIC • POWERFUL • PURE',
                    title: 'Luxury Rooted in Nature',
                    features: '100% Vegan • Eco-Certified',
                    image: '/images/lumina-glow/lumina_light_hero_2.png.png',
                    bgColor: '#F2F5F0', // Softer, lighter sage
                    cta: { label: 'Explore More', link: '#about' }
                },
                {
                    tagline: 'MINIMAL • ELEGANT • EFFECTIVE',
                    title: 'Minimalism for Maximum Glow',
                    features: 'Tailored Formulas • Expert Care',
                    image: '/images/lumina-glow/lumina_light_hero_3.png.png',
                    bgColor: '#F5F5F7', // Crisp, light grey
                    cta: { label: 'View Selection', link: '#shop' }
                }
            ]
        },
        marquee: {
            text: 'CRUELTY FREE • VEGAN • ORGANIC • SUSTAINABLE PACKAGING • DERMATOLOGIST TESTED • '
        },
        imageWithText: {
            title: 'Nature meets Science',
            subtitle: 'We believe in the power of plants backed by clinical results. Our formulas are designed to balance and nourish.',
            image: 'https://images.unsplash.com/photo-1556228720-1957be83f7be?q=80&w=1974&auto=format&fit=crop', // Woman with glowing skin or botanical setup
            imagePosition: 'left', // left or right
            cta: {
                label: 'Our Story',
                link: '/iframe-preview/lumina-glow-cms/about'
            }
        },
        categories: {
            subtitle: 'Categories',
            title: 'Shop by Collection',
            description: 'Explore our curated skincare categories, designed to bring out your natural glow',
            items: [
                { id: 'c1', name: 'Facial Serums', count: '12 items', image: '/images/lumina-glow/lumina_facial_serum_1770331852127.png' },
                { id: 'c2', name: 'Moisturizing Creams', count: '15 items', image: '/images/lumina-glow/lumina_moisturizer_cream_1770331710494.png' },
                { id: 'c3', name: 'Purifying Cleansers', count: '8 items', image: '/images/lumina-glow/lumina_purifying_cleanser_1770331727279.png' },
                { id: 'c4', name: 'Body Care', count: '10 items', image: '/images/lumina-glow/lumina_body_lotion_1770331740635.png' },
                { id: 'c5', name: 'Skincare Tools', count: '6 items', image: '/images/lumina-glow/lumina_skincare_tools_1770331672860.png' }
            ]
        },
        ingredients: {
            title: 'Key Ingredients',
            subtitle: 'Powered by nature',
            items: [
                { id: 'i1', name: 'Hyaluronic Acid', image: 'https://images.unsplash.com/photo-1615397349754-08a8031d27fa?q=80&w=1974&auto=format&fit=crop' },
                { id: 'i2', name: 'Vitamin C', image: 'https://images.unsplash.com/photo-1610449557262-42173f328905?q=80&w=1974&auto=format&fit=crop' },
                { id: 'i3', name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1596704017389-96e85557d560?q=80&w=1974&auto=format&fit=crop' },
                { id: 'i4', name: 'Rosehip Oil', image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=1974&auto=format&fit=crop' }
            ]
        },
        productCarousel: {
            title: 'Best Sellers',
            items: [
                { id: 'p1', category: 'Serum', name: 'Glow Serum', price: '$48.00', image: '/images/lumina-glow/product_1.png', badge: 'New' },
                { id: 'p2', category: 'Cream', name: 'Daily Moisturizer', price: '$32.00', image: '/images/lumina-glow/product_2.png.png' },
                { id: 'p3', category: 'Cream', name: 'Night Cream', price: '$55.00', image: '/images/lumina-glow/product_3.png.png', badge: 'Sold Out' },
                { id: 'p4', category: 'Cleanser', name: 'Purifying Cleanser', price: '$24.00', image: '/images/lumina-glow/product_4.png.png' }
            ]
        },
        footer: {
            text: '© 2024 Lumina Glow. This is a fictional store and all products shown are for demonstration purposes only.',
            newsletterTitle: 'Join the inner circle',
            newsletterText: 'Subscribe for exclusive offers and skincare tips.'
        },
        aboutPage: {
            hero: {
                slides: [
                    {
                        tagline: 'OUR PHILOSOPHY',
                        title: 'Pure Radiance, Rooted in Tradition',
                        features: 'Heritage • Innovation • Purity',
                        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop',
                        bgColor: '#F9F4F2',
                        cta: { label: 'Discover our journey', link: '/iframe-preview/lumina-glow-cms#journey' }
                    }
                ]
            },
            story: {
                title: 'The Lumina Story',
                subtitle: 'Founded on the belief that beauty should be as pure as the nature it comes from. We spent years perfecting formulas that deliver clinical results without compromise.',
                image: 'https://images.unsplash.com/photo-1556228720-1957be83f7be?q=80&w=1974&auto=format&fit=crop',
                imagePosition: 'right',
                cta: { label: 'Explore Our Collections', link: '/iframe-preview/lumina-glow-cms' }
            },
            values: {
                title: 'Our Core Values',
                subtitle: 'Ethical, Sustainable, and Effective.',
                items: [
                    { id: 'v1', name: 'Planet Friendly', icon: 'Globe', description: 'Sustainable packaging and eco-conscious practices in everything we do.' },
                    { id: 'v2', name: 'Ethically Crafted', icon: 'Atom', description: 'Cruelty-free beauty backed by ethical science and respect for all life.' },
                    { id: 'v3', name: 'Purely Organic', icon: 'Leaf', description: '100% organic and natural ingredients for your cleanest, purest glow.' },
                    { id: 'v4', name: 'Toxicity Free', icon: 'DropletOff', description: 'Clean formulas without parabens, sulfates, or any harsh chemicals.' }
                ]
            },
            ingredients: {
                title: 'Naturally Sourced Ingredients',
                subtitle: 'We select only the most effective botanical extracts for your skin.',
                items: [
                    {
                        id: 'i1',
                        name: 'Rosemary Leaf',
                        description: 'Antioxidant-rich extract that helps soothe and protect the skin from environmental stressors.',
                        image: 'https://images.unsplash.com/photo-1596704017389-96e85557d560?q=80&w=1974&auto=format&fit=crop'
                    },
                    {
                        id: 'i2',
                        name: 'Aloe Vera',
                        description: 'Deeply hydrating and calming plant-based extract that restores moisture to all skin types.',
                        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop'
                    },
                    {
                        id: 'i3',
                        name: 'Green Tea',
                        description: 'Revitalizing extract known for its calming properties and ability to protect the skin barrier.',
                        image: 'https://images.unsplash.com/photo-1615397349754-08a8031d27fa?q=80&w=1974&auto=format&fit=crop'
                    }
                ]
            }
        }
    }
};
