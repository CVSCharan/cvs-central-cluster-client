import React from "react";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Cvs Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development and design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
