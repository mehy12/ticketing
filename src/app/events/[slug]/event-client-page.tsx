"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  Heart,
  Download,
  CheckCircle,
} from "lucide-react";
import FancyButton from "@/components/ui/fancy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";
import type { Event } from "@/lib/types";

type EventPageClientProps = {
  event: Event;
};

export default function EventPageClient({ event }: EventPageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/brochure.pdf"; // Ensure the file is placed in the public folder
    link.download = "Ikyam_2026_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar */}
      <div className="z-40 fixed w-full">
        <Navbar />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-40 z-10`}
        />
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {event.name}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">{event.tagline}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-black/30 backdrop-blur-sm mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="prizes">Prizes</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6"
                >
                  <motion.h2
                    variants={fadeIn}
                    custom={0}
                    className="text-2xl font-bold text-white mb-4"
                  >
                    About the Event
                  </motion.h2>
                  <motion.p
                    variants={fadeIn}
                    custom={1}
                    className="text-gray-300 mb-6"
                  >
                    {event.description}
                  </motion.p>

                  <motion.div
                    variants={fadeIn}
                    custom={2}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-white">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm text-gray-400">Time</p>
                        <p className="text-white">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm text-gray-400">Venue</p>
                        <p className="text-white">{event.venue}</p>
                      </div>
                    </div>
                  </motion.div>

                  {event.eligibility && (
                    <motion.div variants={fadeIn} custom={3}>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        Eligibility
                      </h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                        {event.eligibility.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {event.maxTeamSize && (
                    <motion.div
                      variants={fadeIn}
                      custom={4}
                      className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg w-fit"
                    >
                      <Users className="h-5 w-5 text-white" />
                      <div>
                        <p className="text-sm text-gray-400">Team Size</p>
                        <p className="text-white">
                          {event.minTeamSize === event.maxTeamSize
                            ? `Exactly ${event.maxTeamSize} members`
                            : `${event.minTeamSize} - ${event.maxTeamSize} members`}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="rules">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6"
                >
                  <motion.h2
                    variants={fadeIn}
                    custom={0}
                    className="text-2xl font-bold text-white mb-4"
                  >
                    Rules & Regulations
                  </motion.h2>
                  <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    {event.rules.map((rule, index) => (
                      <motion.li
                        key={index}
                        variants={fadeIn}
                        custom={index}
                        className="flex items-start text-gray-300"
                      >
                        <span
                          className={`flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r ${event.gradient} text-white text-sm mr-3 mt-0.5`}
                        >
                          {index + 1}
                        </span>
                        {rule}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </TabsContent>

              <TabsContent value="prizes">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6"
                >
                  <motion.h2
                    variants={fadeIn}
                    custom={0}
                    className="text-2xl font-bold text-white mb-6"
                  >
                    Prizes & Rewards
                  </motion.h2>
                  <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    {event.prizes.map((prize, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        custom={index}
                        className={`relative overflow-hidden rounded-xl p-6 border border-white/10 ${index === 0
                          ? "bg-gradient-to-b from-yellow-500/20 to-transparent"
                          : index === 1
                            ? "bg-gradient-to-b from-gray-400/20 to-transparent"
                            : index === 2
                              ? "bg-gradient-to-b from-amber-700/20 to-transparent"
                              : "bg-white/5"
                          }`}
                      >
                        {index === 0 && (
                          <div className="absolute -top-6 -right-6 h-12 w-24 bg-yellow-500 rotate-45 flex items-end justify-center pb-1">
                            <Trophy className="h-4 w-4 text-black" />
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white mb-2">
                          {prize.position}
                        </h3>
                        <p
                          className={`text-3xl font-bold ${index === 0
                            ? "text-yellow-500"
                            : index === 1
                              ? "text-gray-300"
                              : index === 2
                                ? "text-amber-700"
                                : "text-white"
                            } mb-2`}
                        >
                          {prize.amount}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {prize.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="faq">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-6"
                >
                  <motion.h2
                    variants={fadeIn}
                    custom={0}
                    className="text-2xl font-bold text-white mb-6"
                  >
                    Frequently Asked Questions
                  </motion.h2>

                  {event.faqs ? (
                    <motion.div
                      variants={staggerContainer}
                      className="space-y-4"
                    >
                      {event.faqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          variants={fadeIn}
                          custom={index}
                          className="border border-white/10 rounded-lg overflow-hidden"
                        >
                          <div className="p-4 bg-white/5">
                            <h3 className="text-lg font-medium text-white">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="p-4 border-t border-white/10">
                            <p className="text-gray-300">{faq.answer}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-gray-400">
                      No FAQs available for this event. Please contact the
                      coordinators for any questions.
                    </p>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sticky top-24"
            >
              {/* Registration Card */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Registration
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white">
                      {event.registration.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="text-white">
                      {event.registration.deadline}
                    </span>
                  </div>
                  {event.registration.fee && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fee:</span>
                      <span className="text-white">
                        {event.registration.fee}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link href="/register" className="block">
                    <FancyButton variant="primary" color="violet" className="w-full">
                      Register Now
                    </FancyButton>
                  </Link>
                  <FancyButton
                    variant="secondary"
                    color="cyan"
                    className="w-full"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2 inline" />
                    Download Rules PDF
                  </FancyButton>
                </div>
              </div>

              {/* Coordinators Card */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Event Coordinators
                </h3>
                <div className="space-y-4">
                  {event.coordinators.map((coordinator, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-white/5"
                    >
                      {coordinator.image ? (
                        <Image
                          src={coordinator.image || "/placeholder.svg"}
                          alt={coordinator.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {coordinator.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-white">
                          {coordinator.name}
                        </p>
                        {coordinator.role && (
                          <p className="text-sm text-gray-400">
                            {coordinator.role}
                          </p>
                        )}
                        <div className="flex items-center mt-1">
                          <Phone className="h-3 w-3 text-gray-400 mr-1" />
                          <p className="text-sm text-gray-300">
                            {coordinator.contact}
                          </p>
                        </div>
                        {coordinator.email && (
                          <div className="flex items-center mt-1">
                            <Mail className="h-3 w-3 text-gray-400 mr-1" />
                            <p className="text-sm text-gray-300">
                              {coordinator.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex justify-between">
                  <FancyButton
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 inline ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                    />
                    {isLiked ? "Saved" : "Save"}
                  </FancyButton>
                  <FancyButton variant="ghost">
                    <Share2 className="h-4 w-4 mr-2 inline" />
                    Share
                  </FancyButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
