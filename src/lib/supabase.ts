import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  description: string;
  notes_top: string[];
  notes_middle: string[];
  notes_base: string[];
  size: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
  featured: boolean;
  new: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'superadmin';
}
