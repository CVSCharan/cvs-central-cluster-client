import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0"></div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4 sm:mb-6">
            Featured Projects
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A featured collection of my work, showcasing my skills and expertise
            in web development.
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary/5 blur-3xl opacity-70 sm:opacity-100"></div>
      <div className="absolute -top-16 -right-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-accent/5 blur-3xl opacity-70 sm:opacity-100"></div>
    </section>
  );
};

export default HeroSection;
