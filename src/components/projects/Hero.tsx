import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            Featured Projects
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            A featured collection of my work, showcasing my skills and expertise
            in web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
