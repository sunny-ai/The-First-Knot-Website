import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "Every celebration we create is infused with love and dedication"
    },
    {
      icon: Sparkles,
      title: "Creative Excellence",
      description: "Unique designs that reflect your personal story and style"
    },
    {
      icon: Users,
      title: "Cultural Harmony",
      description: "Blending modern luxury with timeless traditions beautifully"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Attention to detail in every element of your special day"
    }
  ];

  return (
    <>
      <section id="about-intro" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {/* Romance Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4 lg:order-2">
              <div className="inline-block bg-secondary px-4 py-2 rounded-full text-sm font-medium text-primary">
                Inspired by
              </div>
              <h2 className="text-display text-5xl md:text-6xl text-foreground">Romance</h2>
              <p className="text-body text-lg text-muted-foreground">
                Love is in the air, and it's always romantic and in abundance in this magical city. It's a love that we want to share with people. So it's our dream to create a fragrance that is carefully, painstakingly curated to capture the essence of your perfect romance.
              </p>

              <Link to="/about" className="mt-4 inline-block">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                  Our Story
                </Button>
              </Link>
            </div>
            <div className="relative lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <img src="https://plus.unsplash.com/premium_photo-1661443876612-413f24e37f8f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Romantic couple illustration" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-details" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
                  About Us
                </h2>
                <p className="text-body text-lg text-foreground/80 leading-relaxed mb-8">
                  The First Knot is a modern wedding and event design company dedicated to turning your special moments into timeless memories. With a perfect blend of elegance, creativity, and cultural richness, we specialize in creating unforgettable experiences that reflect love, unity, and celebration.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-soft border">
                <h3 className="text-heading text-2xl mb-4 text-primary">Our Vision</h3>
                <p className="text-body text-foreground/80 leading-relaxed">
                  To craft meaningful and personalized celebrations that symbolize the beauty of togetherness, leaving a lasting impression for years to come.
                </p>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl p-6 shadow-soft hover-lift border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-heading text-xl mb-3 text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-body text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;