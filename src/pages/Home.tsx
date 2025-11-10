import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Notification Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm">
        Free shipping on all orders above $100
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col justify-center h-full max-w-2xl space-y-6">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Shine & Line
            </h1>
            <h2 className="font-heading text-2xl md:text-3xl text-primary">
              A Touch of Sparkle for Every Day
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Explore elegant collections of necklaces, bracelets, rings, and more. 
              Timeless stainless-steel jewelry for men and women.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="text-base">
                <Link to="/collections">
                  Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {["Rings", "Necklaces", "Bracelets", "Earrings"].map((category) => (
              <Link
                key={category}
                to={`/collections?category=${category}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Best Sellers
            </h2>
            <p className="text-muted-foreground text-lg">
              Our most loved pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/collections">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                text: "Absolutely love my new necklace! The quality is exceptional and it goes with everything.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                text: "Best stainless steel jewelry I've owned. Doesn't tarnish and looks amazing.",
                rating: 5,
              },
              {
                name: "Emma Davis",
                text: "Fast shipping, beautiful packaging, and the rings are stunning. Highly recommend!",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Be the first to know about new collections, exclusive offers, and styling tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
