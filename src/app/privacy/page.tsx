"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-8 sm:space-y-12">
              {/* Last Updated Section */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>

              {/* Introduction */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Introduction</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    CVS Central Cluster ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                  </p>
                  <p>
                    This privacy policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Information We Collect</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                  </p>
                  <p>
                    The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Name and contact data (such as your email address, phone number, and address)</li>
                    <li>Credentials (such as passwords and security questions)</li>
                    <li>Payment data (such as your credit card number and billing address)</li>
                    <li>Usage data (such as how you interact with our website)</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">How We Use Your Information</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
                  </p>
                  <p>We use the information we collect or receive:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>To facilitate account creation and login process</li>
                    <li>To send administrative information to you</li>
                    <li>To send you marketing and promotional communications</li>
                    <li>To respond to your inquiries and offer support</li>
                    <li>To request feedback and to improve our website and services</li>
                    <li>To enforce our terms, conditions, and policies</li>
                    <li>To respond to legal requests and prevent harm</li>
                  </ul>
                </div>
              </section>

              {/* Cookies and Tracking Technologies */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Cookies and Tracking Technologies</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
                  </p>
                </div>
              </section>

              {/* Data Retention */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Data Retention</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                  </p>
                  <p>
                    When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                  </p>
                </div>
              </section>

              {/* Your Privacy Rights */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Your Privacy Rights</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
                  </p>
                  <p>These rights may include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>The right to access and receive a copy of your personal information</li>
                    <li>The right to rectify or update your personal information</li>
                    <li>The right to erase your personal information</li>
                    <li>The right to restrict processing of your personal information</li>
                    <li>The right to object to the processing of your personal information</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                  </ul>
                </div>
              </section>

              {/* Contact Us */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Contact Us</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    If you have questions or comments about this policy, you may contact us at:
                  </p>
                  <p className="font-medium">CVS Central Cluster</p>
                  <p>Email: cvstechsolutions@gmail.com</p>
                </div>
              </section>

              {/* Back to Home */}
              <div className="text-center mt-8 sm:mt-12">
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary/5 blur-3xl opacity-70 sm:opacity-100 pointer-events-none"></div>
        <div className="absolute -top-16 -right-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-accent/5 blur-3xl opacity-70 sm:opacity-100 pointer-events-none"></div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
