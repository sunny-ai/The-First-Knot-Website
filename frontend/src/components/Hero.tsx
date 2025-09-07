import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4"; // Import the local video
import lightLogo from "@/assets/light.png";

const Hero = () => {
  return (
    <section className="min-h-screen bg-background pt-20 relative overflow-hidden">
      {/* Abstract Love Icons Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Heart className="absolute -bottom-20 -left-20 text-primary/10 w-64 h-64 animate-float" />
        <Heart className="absolute -top-20 -right-20 text-primary/10 w-48 h-48 animate-float animation-delay-3000" />
        <Heart className="absolute top-1/2 left-1/4 text-primary/5 w-32 h-32 animate-float animation-delay-1000" />
        <Heart className="absolute top-1/3 right-1/4 text-primary/5 w-24 h-24 animate-float animation-delay-5000" />
        <Heart className="absolute bottom-1/4 left-1/3 text-primary/10 w-16 h-16 animate-float animation-delay-2000" />
        <Heart className="absolute bottom-1/2 right-1/2 text-primary/5 w-48 h-48 animate-float animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="animate-fade-in-up space-y-6">
            <div className="inline-block bg-primary px-4 py-2 rounded-full text-sm font-medium text-primary-foreground">
              Inspired by Romance
            </div>
            <h1 className="text-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Your First Knot to Forever
            </h1>
            <p className="text-body text-lg text-muted-foreground max-w-lg">
              A fragrance meant to be an invitation, lure, and addiction. For the woman who is a charmer, confident, and ready to stun with this lovely scent.
            </p>
            <Link to="/style-quiz" className="mt-4 inline-block">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                Find Your Wedding Style <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Right Video Card */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              <video 
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
            <img src={lightLogo} alt="Rotating Logo" className="absolute bottom-0 right-0 w-40 h-40 animate-rotation transform translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;