import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inventory_count?: number;
}

export function ProductCard({ id, name, price, image, category, inventory_count = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addToCart(id, 1);
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {category}
            </p>
            <Link to={`/product/${id}`}>
              <h3 className="font-heading font-medium text-base truncate hover:text-primary transition-colors">
                {name}
              </h3>
            </Link>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Add to wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? "fill-primary text-primary" : ""
              }`}
            />
          </Button>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-lg font-semibold text-primary">
              ${price.toFixed(2)}
            </p>
            {inventory_count === 0 && (
              <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleAddToCart}
              disabled={inventory_count === 0}
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-3 w-3" />
            </Button>
            <Link to={`/product/${id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
