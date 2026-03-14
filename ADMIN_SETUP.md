# TréchiStore Admin Setup Guide

## Supabase Database Setup

1. Go to your Supabase project: https://supabase.com/dashboard/project/ypwdddezecihfwzeqgnt

2. Open the SQL Editor (left sidebar)

3. Copy and paste the contents of `supabase-schema.sql` into the SQL Editor

4. Click "Run" to execute the schema

This will create:
- `products` table with sample data
- `orders` table
- `order_items` table
- `admin_users` table
- All necessary indexes and policies

## Admin Login

**URL:** http://localhost:3000/admin/login

**Default Credentials:**
- Email: `admin@trechistore.com`
- Password: `admin123`

⚠️ **Important:** Change the password after first login in production!

## Admin Features

### Dashboard (`/admin/dashboard`)
- View total orders, pending orders, revenue, and product count
- See recent orders at a glance
- Quick navigation to all admin sections

### Orders Management (`/admin/orders`)
- View all orders with filtering by status
- Update order status (pending, processing, shipped, delivered, cancelled)
- See customer details and shipping information

### Products Management (`/admin/products`)
- View all products in a table
- Add new products with full details
- Edit existing products
- Delete products
- Set featured/new status
- Manage stock status

## Environment Variables

Your `.env.local` is already configured:

```
NEXT_PUBLIC_SUPABASE_URL=https://ypwdddezecihfwzeqgnt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_2oakALLrkinlGoWyK9wJ2g_9P0vYWDN
```

## Checkout Features

- **190+ Countries** available in the shipping dropdown
- Orders are saved to Supabase database
- Order confirmation page shows order number

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx       # Admin layout
│   │   ├── login/
│   │   │   └── page.tsx     # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx     # Dashboard
│   │   ├── orders/
│   │   │   └── page.tsx     # Orders management
│   │   └── products/
│   │       └── page.tsx     # Products CRUD
│   ├── checkout/
│   │   └── page.tsx         # Checkout with Supabase integration
│   └── ...
├── data/
│   ├── countries.ts         # All countries list
│   └── products.ts          # Sample products
├── lib/
│   └── supabase.ts          # Supabase client & types
└── ...
```

## Testing the Flow

1. **Place an order:**
   - Go to http://localhost:3000
   - Add products to cart
   - Go to checkout
   - Fill in shipping info (select any country)
   - Complete the order

2. **View the order:**
   - Go to http://localhost:3000/admin/login
   - Login with admin credentials
   - Navigate to Orders
   - See your order and update its status

3. **Manage products:**
   - Go to Products in admin
   - Click "Add Product" to create new
   - Click "Edit" on any product to modify
   - Click "Delete" to remove

## Security Notes

- Admin authentication uses localStorage (demo only)
- For production, implement proper JWT authentication
- Row Level Security (RLS) policies are set up in Supabase
- Never commit `.env.local` to version control
