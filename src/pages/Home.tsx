import About from "@/components/About";
import Hero from "@/components/Hero";
import ScrollingHeadline from "@/components/ScrollingHeadline";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <ScrollingHeadline />
      <About />
      <Services />
      <WhyChooseUs />
    </div>
  );
};

export default Home;