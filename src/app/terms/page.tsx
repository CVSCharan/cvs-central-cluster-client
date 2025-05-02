"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

const TermsPage = () => {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
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

              {/* Agreement to Terms */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Agreement to Terms</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    These Terms of Service constitute a legally binding agreement made between you and CVS Central Cluster ("we," "us," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                  </p>
                  <p>
                    You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                  </p>
                </div>
              </section>

              {/* Intellectual Property Rights */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Intellectual Property Rights</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                  </p>
                  <p>
                    Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content, and the Marks.
                  </p>
                </div>
              </section>

              {/* User Representations */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">User Representations</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>By using the Site, you represent and warrant that:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All registration information you submit will be true, accurate, current, and complete</li>
                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                    <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
                    <li>You are not a minor in the jurisdiction in which you reside</li>
                    <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise</li>
                    <li>You will not use the Site for any illegal or unauthorized purpose</li>
                    <li>Your use of the Site will not violate any applicable law or regulation</li>
                  </ul>
                </div>
              </section>

              {/* Prohibited Activities */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Prohibited Activities</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                  <p>As a user of the Site, you agree not to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us</li>
                    <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses</li>
                    <li>Use the Site to advertise or offer to sell goods and services</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the Site</li>
                    <li>Engage in unauthorized framing of or linking to the Site</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords</li>
                  </ul>
                </div>
              </section>

              {/* User Generated Contributions */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">User Generated Contributions</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                  </p>
                  <p>
                    Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that the content is accurate, not in violation of any rights, and not in violation of any laws.
                  </p>
                </div>
              </section>

              {/* Contribution License */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Contribution License</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.
                  </p>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Disclaimer</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                  <p>
                    WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE'S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN.
                  </p>
                </div>
              </section>

              {/* Contact Us */}
              <section className="rounded-xl border bg-card/30 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4">Contact Us</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
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

export default TermsPage;
