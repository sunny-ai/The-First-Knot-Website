import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-wedding.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background and Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroImage} 
          alt="Elegant wedding celebration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Falling Petals Animation */}
      <div className="petals-container z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="petal"></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        <h1 className="font-signature text-8xl md:text-9xl mb-6 text-foreground">
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