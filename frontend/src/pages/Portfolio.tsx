// frontend/src/pages/Portfolio.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Heart, Star, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

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

const fetchPortfolioItems = async (): Promise<PortfolioItem[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/portfolio/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/testimonials/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


const Portfolio = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { data: portfolioItems = [], isLoading: isLoadingPortfolio, error: portfolioError } = useQuery({
    queryKey: ['portfolioItems'],
    queryFn: fetchPortfolioItems,
  });

  const { data: testimonials = [], isLoading: isLoadingTestimonials, error: testimonialsError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const filteredItems = categoryFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === categoryFilter);

  const availableCategories = ["All", ...new Set(portfolioItems.map(item => item.category))];


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
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {availableCategories.map((category) => (
                <Button
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"}
                    onClick={() => setCategoryFilter(category)}
                >
                    {category}
                </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingPortfolio ? (
              <p>Loading portfolio...</p>
            ) : portfolioError ? (
              <p>Error loading portfolio.</p>
            ) : (
              filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="rounded-2xl overflow-hidden shadow-soft hover-lift border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
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
                </Card>
              ))
            )}
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

          <Carousel
            opts={{
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {isLoadingTestimonials ? (
                <p>Loading testimonials...</p>
              ) : testimonialsError ? (
                <p>Error loading testimonials.</p>
              ) : (
                testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div
                        className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft border"
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
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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