# Apex Design System

Guidelines and design tokens for the Apex platform. 

## 1. Visual Theme (Industrial Premium)
Apex utilizes a dark, high-density, sharp industrial design. No rounded bubbles; precise, data-dense controls rule.

- **Primary Background**: `#0C111D` (Deep Navy / Charcoal hybrid)
- **Surfaces/Panels**: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-md`
- **Primary / Active Accent**: `#38BDF8` (Precision Sky Blue)
- **Border Token**: `rgba(255, 255, 255, 0.08)` (1px solid, sharp)
- **Border Radius**: `2px` maximum (sharp corner look)

## 2. Liquid Glass Effect (Pembiasan Kaca Fisik)
Apply this class combination to cards, dropdowns, and drawers:
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

## 3. Typography Rules
- **Sans-Serif**: `Geist` (Modern, geometric, neutral)
- **Mono**: `Geist Mono` for all tabular data, SKUs, timestamps, UUIDs, and quantities.
- **Constraint**: DO NOT use Inter or standard browser default sans-serif. No Serif fonts.

## 4. Iconography
- **Strict Rule**: Emojis are strictly banned from all UI screens.
- Use pure SVGs (or Lucide React) with a consistent `strokeWidth={1.5}` or `strokeWidth={2}`.

## 5. Interaction & Animations
- Spring physics curves for micro-animations (e.g. hover, active buttons, drawer slide).
- System transitions default: `stiffness: 100, damping: 20` (approx 150-200ms duration).
- Active notifications: Blob/gooey animations via `goey-toast`.

## 6. Layout Guidelines
- **Desktop**: Sidebar-navigated layout with collapsible options and module filters.
- **Mobile**: Touch targets must be minimum 44x44px. Layout must use `min-h-[100dvh]` to avoid mobile address bar jumps.
- **Skeleton Loaders**: Utilize real DOM measuring loaders to prevent Layout Shifts (CLS). No generic spinners.
