"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";
import {
  Check,
  Users,
  User,
  Music,
  Camera,
  Film,
  Ticket,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PassesPage() {
  const [selectedPass, setSelectedPass] = useState<string | null>(null);

  const handlePassSelect = (passId: string) => {
    setSelectedPass(passId === selectedPass ? null : passId);
  };

  const passes = [
    {
      id: "basic",
      name: "Basic Pass",
      price: 99,
      description: "Access to any 1 solo event",
      color: "from-blue-500 to-cyan-400",
      features: [
        "Choose any 1 solo event",
        "Official event certificate",
        "Event kit",
      ],
      teamSize: "Individual",
      popular: false,
      events: ["Solo singing", "Solo dance", "Photography", "Short film"],
    },
    {
      id: "elite",
      name: "Elite Pass",
      price: 179,
      description: "Access to any 2 solo events",
      color: "from-purple-500 to-indigo-600",
      features: [
        "Choose any 2 solo events",
        "Official event certificate",
        "Event kit",
        "Priority registration",
      ],
      teamSize: "Individual",
      popular: true,
      events: ["Solo singing", "Solo dance", "Photography", "Short film"],
    },
    {
      id: "group",
      name: "Group Pass",
      price: 269,
      description: "Access to any 1 group event",
      color: "from-green-500 to-emerald-600",
      features: [
        "Choose any 1 group event",
        "Official event certificate",
        "Event kit",
      ],
      teamSize: "Varies by event",
      popular: false,
      events: [
        "Treasure hunt",
        "Mime",
        "Mad ads",
        "Ad making",
        "Group Singing",
      ],
    },
    {
      id: "biggboss",
      name: "Bigg Boss Pass",
      price: 499,
      description: "Team of 5 for special events",
      color: "from-yellow-500 to-orange-500",
      features: [
        "Team registration",
        "Official event certificate",
        "Event kit",
        "Exclusive access",
      ],
      teamSize: "Team of 5",
      popular: false,
      events: ["Treasure hunt", "Mime", "Mad ads", "Ad making"],
    },
    {
      id: "duodance",
      name: "Duo Dance",
      price: 179,
      description: "Dance competition for pairs",
      color: "from-pink-500 to-rose-500",
      features: [
        "Duo dance competition",
        "Official event certificate",
        "Event kit",
      ],
      teamSize: "Team of 2",
      popular: false,
      events: ["Duo Dance"],
    },
    {
      id: "groupdance",
      name: "Group Dance",
      price: 1000,
      description: "Dance competition for groups",
      color: "from-red-500 to-orange-600",
      features: [
        "Group dance competition",
        "Official event certificate",
        "Event kit",
        "Backstage access",
      ],
      teamSize: "Team of 7-10",
      popular: false,
      events: ["Group Dance"],
    },
    {
      id: "fashionshow",
      name: "Fashion Show",
      price: 2000,
      description: "Showcase your fashion sense",
      color: "from-indigo-500 to-purple-600",
      features: [
        "Fashion show participation",
        "Official event certificate",
        "Event kit",
        "Backstage access",
        "Professional photography",
      ],
      teamSize: "Team of 8-12",
      popular: false,
      events: ["Fashion Show"],
    },
  ];

  const eventCategories = [
    {
      name: "Solo Events",
      icon: <User className="h-5 w-5" />,
      events: ["Solo singing", "Solo dance", "Photography", "Short film"],
    },
    {
      name: "Duo Events",
      icon: <Users className="h-5 w-5" />,
      events: ["Duo Dance"],
    },
    {
      name: "Group Events",
      icon: <Users className="h-5 w-5" />,
      events: [
        "Treasure hunt",
        "Mime",
        "Mad ads",
        "Ad making",
        "Group Singing",
        "Group Dance",
        "Fashion Show",
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-transparent via-transparent/90 to-transparent/90">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 mt-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
              Ikyam 2026 Passes
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Choose the perfect pass for your Ikyam experience. Unlock access to
            exciting events and competitions!
          </p>
        </motion.div>

        {/* Passes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16"
        >
          {passes.map((pass, i) => (
            <motion.div
              key={pass.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card
                className={`h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 bg-black/40 backdrop-blur-sm border-gray-800 group ${selectedPass === pass.id ? "ring-2 ring-purple-500" : ""
                  }`}
                onClick={() => handlePassSelect(pass.id)}
                key={i}
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pass.color}`}
                  />
                  {pass.popular && (
                    <Badge
                      className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${pass.color}`}
                    >
                      Popular
                    </Badge>
                  )}
                </div>

                <CardHeader className="relative z-20 pb-0">
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                    {pass.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-300">
                    <Ticket className="h-3 w-3" />
                    <span>{pass.teamSize}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-3">
                  <div className="flex items-center gap-1 text-2xl font-bold text-white mb-4">
                    <span
                      className={`bg-gradient-to-r ${pass.color} bg-clip-text text-transparent`}
                    >
                      ₹{pass.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">
                    {pass.description}
                  </p>
                  <ul className="space-y-2">
                    {pass.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="w-full pt-2 border-t border-gray-800"></div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-black/50 backdrop-blur-md rounded-2xl p-8 max-w-5xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Event Categories
            </span>
          </h2>

          <Tabs defaultValue="solo" className="w-full text-sm">
            <TabsList className="grid grid-cols-3 mb-8">
              {eventCategories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name.toLowerCase().replace(" ", "")}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {eventCategories.map((category) => (
              <TabsContent
                key={category.name}
                value={category.name.toLowerCase().replace(" ", "")}
              >
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.events.map((event, i) => (
                    <motion.div
                      key={event}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        {event.includes("Singing") ? (
                          <Music className="h-5 w-5 text-purple-400" />
                        ) : event.includes("Dance") ? (
                          <Users className="h-5 w-5 text-pink-400" />
                        ) : event.includes("Photography") ? (
                          <Camera className="h-5 w-5 text-blue-400" />
                        ) : event.includes("Film") ? (
                          <Film className="h-5 w-5 text-red-400" />
                        ) : (
                          <Trophy className="h-5 w-5 text-yellow-400" />
                        )}
                        <span className="text-gray-200 font-medium">
                          {event}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Registration CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-purple-900/70 to-indigo-900/70 backdrop-blur-md rounded-2xl p-8 text-center max-w-3xl mx-auto mb-12 border border-purple-500/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Join Ikyam 2026?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Register now to secure your pass and be part of the most exciting
            cultural fest of the year!
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="px-8 py-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-black/50 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-2">
                How do I register for multiple events?
              </h3>
              <p className="text-gray-300">
                You can purchase the Elite Pass to participate in any 2 solo
                events, or select individual passes for specific events.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-2">
                Can I upgrade my pass later?
              </h3>
              <p className="text-gray-300">
                Yes, you can upgrade your pass at any time before the event by
                paying the difference in price.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-2">
                Are passes transferable?
              </h3>
              <p className="text-gray-300">
                No, passes are non-transferable and linked to your registration
                details.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
