-- Create products table with inventory tracking
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  image text NOT NULL,
  category text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('men', 'women', 'unisex')),
  description text NOT NULL,
  material text NOT NULL,
  sizes text[],
  inventory_count integer NOT NULL DEFAULT 0 CHECK (inventory_count >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are readable by everyone (public catalog)
CREATE POLICY "Products are viewable by everyone"
  ON public.products
  FOR SELECT
  USING (true);

-- Only admins can manage products (for future admin panel)
CREATE POLICY "Only admins can insert products"
  ON public.products
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update products"
  ON public.products
  FOR UPDATE
  USING (false);

CREATE POLICY "Only admins can delete products"
  ON public.products
  FOR DELETE
  USING (false);

-- Create cart_items table for authenticated users
CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  selected_size text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id, selected_size)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own cart items
CREATE POLICY "Users can view their own cart items"
  ON public.cart_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert their own cart items"
  ON public.cart_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update their own cart items"
  ON public.cart_items
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete their own cart items"
  ON public.cart_items
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial products from the mock data with proper UUIDs
INSERT INTO public.products (name, price, image, category, gender, description, material, sizes, inventory_count) VALUES
  ('Lumos Stainless Steel Ring', 49.99, '/src/assets/product-ring-1.jpg', 'Rings', 'unisex', 'A polished, scratch-resistant ring available in multiple sizes. Perfect for everyday wear or special occasions.', 'Stainless Steel 316L', ARRAY['6', '7', '8', '9', '10', '11'], 50),
  ('Elegance Chain Necklace', 89.99, '/src/assets/product-necklace-1.jpg', 'Necklaces', 'women', 'Elegant stainless steel necklace with delicate pendant. Timeless design that complements any outfit.', 'Stainless Steel 316L', NULL, 30),
  ('Modern Link Bracelet', 64.99, '/src/assets/product-bracelet-1.jpg', 'Bracelets', 'men', 'Contemporary bracelet with modern link design. Durable and stylish for everyday wear.', 'Stainless Steel 316L', NULL, 25),
  ('Classic Hoop Earrings', 39.99, '/src/assets/product-earrings-1.jpg', 'Earrings', 'women', 'Timeless hoop earrings in polished stainless steel. Lightweight and comfortable for all-day wear.', 'Stainless Steel 316L', NULL, 40),
  ('Infinity Band Ring', 54.99, '/src/assets/product-ring-1.jpg', 'Rings', 'women', 'Beautiful infinity design symbolizing eternal love. Sleek and comfortable fit.', 'Stainless Steel 316L', ARRAY['5', '6', '7', '8', '9'], 35),
  ('Statement Chain Necklace', 99.99, '/src/assets/product-necklace-1.jpg', 'Necklaces', 'men', 'Bold chain necklace for a statement look. Premium quality with secure clasp.', 'Stainless Steel 316L', NULL, 20),
  ('Minimalist Bangle', 44.99, '/src/assets/product-bracelet-1.jpg', 'Bracelets', 'women', 'Simple yet elegant bangle bracelet. Perfect for stacking or wearing alone.', 'Stainless Steel 316L', NULL, 45),
  ('Stud Earrings Set', 34.99, '/src/assets/product-earrings-1.jpg', 'Earrings', 'women', 'Versatile stud earrings perfect for daily wear. Hypoallergenic and comfortable.', 'Stainless Steel 316L', NULL, 60);