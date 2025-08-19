import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-wedding.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Hero Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroImage} 
          alt="Elegant wedding celebration" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-secondary rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        <h1 className="text-display text-6xl md:text-8xl mb-6 text-foreground">
          The First Knot
        </h1>
        
        <p className="text-heading text-2xl md:text-3xl mb-8 text-muted-foreground">
          From Your First Knot to Forever
        </p>
        
        <p className="text-body text-lg md:text-xl mb-12 max-w-2xl mx-auto text-foreground/80">
          Modern wedding and event design company dedicated to turning your special moments into timeless memories with elegance, creativity, and cultural richness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button className="btn-primary text-lg">
            Explore Our Services
          </Button>
          <Button variant="outline" className="bg-background/80 backdrop-blur-sm border-2 border-primary text-foreground font-medium px-8 py-4 rounded-full hover:bg-primary/10 transition-all duration-300 text-lg">
            View Our Story
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;