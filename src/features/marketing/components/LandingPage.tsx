import { Footer } from "@/shared/components/layout/Footer";
import { CtaSection } from "./CtaSection";
import { FeaturesSection } from "./FeaturesSection";
import { HeroSection } from "./HeroSection";
import { PricingSection } from "./PricingSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { TestimonialsSection } from "./TestimonialsSection";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </>
  );
}