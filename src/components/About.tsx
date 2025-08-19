import { Heart, Sparkles, Users, Award } from "lucide-react";

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
    <section id="about" className="py-20 bg-gradient-ethereal">
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

            <div className="bg-foreground backdrop-blur-sm rounded-2xl p-8 shadow-soft border">
              <h3 className="text-heading text-2xl mb-4 text-background">Our Vision</h3>
              <p className="text-body text-background/80 leading-relaxed">
                To craft meaningful and personalized celebrations that symbolize the beauty of togetherness, leaving a lasting impression for years to come.
              </p>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-foreground backdrop-blur-sm rounded-2xl p-6 shadow-soft hover-lift border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-background" />
                </div>
                <h4 className="text-heading text-xl mb-3 text-background">
                  {feature.title}
                </h4>
                <p className="text-body text-background/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;