# Atomic Builder ⚛️ (Work in Construction 🚧)

![Status: Alpha](https://img.shields.io/badge/Status-In_Development-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Note:** This project is in active development (Alpha). Features are being pushed weekly! 🚀

## What is Atomic Builder?

**Atomic Builder** is an Open Source visual CMS solution for **Next.js**. It empowers developers and content creators to build stunning pages using a "Drag and Drop" interface, without sacrificing the performance and flexibility of React.

Unlike complex site builders that generate messy bloatware code, Atomic Builder uses **native DOM elements**. This means what you see in the editor is exactly what gets rendered: clean, semantic, and SEO-friendly HTML.

### ✨ Key Features

*   **🎨 DOM-based Visual Editor**: Build layouts by dragging elements directly into the page structure.
*   **⚛️ Atomic Widgets**: Granular control over atomic elements like Headings, Texts, Buttons, and Images.
*   **🧩 Theme Registry**: Pluggable template system. Import full themes (like the *Rustic Store*) and customize them visually.
*   **💅 Global Styling**: Define your brand identity (Colors, Typography) once and apply it everywhere.
*   **⚡ Performance First**: Built on top of Next.js App Router for maximum speed and SEO.

---

## 🏗️ Current Status & Roadmap

We are building the future of visual editing in Next.js. Here is the current state of the project:

- [x] **Rendering Engine**: Core builder logic (`src/components/builder`).
- [x] **Atomic Widgets**: Text, Heading, Button, Image Container.
- [x] **Custom Sections**: Support for complex logic blocks (Headers, Product Grids).
- [x] **Theme Manager**: Easy template switching and registry.
- [ ] **📱 Responsive Editing**: Mobile/Tablet view modes (Coming Soon).
- [ ] **⏪ History System**: Undo/Redo functionality (Coming Soon).
- [ ] **🛒 E-commerce**: Native integration with cart/products (In Planning).

---

## 🚀 Getting Started

Want to test or contribute? Follow these steps:

### Prerequisites
*   Node.js 18+
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/atomic-builder.git
    cd atomic-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run development server:**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:3000/admin/dashboard` to start building!

---

## 🛠️ Architecture (For Developers)

The project follows a modular structure designed for scalability:

*   **`src/components/builder`**: **The Engine**. Contains the core Logic, `WidgetRegistry`, and Renderers (like `BlockRenderer`) that transform JSON into React Components.
*   **`src/app/admin/editor`**: **The Interface**. Orchestrates the UI:
    *   **Sidebar (`BlockLibrary`)**: Where you pick your components.
    *   **DropZone**: The main editing area where blocks are dropped and sorted.
    *   **PropsPanel**: The right sidebar for editing properties (colors, text, links).
*   **`src/templates-cms`**: **The Themes**. A registry of pluggable templates (e.g., `RusticStore`) with their specific sections and layouts.

### JSON Structure
*Example of how a page is stored:*
```json
[
  {
    "type": "container",
    "props": { "backgroundColor": "#f0f0f0", "padding": "20px" },
    "children": [
      { "type": "heading", "props": { "text": "Hello World!" } }
    ]
  }
]
```

---

## 🤝 Contributing

Open Source projects live by their community! If you found a bug or have a feature idea (like a new cool Widget), feel free to open an **Issue** or submit a **Pull Request**.

---
*Built with ❤️ for the Next.js Community.*
