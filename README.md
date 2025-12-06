# Atomic Builder ⚛️

![Status: Alpha](https://img.shields.io/badge/Status-In_Development-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Note:** This project is in active development (Alpha). Features are being pushed weekly! 🚀

## What is Atomic Builder?

**Atomic Builder** is an Open Source visual CMS solution for **Next.js**. It empowers developers and content creators to build stunning pages using a "Drag and Drop" interface, without sacrificing the performance and flexibility of React.

Unlike complex site builders that generate messy bloatware code, Atomic Builder uses **native DOM elements**. This means what you see in the editor is exactly what gets rendered: clean, semantic, and SEO-friendly HTML.

### ✨ Key Features

*   **🎨 DOM-based Visual Editor**: Build layouts by dragging elements directly into the page structure.
*   **🛒 E-commerce Ready**: Native Stripe checkout integration (mock) and product management.
*   **🔌 Plugin System**: Extensible architecture with a dedicated Plugins Marketplace ("SEO Booster", "Analytics", etc.).
*   **🏬 Template Store**: Browse, preview, and install professional themes like **Rustic Store** in one click.
*   **⚛️ Atomic Widgets**: Granular control over atomic elements like Headings, Texts, Buttons, and Images.
*   **💅 Global Styling**: Define your brand identity (Colors, Typography) once and apply it everywhere.
*   **⚡ Performance First**: Built on top of Next.js App Router for maximum speed and SEO.

---

## 🏗️ Current Status & Roadmap

We are building the future of visual editing in Next.js. Here is the current state of the project:

- [x] **Rendering Engine**: Core builder logic (`src/components/builder`).
- [x] **Atomic Widgets**: Text, Heading, Button, Image Container.
- [x] **Custom Sections**: Complex blocks (Headers, Product Grids, Sliders).
- [x] **Template Store**: Live previews and one-click installation.
- [x] **Plugins Marketplace**: System to enable/disable extensions.
- [x] **Stripe Integration**: Checkout flow with success page (Mock).
- [x] **Themes**: Fully ported **Rustic Store** theme (English/Portuguese ready).
- [ ] **📱 Responsive Editing**: Advanced mobile/tablet view controls.
- [ ] **⏪ History System**: Undo/Redo functionality.
- [ ] **� Auth & Roles**: Multi-user permissions with Clerk.

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

*   **`src/components/builder`**: **The Engine**. Core logic, `WidgetRegistry`, and Renderers.
*   **`src/app/admin/editor`**: **The Editor Interface**. Sidebar, DropZone, and PropsPanel.
*   **`src/app/admin/store`**: **Template Store**. Browse and install new designs.
*   **`src/app/admin/plugins`**: **Plugins System**. Manage integrations.
*   **`src/templates-cms`**: **Theme Registry**. Pluggable templates (e.g., `RusticStore`) with specific sections.

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

Open Source projects live by their community! If you found a bug or have a feature idea, feel free to open an **Issue** or submit a **Pull Request**.

---
*Built with ❤️ for the Next.js Community.*
