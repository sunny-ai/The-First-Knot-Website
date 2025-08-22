import { Button } from "@/components/ui/button";
import { Heart, Star, Calendar, Users } from "lucide-react";

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Elegant Garden Wedding",
      category: "Full Wedding Planning",
      description: "A dreamy outdoor celebration with cascading florals and romantic lighting",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop"
    },
    {
      title: "Royal Palace Reception",
      category: "Venue Decoration",
      description: "Luxurious ballroom transformation with crystal chandeliers and gold accents",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop"
    },
    {
      title: "Traditional Mehndi Celebration",
      category: "Cultural Events",
      description: "Vibrant celebration with traditional decor and custom mehndi favors",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop"
    },
    {
      title: "Intimate Beach Ceremony",
      category: "Destination Wedding",
      description: "Seaside romance with custom invitations and personalized favors",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop"
    },
    {
      title: "Modern City Wedding",
      category: "Contemporary Style",
      description: "Sleek urban celebration with minimalist elegance and bold florals",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop"
    },
    {
      title: "Vintage Barn Wedding",
      category: "Rustic Romance",
      description: "Charming countryside celebration with vintage decor and custom stationery",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Michael",
      event: "Garden Wedding 2024",
      text: "The First Knot made our dream wedding come true. Every detail was perfect, from the stunning invitations to the magical decorations.",
      rating: 5
    },
    {
      name: "Priya & Arjun",
      event: "Traditional Celebration 2024",
      text: "They beautifully blended our cultural traditions with modern elegance. The mehndi favors were absolutely stunning!",
      rating: 5
    },
    {
      name: "Emma & James",
      event: "Beach Wedding 2023",
      text: "Professional, creative, and so attentive to our vision. Our guests are still talking about how beautiful everything was.",
      rating: 5
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
            Our Portfolio
          </h1>
          <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover the magic we've created for couples who trusted us with their most precious moments
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.title}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-accent font-medium mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-heading text-xl mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-body text-foreground/70">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-ethereal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl md:text-5xl mb-6 text-foreground">
              What Our Couples Say
            </h2>
            <p className="text-body text-xl text-foreground/80">
              Love stories told by those who lived them
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-body text-foreground/80 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {testimonial.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-secondary rounded-2xl p-12 shadow-elegant border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Heart className="w-12 h-12 text-foreground mb-4" />
                <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">500+</div>
                <div className="text-body text-foreground/70">Happy Couples</div>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-12 h-12 text-foreground mb-4" />
                <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">1000+</div>
                <div className="text-body text-foreground/70">Events Completed</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-foreground mb-4" />
                <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">5+</div>
                <div className="text-body text-foreground/70">Years Experience</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-12 h-12 text-foreground mb-4" />
                <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">98%</div>
                <div className="text-body text-foreground/70">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-display text-4xl md:text-5xl mb-6 text-foreground">
            Ready to Create Your Story?
          </h2>
          <p className="text-body text-xl text-foreground/80 mb-8">
            Let's discuss how we can make your special day absolutely perfect
          </p>
          <Button className="btn-primary text-lg px-12 py-4">
            Start Planning Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;