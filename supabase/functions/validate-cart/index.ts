import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user's cart with product details
    const { data: cartItems, error: cartError } = await supabaseClient
      .from('cart_items')
      .select(`
        id,
        quantity,
        selected_size,
        products (
          id,
          name,
          price,
          inventory_count,
          sizes
        )
      `)
      .eq('user_id', user.id);

    if (cartError) {
      throw cartError;
    }

    const validationResults = [];
    let totalPrice = 0;
    let hasErrors = false;

    for (const item of cartItems || []) {
      const product = item.products as any;
      const validation = {
        cart_item_id: item.id,
        product_id: product.id,
        product_name: product.name,
        requested_quantity: item.quantity,
        available_quantity: product.inventory_count,
        unit_price: product.price,
        valid: true,
        errors: [] as string[],
      };

      // Check inventory
      if (item.quantity > product.inventory_count) {
        validation.valid = false;
        validation.errors.push(
          `Only ${product.inventory_count} items available (requested ${item.quantity})`
        );
        hasErrors = true;
      }

      // Check if size is valid (for products with sizes)
      if (product.sizes && product.sizes.length > 0 && item.selected_size) {
        if (!product.sizes.includes(item.selected_size)) {
          validation.valid = false;
          validation.errors.push(`Selected size "${item.selected_size}" is not available`);
          hasErrors = true;
        }
      }

      // Check inventory is not zero
      if (product.inventory_count === 0) {
        validation.valid = false;
        validation.errors.push('Out of stock');
        hasErrors = true;
      }

      if (validation.valid) {
        totalPrice += product.price * item.quantity;
      }

      validationResults.push(validation);
    }

    console.log('Cart validation completed:', {
      user_id: user.id,
      total_items: cartItems?.length || 0,
      has_errors: hasErrors,
      total_price: totalPrice,
    });

    return new Response(
      JSON.stringify({
        valid: !hasErrors,
        total_price: totalPrice,
        items: validationResults,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error validating cart:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});