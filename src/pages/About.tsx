export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground">
            Crafting elegance, one piece at a time
          </p>
        </div>

        {/* Brand Story */}
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-primary">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Shine & Line was born from a simple belief: jewelry should be both beautiful and enduring. 
              We specialize in premium stainless-steel accessories that combine timeless elegance with 
              modern durability. Our collections are designed for those who appreciate quality craftsmanship 
              and understated luxury.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-primary">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're committed to creating jewelry that enhances your everyday life. Every piece in our 
              collection is carefully crafted from high-grade stainless steel, ensuring longevity, 
              hypoallergenic properties, and resistance to tarnishing. We believe that exceptional 
              quality shouldn't compromise on style or accessibility.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-primary">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-heading text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We use only premium 316L stainless steel, ensuring each piece maintains its 
                  beauty for years to come.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-heading text-xl font-semibold mb-3">Timeless Design</h3>
                <p className="text-muted-foreground">
                  Our designs blend classic elegance with contemporary aesthetics, creating 
                  pieces that never go out of style.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-heading text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Stainless steel is recyclable and durable, reducing waste and environmental 
                  impact while maintaining luxury.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="font-heading text-xl font-semibold mb-3">Customer Care</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We're here to help you find the perfect 
                  piece and ensure it lasts a lifetime.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-3xl font-semibold text-primary">
              The Craft
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each Shine & Line piece undergoes meticulous quality control. From design conception 
              to final polish, we ensure that every necklace, bracelet, ring, and earring meets our 
              exacting standards. Our stainless steel jewelry is hypoallergenic, waterproof, and 
              designed to be worn every day without losing its luster.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-12 px-6 bg-muted rounded-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our collections and discover jewelry that complements your unique style.
            </p>
            <a
              href="/collections"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3 text-base font-medium hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
