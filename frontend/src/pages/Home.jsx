import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import ImpactSection from "../components/home/ImpactSection";
import FeaturesSection from "../components/home/FeaturesSection";
import AuthSection from "../components/home/AuthSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ImpactSection />
      <FeaturesSection />
      <AuthSection />
      <Footer />
    </div>
  );
}