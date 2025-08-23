import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Users, Award, Palette, Crown, Eye, Target, Map, PencilRuler, Coffee } from "lucide-react";

const AboutPage = () => {
  const reasons = [
    {
      icon: Palette,
      title: "B bespoke Designs",
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
            About The First Knot
          </h1>
          <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
            From Your First Knot to Forever. We are dedicated to turning your special moments into timeless memories.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <p className="text-primary font-semibold">Our Story</p>
              <h2 className="text-display text-5xl md:text-6xl text-foreground">Inspired by Romance</h2>
              <p className="text-body text-lg text-muted-foreground">
                The First Knot was born from a passion for celebrating love in its purest form. We believe that every couple has a unique story, and every celebration should be a reflection of that story. Our journey began with a simple idea: to create beautiful, meaningful, and unforgettable wedding experiences that blend elegance, creativity, and cultural richness.
              </p>
              <p className="text-body text-lg text-muted-foreground">
                We are more than just planners and designers; we are storytellers, artists, and dreamers who are committed to making your special day as unique as your love.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <img src="https://plus.unsplash.com/premium_photo-1661443876612-413f24e37f8f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Romantic couple illustration" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision & Mission Section */}
      <section id="our-vision-mission" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft border">
              <h3 className="text-heading text-2xl mb-4 text-primary flex items-center"><Target className="w-6 h-6 mr-2" />Our Mission</h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                To alleviate the stress of event planning by providing exceptional, personalized service and creating beautiful, seamless, and memorable celebrations for our clients.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft border">
              <h3 className="text-heading text-2xl mb-4 text-primary flex items-center"><Eye className="w-6 h-6 mr-2" />Our Vision</h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                To craft meaningful and personalized celebrations that symbolize the beauty of togetherness, leaving a lasting impression for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
              Our Process
            </h2>
            <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
              We follow a simple, collaborative process to ensure your vision is brought to life flawlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Coffee className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                1. Consultation
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                We start with a conversation to understand your story, style, and vision for your special day.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <PencilRuler className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                2. Design & Planning
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                We create a detailed plan and design concept, working with you to select vendors, venues, and all the little details.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Map className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                3. Execution
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                On the day of your event, we manage everything from setup to breakdown, ensuring a seamless and unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
              Why Choose Us
            </h2>
            <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
              We don't just plan events – we craft experiences that celebrate love, tradition, and the beginning of beautiful journeys.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="bg-card rounded-2xl p-8 shadow-soft hover-lift border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <reason.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-heading text-2xl mb-4 text-foreground">
                  {reason.title}
                </h3>
                <p className="text-body text-foreground/80 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;