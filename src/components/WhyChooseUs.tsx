import { Palette, Crown, Eye, Users } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Palette,
      title: "Bespoke Designs",
      description: "Every design is tailored to your unique theme and personal story, ensuring no two celebrations are alike."
    },
    {
      icon: Crown,
      title: "Luxury Meets Tradition",
      description: "Perfect blend of modern luxury with timeless traditions, creating sophisticated yet meaningful experiences."
    },
    {
      icon: Eye,
      title: "Attention to Detail",
      description: "Meticulous care in every element of your event, from the smallest favor to the grandest decoration."
    },
    {
      icon: Users,
      title: "Dedicated Team",
      description: "Experienced professionals ensuring smooth and stress-free celebrations with seamless execution."
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
            Why Choose Us
          </h2>
          <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
            We don't just plan events – we craft experiences that celebrate love, tradition, and the beginning of beautiful journeys
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft hover-lift"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-8 h-8 text-foreground" />
                </div>
                
                <div>
                  <h3 className="text-heading text-2xl mb-4 text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-body text-foreground/80 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-background/60 backdrop-blur-sm rounded-2xl p-12 shadow-elegant">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">500+</div>
              <div className="text-body text-foreground/70">Happy Couples</div>
            </div>
            <div>
              <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">1000+</div>
              <div className="text-body text-foreground/70">Events Completed</div>
            </div>
            <div>
              <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">5+</div>
              <div className="text-body text-foreground/70">Years Experience</div>
            </div>
            <div>
              <div className="text-display text-4xl md:text-5xl mb-2 text-foreground">98%</div>
              <div className="text-body text-foreground/70">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;