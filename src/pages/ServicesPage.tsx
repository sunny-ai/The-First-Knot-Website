import { Gift, Mail, Flower, Home, Calendar as CalendarIcon, ArrowRight, Star, PencilRuler, Coffee, Map, Wine, Film, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesPage = () => {
  const primaryServices = [
    {
      icon: Gift,
      title: "Wedding Favours",
      description: "Thoughtful keepsakes that your guests will cherish forever.",
    },
    {
      icon: Mail,
      title: "Wedding Invites",
      description: "Elegant and customized invitations that reflect your story.",
    },
    {
      icon: Flower,
      title: "Mehndi Favours & Invites",
      description: "Unique designs infused with tradition and festivity.",
    },
    {
      icon: Home,
      title: "House Decoration",
      description: "Transforming spaces into warm, celebratory venues.",
    },
    {
      icon: CalendarIcon,
      title: "Event Management",
      description: "End-to-end planning and execution for seamless celebrations.",
    }
  ];

  const specialtyServices = [
    {
      icon: Wine,
      title: "Engagement Parties",
      description: "Celebrate your new beginning with a beautifully styled engagement party that sets the tone for your wedding journey.",
    },
    {
      icon: Film,
      title: "Bridal Showers",
      description: "From chic and modern to classic and elegant, we design bridal showers that are as unique as the bride-to-be.",
    },
    {
      icon: Star,
      title: "Anniversary Celebrations",
      description: "Rekindle the romance and celebrate your milestones with an anniversary party that is as special as your love story.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
            Our Services
          </h1>
          <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
            From intimate ceremonies to grand celebrations, we offer a comprehensive suite of services to make your special day truly unforgettable. We are committed to providing you with a seamless and stress-free experience, from the first invitation to the last dance.
          </p>
        </div>
      </section>

      {/* Primary Services Grid */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {primaryServices.map((service, index) => (
              <Card
                key={service.title}
                className="shadow-soft hover-lift group border flex flex-col text-center items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 mx-auto">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-heading text-2xl text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-body text-foreground/80 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
              Our Approach
            </h2>
            <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
              We believe that the best events are born from a partnership with our clients. Our approach is collaborative, creative, and centered on you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                Personalized Planning
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                We take the time to get to know you, your story, and your style. This allows us to create a celebration that is a true reflection of you as a couple.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <PencilRuler className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                Creative Design
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                Our team of designers will work with you to create a cohesive and beautiful aesthetic for your event, from the color palette to the floral arrangements.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft hover-lift border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Map className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-heading text-2xl mb-4 text-foreground">
                Seamless Execution
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed">
                On your special day, our team will be there to manage every detail, ensuring that everything runs smoothly so you can relax and enjoy the moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
              Specialty Services
            </h2>
            <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
              In addition to our core services, we also offer planning and design for a range of other special occasions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {specialtyServices.map((service, index) => (
              <Card
                key={service.title}
                className="shadow-soft hover-lift group border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-heading text-2xl text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-foreground/80 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-display text-4xl md:text-5xl mb-6 text-foreground">
            Ready to Plan Your Perfect Day?
          </h2>
          <p className="text-body text-xl text-foreground/80 mb-8">
            Let us bring your vision to life with our expertise and attention to detail. Contact us today for a free consultation.
          </p>
          <Button className="btn-primary text-lg px-12 py-4">
            Get Your Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;