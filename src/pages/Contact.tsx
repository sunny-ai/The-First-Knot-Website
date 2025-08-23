import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-display text-5xl md:text-6xl mb-6 text-foreground">
            Let's Create Magic Together
          </h1>
          <p className="text-body text-xl text-foreground/80 max-w-3xl mx-auto">
            Ready to start planning your perfect celebration? We'd love to hear your story and bring your vision to life.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form Card */}
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-primary mr-3" />
                  <CardTitle className="text-heading text-3xl text-foreground">
                    Tell Us Your Story
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-foreground font-medium mb-2">
                        Your Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-background/80 border-foreground/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-foreground font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-background/80 border-foreground/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-foreground font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-background/80 border-foreground/20"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground font-medium mb-2">
                        Event Date
                      </label>
                      <Input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleChange("eventDate", e.target.value)}
                        className="bg-background/80 border-foreground/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-foreground font-medium mb-2">
                      Type of Event
                    </label>
                    <Select value={formData.eventType} onValueChange={(value) => handleChange("eventType", value)}>
                      <SelectTrigger className="bg-background/80 border-foreground/20">
                        <SelectValue placeholder="Select your event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="mehndi">Mehndi Celebration</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="other">Other Celebration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-foreground font-medium mb-2">
                      Tell us about your vision *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-background/80 border-foreground/20 min-h-[120px]"
                      placeholder="Share your dreams, inspirations, and any specific requirements..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary text-lg py-4">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information Cards */}
            <div className="space-y-8">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-heading text-2xl text-foreground">
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 text-accent mr-4" />
                      <div>
                        <div className="font-medium text-foreground">Call Us</div>
                        <div className="text-foreground/70">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 text-accent mr-4" />
                      <div>
                        <div className="font-medium text-foreground">Email Us</div>
                        <div className="text-foreground/70">hello@thefirstknot.com</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-accent mr-4 mt-1" />
                      <div>
                        <div className="font-medium text-foreground">Visit Our Studio</div>
                        <div className="text-foreground/70">123 Wedding Street<br />Love City, LC 12345</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-accent mr-4" />
                      <div>
                        <div className="font-medium text-foreground">Business Hours</div>
                        <div className="text-foreground/70">Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-heading text-2xl text-foreground">
                    Free Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-foreground/80 mb-6">
                    Schedule a complimentary consultation to discuss your vision and see how we can bring it to life.
                  </p>
                  <Button className="btn-primary w-full">
                    Book Your Consultation
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-heading text-2xl text-foreground">
                    Quick Response Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-foreground/80">
                    We understand that planning your special day is time-sensitive. That's why we guarantee a response within 24 hours to all inquiries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-display text-4xl md:text-5xl mb-12 text-center text-foreground">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How far in advance should we book your services?</AccordionTrigger>
              <AccordionContent>
                We recommend booking 6-12 months in advance for weddings, especially during peak season (April-October). However, we've successfully planned beautiful celebrations with shorter timelines too.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer customizable packages?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Every celebration is unique, and we tailor our services to match your specific needs, style, and budget. We offer both full-service packages and individual services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can you work with our budget?</AccordionTrigger>
              <AccordionContent>
                Yes, we work with various budgets and will help you prioritize elements that matter most to you. During our consultation, we'll discuss how to maximize your investment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you handle destination events?</AccordionTrigger>
              <AccordionContent>
                Yes, we love destination celebrations! We've planned events across the country and internationally. Additional travel costs will be discussed during planning.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Contact;