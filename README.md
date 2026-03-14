# TréchiStore - Luxury Perfume E-Commerce

A modern, full-featured e-commerce application for a luxury perfume store built with Next.js 15, TypeScript, and Tailwind CSS.

![TréchiStore](https://images.unsplash.com/photo-1615160849325-7c9398d5e6e7?w=1200&h=600&fit=crop)

## Features

- 🛍️ **Full E-Commerce Functionality**
  - Product catalog with filtering and search
  - Shopping cart with quantity management
  - Multi-step checkout process
  - Order confirmation

- 🎨 **Modern UI/UX**
  - Responsive design for all devices
  - Elegant luxury aesthetic
  - Smooth animations and transitions
  - Custom color palette (Primary & Gold)

- 📱 **Pages Included**
  - Homepage with hero section and featured products
  - Shop page with filters (category, brand, price, search)
  - Product detail pages with fragrance notes
  - Shopping cart sidebar
  - Checkout page (3-step process)
  - About Us page
  - Contact page
  - Order confirmation page

- ⚡ **Technical Features**
  - Next.js 15 App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - React Context for state management
  - Server and Client Components
  - Static and Dynamic rendering

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd trechistore
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
trechistore/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   ├── checkout/           # Checkout page
│   │   ├── contact/            # Contact page
│   │   ├── order-confirmed/    # Order confirmation
│   │   ├── product/[id]/       # Product detail pages
│   │   └── shop/               # Shop catalog page
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── CartSidebar.tsx
│   │   └── ProductCard.tsx
│   ├── contexts/               # React Context providers
│   │   └── CartContext.tsx
│   └── data/                   # Static data
│       └── products.ts
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js configuration
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Product Data

The store comes pre-loaded with 12 luxury perfume products including:

- **Women's Fragrances**: Rose Éternelle, Jardin Secret, Vanilla Orchid, etc.
- **Men's Fragrances**: Noir Intense, Oceanic Blue, Spice Route, etc.
- **Unisex Fragrances**: Oud Royal, Santal Wood, Amber Elixir

Each product includes:
- Name, brand, price, and images
- Fragrance notes (top, middle, base)
- Ratings and reviews
- Category and size information

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primary: { /* ... */ },
  gold: { /* ... */ },
}
```

### Products

Add or modify products in `src/data/products.ts`.

### Fonts

The project uses Google Fonts (Playfair Display & Inter). Edit `src/app/layout.tsx` to change.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy!

## Screenshots

### Homepage
Elegant hero section with featured products and categories.

### Shop Page
Filter by category, brand, price, and search functionality.

### Product Detail
Detailed product information with fragrance notes and reviews.

### Checkout
Secure 3-step checkout process with order summary.

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact support@trechistore.com.

---

Built with ❤️ by TréchiStore Team
