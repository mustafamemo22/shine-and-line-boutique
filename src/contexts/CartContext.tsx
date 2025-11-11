import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  selected_size?: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    inventory_count: number;
    sizes?: string[];
  };
}

interface GuestCartItem {
  product_id: string;
  quantity: number;
  selected_size?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number, size?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  user: User | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = "shine_line_guest_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load guest cart from localStorage
  const loadGuestCart = () => {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  // Save guest cart to localStorage
  const saveGuestCart = (cart: GuestCartItem[]) => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  };

  // Fetch cart items from database for authenticated users
  const fetchCartItems = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        product_id,
        quantity,
        selected_size,
        products (
          id,
          name,
          price,
          image,
          inventory_count,
          sizes
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
      return;
    }

    const formattedItems: CartItem[] = data.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      selected_size: item.selected_size,
      product: {
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        image: item.products.image,
        inventory_count: item.products.inventory_count,
        sizes: item.products.sizes,
      },
    }));

    setItems(formattedItems);
  };

  // Sync guest cart to database when user logs in
  const syncGuestCartToDatabase = async (userId: string) => {
    const guestCart = loadGuestCart();
    if (guestCart.length === 0) return;

    for (const item of guestCart) {
      await supabase.from("cart_items").upsert({
        user_id: userId,
        product_id: item.product_id,
        quantity: item.quantity,
        selected_size: item.selected_size,
      }, {
        onConflict: 'user_id,product_id,selected_size'
      });
    }

    localStorage.removeItem(GUEST_CART_KEY);
    await fetchCartItems();
  };

  // Listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        syncGuestCartToDatabase(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && event === 'SIGNED_IN') {
        await syncGuestCartToDatabase(session.user.id);
      } else if (!session?.user) {
        setItems([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (productId: string, quantity = 1, size?: string) => {
    try {
      if (!user) {
        // Guest cart - store in localStorage
        const guestCart = loadGuestCart();
        const existingIndex = guestCart.findIndex(
          (item: GuestCartItem) => 
            item.product_id === productId && 
            item.selected_size === size
        );

        if (existingIndex >= 0) {
          guestCart[existingIndex].quantity += quantity;
        } else {
          guestCart.push({ product_id: productId, quantity, selected_size: size });
        }

        saveGuestCart(guestCart);
        
        toast({
          title: "Added to cart",
          description: "Sign in to save your cart across devices",
        });
        return;
      }

      // Authenticated user - save to database
      const { error } = await supabase.from("cart_items").upsert({
        user_id: user.id,
        product_id: productId,
        quantity,
        selected_size: size,
      }, {
        onConflict: 'user_id,product_id,selected_size'
      });

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Added to cart",
        description: "Item successfully added to your cart",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);

      if (error) throw error;

      await fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Removed from cart",
        description: "Item removed successfully",
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) {
      localStorage.removeItem(GUEST_CART_KEY);
      setItems([]);
      return;
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        loading,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}