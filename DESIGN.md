---
name: Luminous Protocol
colors:
  surface: '#0e1418'
  surface-dim: '#0e1418'
  surface-bright: '#343a3e'
  surface-container-lowest: '#090f13'
  surface-container-low: '#161c20'
  surface-container: '#1a2024'
  surface-container-high: '#252b2f'
  surface-container-highest: '#30363a'
  on-surface: '#dee3e9'
  on-surface-variant: '#bdc8d2'
  inverse-surface: '#dee3e9'
  inverse-on-surface: '#2b3136'
  outline: '#88929c'
  outline-variant: '#3e4851'
  surface-tint: '#8bceff'
  primary: '#8bceff'
  on-primary: '#00344e'
  primary-container: '#01b0fc'
  on-primary-container: '#00405f'
  inverse-primary: '#006492'
  secondary: '#a3cbec'
  on-secondary: '#00344e'
  secondary-container: '#224d69'
  on-secondary-container: '#95bdde'
  tertiary: '#ffb869'
  on-tertiary: '#482900'
  tertiary-container: '#ec9103'
  on-tertiary-container: '#583300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c9e6ff'
  primary-fixed-dim: '#8bceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004b6f'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#a3cbec'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#1f4b66'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#0e1418'
  on-background: '#dee3e9'
  surface-variant: '#30363a'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered to evoke a sense of orbital precision and predictive intelligence. It targets high-net-worth Web3 users who demand both technical transparency and aesthetic sophistication. The visual language is a fusion of **Glassmorphism** and **High-Tech 3D**, utilizing layered translucency to represent the multi-dimensional nature of blockchain data. 

The atmosphere is "Dark-Mode First," prioritizing legibility of luminous data points against deep, atmospheric backgrounds. UI elements should feel like physical objects suspended in a low-gravity environment—reacting to user interaction with depth shifts, inner glows, and subtle Z-axis translations. The shift to a high-energy blue and amber palette moves the brand from "cyber-neon" to a "high-fidelity aerospace" aesthetic.

## Colors

The palette is anchored by a storm-grey neutral base to provide a sophisticated, low-strain background for high-contrast accents.

*   **Primary (Electric Blue):** Used for primary actions, active state highlights, and core data paths, representing the flow of information.
*   **Secondary (Muted Slate):** Reserved for structural elements, secondary UI components, and supportive data visualization.
*   **Tertiary (Radiant Amber):** A high-visibility accent used for critical alerts, financial highlights, and tactical callouts.
*   **Neutral Palette:** A range of cool greys and slates derived from `#72787d`. These replace the previous pitch-black voids with a more polished, metallic depth.
*   **Semantic Accents:** 
    *   **Siap Eksekusi (Success):** A vibrant Electric Blue with an outer glow.
    *   **Menunggu (Warning):** A rich, radiant amber to signal caution and active processing.

## Typography

This design system utilizes **Plus Jakarta Sans** for its geometric clarity and modern terminal cuts. 

*   **Headlines:** Should use tighter letter-spacing and heavier weights to feel authoritative and technically precise.
*   **Body Text:** Maintain a generous line height (1.6) to ensure legibility against dark, blurred backgrounds and frosted layers.
*   **Labels:** Use all-caps with increased letter-spacing for technical metadata and "read-only" status indicators to mimic a HUD (Heads-Up Display) aesthetic.

## Layout & Spacing

The layout follows a **12-column fixed-grid model** for desktop, centering the content at a max-width of 1280px. 

*   **Rhythm:** An 8px base unit governs all dimensions, ensuring mathematical harmony across the interface. 
*   **Negative Space:** This system mandates generous "stack-lg" (48px) spacing between major sections to emphasize the "suspended" nature of the glass cards.
*   **Alignment:** Elements should be strictly grid-aligned, but internal card components can use asymmetrical padding to create a more dynamic, technical feel.

## Elevation & Depth

Depth is the core differentiator of this design system. It is achieved through a combination of three techniques:

1.  **Glassmorphism:** All containers utilize `backdrop-filter: blur(20px)` with a semi-transparent fill (`rgba(114, 120, 125, 0.15)`).
2.  **Glowing Borders:** Cards and buttons feature a 1px solid border. The top and left edges use a higher opacity blue highlight, while the bottom and right edges use a darker, recessed tone. Active states apply a `box-shadow` glow using the Primary Electric Blue hex.
3.  **3D Layering:** Using `transform: translateZ()`, interactive cards should appear to lift toward the user on hover. Subtle drop shadows should be tinted with the background slate color to maintain the "frosted" look.

## Shapes

The design system employs a **Rounded (Level 2)** shape language. This balances the "hard" technical feel of a fintech tool with the approachable nature of modern Web3 apps.

*   **Standard Radius:** 8px for small components (inputs, badges).
*   **Container Radius:** 16px (rounded-lg) for primary cards and modals.
*   **Interactive Radius:** 24px (rounded-xl) for large call-to-action sections to make them feel more tactile and distinct.

## Components

### 3D Glass Cards
Cards are the primary data containers. They must feature a subtle gradient background (top-left to bottom-right) and a thin "inner glow" on the top-left edge using Primary Blue. On hover, the card should scale slightly (1.02x) and increase its shadow diffusion.

### Interactive Buttons
Buttons are treated as physical triggers. 
*   **Default:** Semi-transparent glass with a glowing Electric Blue border. 
*   **Hover:** Background opacity increases, and the border glow intensifies.
*   **Active:** The button "depresses" via a small scale-down (0.98x) and an inner shadow to simulate physical movement.

### Status Badges
Badges should utilize a "dot and glow" pattern. 
*   **Siap Eksekusi:** Small Primary Blue circle with a 10px outer blur.
*   **Menunggu:** Amber (Tertiary) dot with a pulsing animation to indicate "active processing."

### Input Fields
Inputs should feel "etched" into the interface. Use an inset shadow to create a sense of depth (concave), contrasting with the raised (convex) appearance of the cards and buttons. Use the Primary (Electric Blue) color for the focus ring.