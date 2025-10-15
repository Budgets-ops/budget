# Budget Bundles Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern fintech/payment platforms like Stripe, PayPal, and the provided data-bundles.com reference, with emphasis on trust, clarity, and mobile-first transactional flows.

## Core Design Principles
1. **Transaction Confidence**: Clear visual hierarchy and progress indicators build user trust throughout the purchase flow
2. **Mobile-First Efficiency**: Optimize for thumb-friendly interactions and minimal cognitive load
3. **Professional Simplicity**: Clean, uncluttered interfaces that prioritize task completion

---

## Color Palette

### Dark Mode (Primary)
- **Background Base**: 220 25% 12% (Deep navy blue)
- **Background Elevated**: 220 20% 18% (Lighter navy for cards)
- **Primary Brand**: 210 100% 60% (Vibrant blue for CTAs)
- **Primary Hover**: 210 100% 65% (Brighter blue)
- **Text Primary**: 0 0% 98% (Near white)
- **Text Secondary**: 220 15% 70% (Muted blue-gray)
- **Border Subtle**: 220 20% 25% (Dark borders)
- **Success**: 142 76% 45% (Green for confirmations)
- **Error**: 0 72% 55% (Red for validation)

### Accent Colors
- **Info Highlight**: 200 100% 70% (Light blue for info badges)
- **Card Hover**: 220 20% 22% (Subtle card elevation)

---

## Typography

### Font Families
- **Primary**: 'Inter', system-ui, sans-serif (body text, UI elements)
- **Display**: 'Inter', sans-serif at 600-700 weight (headings)

### Type Scale
- **Hero/H1**: text-4xl to text-5xl, font-semibold (42-48px)
- **H2 Section**: text-3xl, font-semibold (30px)
- **H3 Card Title**: text-xl, font-semibold (20px)
- **Body**: text-base (16px)
- **Small/Label**: text-sm (14px)
- **Micro**: text-xs (12px)

---

## Layout System

### Spacing Units
**Core spacing set**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Micro spacing: p-2, gap-2 (8px)
- Component padding: p-4, p-6 (16-24px)
- Section spacing: py-8, py-12, py-16 (32-64px)
- Container max-width: max-w-md (mobile flow), max-w-4xl (desktop)

### Grid System
- Mobile: Single column, full width cards with px-4 container padding
- Desktop: Center-aligned cards, max-w-md for forms, max-w-4xl for service grids
- Service grid: grid-cols-2 (mobile) to grid-cols-3 lg:grid-cols-4 (desktop)

---

## Component Library

### Navigation Header
- Sticky top bar with logo (left), navigation links (right)
- Height: h-16, backdrop blur effect
- Logo: Brand icon + "Budget Bundles" text
- Links: Home, About, Contact (hidden on mobile, show in menu)

### Service Selection Cards
- Aspect ratio: square or 4:3 cards
- Structure: Provider logo (top), name (center), "Select" indicator
- Hover: Subtle lift effect with border highlight
- Active state: Primary blue border (border-2)

### Form Inputs
- Background: Lighter navy (match card background)
- Border: border-2 with focus:ring-4 ring-primary/20
- Padding: px-4 py-3
- Phone input: Large text, monospace for number clarity
- Dropdown: Custom styled with chevron indicator

### Package Cards
- Stacked list layout for data packages
- Each card: Package name, data amount (bold), price, validity
- Radio selection with visual indicator
- Hover: Background shift to elevated state

### Buttons
- Primary CTA: Full width on mobile, bg-primary with white text
- Height: h-12 for easy thumb access
- States: hover:bg-primary-hover, disabled:opacity-50
- Secondary: Outline style with border-2 border-primary/30

### Progress Indicator
- Step visualization: Circles with connecting lines
- Active step: Filled primary color
- Completed: Check icon, primary color
- Upcoming: Border only, muted color
- Position: Top of form, horizontal on desktop, compact on mobile

### Order Summary Card
- Sticky on desktop (top-right), collapsible accordion on mobile
- Sections: Recipient, Package, Total
- Background: Elevated navy with subtle border
- Typography: text-sm for labels, text-base font-semibold for values

---

## Page-Specific Layouts

### Homepage (Service Selection)
- Hero: Compact banner (h-32 to h-40) with brand message + WhatsApp CTA
- Service grid: 2-4 column responsive grid of provider cards
- Trust indicators: "Instant delivery", "Secure payment" badges below grid

### Recipient Page
- Centered form card (max-w-md)
- Progress indicator at top
- Large phone input with country code selector
- Back button (top-left) + Continue button (bottom, full width)

### Package Selection
- Service logo + name header
- Scrollable package list (max-h-96 with custom scrollbar)
- Selected package: Highlighted with primary border
- Price summary sticky at bottom on mobile

### Payment Page
- Two-column on desktop: Order summary (left) + Payment form (right)
- Mobile: Stacked with summary at top
- Network selector: Radio cards with provider logos
- Payment number input: Same styling as phone input
- Final CTA: "Complete Purchase" - primary button, h-14 for prominence

---

## Interactions & Animations
- **Page transitions**: Fade + subtle slide (100ms delay)
- **Card hover**: transform scale-105, shadow-lg
- **Button press**: scale-98 for tactile feedback
- **Form validation**: Shake animation on error
- **Loading states**: Spinner with "Processing..." text

---

## Mobile Optimization
- Touch targets: Minimum 44px height for all interactive elements
- Form fields: Full width with ample padding (p-4)
- Sticky CTAs: Bottom-fixed on mobile with safe area padding
- Reduce motion: Respect prefers-reduced-motion
- Dark mode only: Optimized for nighttime mobile usage

---

## Trust & Security Elements
- WhatsApp contact: Visible badge with "Available on WhatsApp" + number
- Secure badge: Lock icon + "Secure checkout" text near payment
- Provider logos: Official telecom provider branding throughout
- Order confirmation: Success animation + clear next steps

---

## Images
No hero images required. This is a utility-focused transactional flow prioritizing speed and clarity. Use provider logos as primary visual elements (MTN, AirtelTigo, Telecel).