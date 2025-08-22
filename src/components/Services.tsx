import { Gift, Mail, Flower, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Gift,
      title: "Wedding Favours",
      description: "Thoughtful keepsakes that your guests will cherish forever",
      features: ["Custom designs", "Premium materials", "Personalized packaging", "Bulk orders"]
    },
    {
      icon: Mail,
      title: "Wedding Invites",
      description: "Elegant and customized invitations that reflect your story",
      features: ["Bespoke designs", "Premium printing", "RSVP management", "Save the dates"]
    },
    {
      icon: Flower,
      title: "Mehndi Favours & Invites",
      description: "Unique designs infused with tradition and festivity",
      features: ["Traditional motifs", "Cultural elements", "Vibrant colors", "Custom themes"]
    },
    {
      icon: Home,
      title: "House Decoration",
      description: "Transforming spaces into warm, celebratory venues",
      features: ["Floral arrangements", "Lighting design", "Venue styling", "Theme coordination"]
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "End-to-end planning and execution for seamless celebrations",
      features: ["Complete planning", "Vendor coordination", "Timeline management", "Day-of execution"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
            Our Services
          </h2>
          <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
            From intimate ceremonies to grand celebrations, we offer comprehensive services to make your special day truly unforgettable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-gradient-primary rounded-2xl p-8 shadow-soft hover-lift group border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center mb-6 group-hover:bg-background transition-colors duration-300">
                <service.icon className="w-8 h-8 text-foreground" />
              </div>
              
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                {service.title}
              </h3>
              
              <p className="text-body text-foreground/80 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="text-body text-foreground/70 flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full bg-foreground text-background hover:bg-foreground/90 hover:text-white transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-secondary rounded-2xl p-12 shadow-elegant border">
            <h3 className="text-heading text-3xl mb-4 text-foreground">
              Ready to Plan Your Perfect Day?
            </h3>
            <p className="text-body text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Let us bring your vision to life with our expertise and attention to detail
            </p>
            <Button className="btn-primary text-lg px-12 py-4">
              Get Your Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;