# Vinit Karshala - Modern Portfolio

A high-performance, interactive, and minimalist portfolio website built with modern web technologies. Focuses on smooth user experience, premium animations, and responsive design.

## 🚀 Data Stacks & Technologies

-   **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/) - fast HMR and optimized builds.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling with comprehensive responsive and dark mode design.
-   **Animations**:
    -   [Framer Motion](https://www.framer.com/motion/): Complex layout animations, scroll triggers, gesture-based interactions, and physics-based springs.
    -   custom `RevelOnScroll` and `ScrollFloat` components for entry effects.
-   **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/) - Luxury smooth scrolling with momentum, configured for both desktop and mobile touch devices.
-   **Icons**: [Lucide React](https://lucide.dev/) - Consistent and adaptable SVG icons.

## ✨ Key Features

-   **Smooth Scroll Experience**:
    -   Integrated `Lenis` for momentum scrolling.
    -   Custom header link handling for smooth smooth scrolling navigation between sections.
-   **Dynamic Theming**:
    -   **System Sync**: Automatically detects and switches between Light and Dark modes based on OS preferences.
    -   **Anti-FOUC**: Includes a script to prevent white flashing on initial load for dark mode users.
    -   **Adaptive Components**: All UI elements (Navbar, Modals, Cards) respond to theme changes instantly.
-   **Interactive UI**:
    -   **Custom Cursor**: Magnetic trailing cursor with hover states for interactive elements.
    -   **Smart Navbar**: Hides on scroll down to maximize view area, reappears on scroll up.
    -   **Infinite Marquee**: Seamless, high-performance scrolling text using `max-content` CSS logic.
-   **Animations**:
    -   **Text Reveal**: Word-by-word staggered entrance animations.
    -   **Parallax**: Subtle depth effects in Hero and About sections.
    -   **Hover Effects**: 3D tilt effects on project cards and magnetic buttons.

## 📂 Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx         # Landing section with parallax
│   ├── Navbar.tsx       # Smart navigation with mobile menu
│   ├── About.tsx        # Personal bio
│   ├── Services.tsx     # Service offerings grid
│   ├── PortfolioSection # Project case studies
│   ├── WorkMarquee.tsx  # Infinite scrolling text
│   ├── ContactModal.tsx # Popup contact form
│   ├── ScrollFloat.tsx  # Text animation wrapper
│   └── Footer.tsx       # Site loop back
├── types.ts             # TypeScript definitions
├── constants.tsx        # Content data (Projects, Links, Text)
├── App.tsx              # Main layout & Logic (Scroll, Theme)
└── index.css            # Tailwind & Global Styles
```

## 🛠️ Installation & Setup

1.  **Clone the repository**
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
4.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🎨 Customization

To personalize the portfolio, edit the `src/constants.tsx` file. control:
-   **`NAV_LINKS`**: Navigation menu items.
-   **`SOCIAL_LINKS`**: Profile links (GitHub, LinkedIn, Instagram).
-   **`SERVICES`**: Your service offerings.
-   **`PROJECTS`**: Case studies data (Titles, images, descriptions, stack).

## 📱 Responsiveness

The project is fully responsive:
-   **Desktop**: Large parallax layouts and hover interactions.
-   **Mobile**: Optimized touch scrolling, tailored spacing, and accessible hamburger menus.
