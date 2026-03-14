-- TréchiStore Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  notes_top JSONB DEFAULT '[]',
  notes_middle JSONB DEFAULT '[]',
  notes_base JSONB DEFAULT '[]',
  size VARCHAR(50) DEFAULT '100ml',
  rating DECIMAL(3, 2) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  new BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_state VARCHAR(100) NOT NULL,
  shipping_zip VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(100) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table (for custom auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products can be inserted by authenticated users" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Products can be updated by authenticated users" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Products can be deleted by authenticated users" ON products
  FOR DELETE USING (true);

-- Orders policies (admin only)
CREATE POLICY "Orders are viewable by authenticated users" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Orders can be inserted by authenticated users" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders can be updated by authenticated users" ON orders
  FOR UPDATE USING (true);

-- Order items policies
CREATE POLICY "Order items are viewable by authenticated users" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Order items can be inserted by authenticated users" ON order_items
  FOR INSERT WITH CHECK (true);

-- Admin users policies
CREATE POLICY "Admin users can be viewed by authenticated users" ON admin_users
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
-- IMPORTANT: Change this password after first login!
INSERT INTO admin_users (email, password_hash, role) VALUES
  ('admin@trechistore.com', '$2b$10$rMx9YQYxQYxQYxQYxQYxQuQYxQYxQYxQYxQYxQYxQYxQYxQYxQYxQ', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, brand, price, original_price, image, category, description, notes_top, notes_middle, notes_base, size, rating, reviews, in_stock, featured, new) VALUES
  ('Rose Éternelle', 'Tréchi', 185, 220, 'https://images.unsplash.com/photo-1594035910387-fea4779426e9?w=500&h=600&fit=crop', 'Women', 'A timeless fragrance capturing the essence of a thousand roses.', '["Bergamot", "Saffron", "Pink Pepper"]', '["Turkish Rose", "Bulgarian Rose", "Jasmine"]', '["Oud", "Amber", "Vanilla"]', '100ml', 4.9, 234, true, true, false),
  ('Noir Intense', 'Tréchi', 195, NULL, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop', 'Men', 'A bold and mysterious scent for the modern gentleman.', '["Black Pepper", "Cardamom", "Lavender"]', '["Oud", "Leather", "Tobacco"]', '["Amber", "Patchouli", "Musk"]', '100ml', 4.8, 189, true, true, false),
  ('Jardin Secret', 'Tréchi', 165, NULL, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop', 'Women', 'A fresh and floral escape to a hidden garden.', '["Green Tea", "Fig", "Citrus"]', '["Freesia", "Lily", "Peony"]', '["Cedarwood", "White Musk", "Moss"]', '75ml', 4.7, 156, true, false, true),
  ('Oceanic Blue', 'Tréchi', 145, NULL, 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&h=600&fit=crop', 'Men', 'Dive into the depths of freshness.', '["Sea Salt", "Bergamot", "Grapefruit"]', '["Sage", "Geranium", "Jasmine"]', '["Driftwood", "Amber", "Cedar"]', '100ml', 4.6, 201, true, false, false),
  ('Vanilla Orchid', 'Tréchi', 175, NULL, 'https://images.unsplash.com/photo-1585232561307-356511848571?w=500&h=600&fit=crop', 'Women', 'Warm, creamy vanilla meets delicate orchid.', '["Mandarin", "Pear", "Saffron"]', '["Orchid", "Tuberose", "Heliotrope"]', '["Vanilla", "Tonka Bean", "Sandalwood"]', '100ml', 4.9, 312, true, true, false),
  ('Oud Royal', 'Tréchi Prestige', 350, NULL, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop', 'Unisex', 'The pinnacle of luxury. Rare oud blended with precious ingredients.', '["Saffron", "Rose", "Bergamot"]', '["Cambodi Oud", "Agarwood", "Incense"]', '["Ambergris", "Musk", "Leather"]', '50ml', 5.0, 87, true, true, false),
  ('Citrus Bloom', 'Tréchi', 125, NULL, 'https://images.unsplash.com/photo-1615160849325-7c9398d5e6e7?w=500&h=600&fit=crop', 'Women', 'Energizing citrus meets soft florals.', '["Lemon", "Orange", "Neroli"]', '["Orange Blossom", "Jasmine", "Rose"]', '["White Cedar", "Musk", "Amber"]', '75ml', 4.5, 143, true, false, true),
  ('Spice Route', 'Tréchi', 165, NULL, 'https://images.unsplash.com/photo-1519669556878-63bd08be7067?w=500&h=600&fit=crop', 'Men', 'An exotic journey through ancient spice markets.', '["Cinnamon", "Nutmeg", "Ginger"]', '["Cumin", "Coriander", "Cardamom"]', '["Sandalwood", "Vetiver", "Amber"]', '100ml', 4.7, 178, true, false, false),
  ('Midnight Rose', 'Tréchi', 195, 230, 'https://images.unsplash.com/photo-1588405764423-72654f0c8a52?w=500&h=600&fit=crop', 'Women', 'A rose that blooms only at midnight.', '["Black Currant", "Bergamot", "Champagne"]', '["Dark Rose", "Iris", "Plum"]', '["Patchouli", "Vanilla", "Musk"]', '100ml', 4.8, 267, true, true, false),
  ('Santal Wood', 'Tréchi', 185, NULL, 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop', 'Unisex', 'Pure sandalwood elegance.', '["Cardamom", "Bergamot", "Fig"]', '["Sandalwood", "Cedar", "Orris"]', '["Amber", "Musk", "Cashmeran"]', '100ml', 4.7, 145, true, false, false),
  ('Aqua Fresca', 'Tréchi', 115, NULL, 'https://images.unsplash.com/photo-1605618879600-f27c4c1556ae?w=500&h=600&fit=crop', 'Men', 'Crisp, clean, and refreshing.', '["Cucumber", "Mint", "Lime"]', '["Marine Notes", "Basil", "Geranium"]', '["White Woods", "Musk", "Amber"]', '100ml', 4.4, 198, true, false, false),
  ('Amber Elixir', 'Tréchi Prestige', 275, NULL, 'https://images.unsplash.com/photo-1512777576255-a8d56a6a75c5?w=500&h=600&fit=crop', 'Unisex', 'Liquid gold in a bottle.', '["Orange Blossom", "Saffron", "Pink Pepper"]', '["Amber", "Labdanum", "Benzoin"]', '["Oud", "Vanilla", "Leather"]', '75ml', 4.9, 92, true, true, false);
