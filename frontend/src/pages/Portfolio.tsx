import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  event: string;
  text: string;
  rating: number;
}

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch Portfolio Items
    fetch(`${API_URL}/api/portfolio/`)
      .then((response) => response.json())
      .then((data) => setPortfolioItems(data))
      .catch((error) => console.error("Error fetching portfolio items:", error));

    // Fetch Testimonials
    fetch(`${API_URL}/api/testimonials/`)
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, [API_URL]);

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
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={`${API_URL}${item.image}`}
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
                key={testimonial.id}
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
          <Link to="/contact">
            <Button className="btn-primary text-lg px-12 py-4">
              Start Planning Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;