import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import DashboardPreview from "../../components/landing/DashboardPreview";
import HowItWorks from "../../components/landing/HowItWorks";
import WhyChoose from "../../components/landing/WhyChoose";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <WhyChoose />
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;