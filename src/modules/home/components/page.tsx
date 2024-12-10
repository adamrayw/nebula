import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import React from "react";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </>
  );
};

export default page;
