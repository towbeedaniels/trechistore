# TréchiStore - Supabase Setup Guide

## ⚠️ IMPORTANT: Complete These Steps for Admin & Orders to Work

### Step 1: Run SQL Schema in Supabase

1. Go to your Supabase dashboard: **https://supabase.com/dashboard/project/ypwdddezecihfwzeqgnt**

2. Click on **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of `supabase-schema.sql` from this project

5. Paste it into the SQL Editor

6. Click **Run** or press `Ctrl+Enter` / `Cmd+Enter`

This will create:
- ✅ `products` table with 12 sample perfumes
- ✅ `orders` table for customer orders
- ✅ `order_items` table for order details
- ✅ `admin_users` table for admin login
- ✅ All necessary indexes and security policies

### Step 2: Verify Environment Variables

Your `.env.local` file should have:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ypwdddezecihfwzeqgnt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_2oakALLrkinlGoWyK9wJ2g_9P0vYWDN
```

✅ These are already set correctly in your project!

### Step 3: Set Environment Variables on Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://ypwdddezecihfwzeqgnt.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_2oakALLrkinlGoWyK9wJ2g_9P0vYWDN`
5. Click **Save**
6. **Redeploy** your site (Site overview → Production → Deploy site)

### Step 4: Test the System

#### Test Admin Login:
1. Go to: `http://localhost:3000/admin/login` (or your Netlify URL)
2. Login with:
   - Email: `admin@trechistore.com`
   - Password: `admin123`
3. You should see the dashboard

#### Test Order Creation:
1. Go to the store homepage
2. Add products to cart
3. Go to checkout
4. Fill in shipping info and complete order
5. You should see order confirmation with order number

#### Test Order Tracking:
1. Copy the order number from confirmation
2. Go to `/track-order`
3. Enter the order number
4. You should see order details and status

#### Test Admin Order Update:
1. Go to admin → Orders
2. Find your order in the table
3. Use the dropdown in "Actions" column to change status
4. You should see success message
5. Go back to track order page - status should be updated!

---

## Troubleshooting

### "Database not configured" warning in admin:
- Check that `.env.local` has correct Supabase credentials
- Restart dev server: `npm run dev`
- Verify Supabase project is active

### "Failed to update order status":
- Make sure you ran the SQL schema in Supabase
- Check browser console for errors
- Verify Row Level Security (RLS) is configured correctly

### Orders not showing in admin:
- Confirm customer completed checkout
- Check `orders` table in Supabase Dashboard → Table Editor
- Verify environment variables are set

### Can't login to admin:
- Default credentials: `admin@trechistore.com` / `admin123`
- If changed, update password in `admin_users` table

---

## Quick Reference

### Admin Panel URLs:
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Orders: `/admin/orders`
- Products: `/admin/products`

### Customer URLs:
- Track Order: `/track-order`
- Order Confirmation: `/order-confirmed`

### Default Admin Credentials:
- **Email:** admin@trechistore.com
- **Password:** admin123

⚠️ **Change the password after first login in production!**

---

## Support

If you're still having issues:
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify all tables exist in Supabase Table Editor
4. Make sure environment variables are set in Netlify
