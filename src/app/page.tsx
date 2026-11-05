"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ColorCustomizer from "@/components/ColorCustomizer";
import Highlights from "@/components/Highlights";
import InteriorShowcase from "@/components/InteriorShowcase";
import VersionPricing from "@/components/VersionPricing";
import LoanCalculator from "@/components/LoanCalculator";
import SpecsTable from "@/components/SpecsTable";
import Testimonials from "@/components/Testimonials";
import TestDriveBooking from "@/components/TestDriveBooking";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import QuickCtaBar from "@/components/QuickCtaBar";
import SupabaseGuideModal from "@/components/SupabaseGuideModal";

export default function Home() {
  const [selectedVersionForCalculator, setSelectedVersionForCalculator] = useState<string>("Mazda CX-5 2.0L Premium Exclusive");
  const [selectedVersionForBooking, setSelectedVersionForBooking] = useState<string>("Mazda CX-5 2.0L Premium Exclusive");

  const handleSelectForCalc = (name: string) => {
    setSelectedVersionForCalculator(name);
  };

  const handleSelectForBooking = (name: string) => {
    setSelectedVersionForBooking(name);
  };

  return (
    <main className="min-h-screen bg-mazda-dark-950 text-white selection:bg-mazda-red selection:text-white">
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Interactive Color Customizer */}
      <ColorCustomizer />

      {/* Core Highlights & KODO/SkyActiv/i-Activsense Technology */}
      <Highlights />

      {/* Interior & Cabin Comfort */}
      <InteriorShowcase />

      {/* Pricing & Versions */}
      <VersionPricing
        onSelectVersionForCalculator={handleSelectForCalc}
        onSelectVersionForBooking={handleSelectForBooking}
      />

      {/* Comprehensive Loan & On-Road Calculator */}
      <LoanCalculator
        initialVersionName={selectedVersionForCalculator}
      />

      {/* Technical Specifications Comparison */}
      <SpecsTable />

      {/* Customer Reviews & Testimonials */}
      <Testimonials />

      {/* Supabase-Powered Test Drive Booking Form */}
      <TestDriveBooking
        selectedVersion={selectedVersionForBooking}
      />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick CTA Bar */}
      <QuickCtaBar />

      {/* Floating Supabase Quick Guide Modal */}
      <SupabaseGuideModal />
    </main>
  );
}
