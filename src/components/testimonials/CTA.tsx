import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 z-0"></div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-xl sm:rounded-2xl border bg-card/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center shadow-lg"
        >
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Share Your Experience
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Join our community of satisfied users. Your feedback drives our
              innovation.
            </p>
          </div>
          <Link
            href="/testimonials/new"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 mt-2 sm:mt-4"
          >
            Add Your Testimonial
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-1/4 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-primary/10 blur-xl sm:blur-2xl opacity-70 sm:opacity-100"></div>
      <div className="absolute top-1/3 right-1/4 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-accent/10 blur-xl sm:blur-2xl opacity-70 sm:opacity-100"></div>
    </div>
  );
};

export default CTASection;
