"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Trophy,
  Calendar,
  Users,
  Clock,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle2,
  DownloadIcon,
} from "lucide-react";
import type { Tournament } from "@/lib/tournament-data";
import { ParallaxSection } from "../components/parallax-section";
import { CustomCursor } from "@/components/custom-cursor";
import { Button } from "@/components/ui/button";

export default function TournamentClient({
  tournament,
}: {
  tournament: Tournament;
}) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/brochure.pdf"; // Ensure the file is placed in the public folder
    link.download = "esports/esports.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Set the tournament date to next Saturday at 10:00 AM
  const tournamentDate = useRef(new Date());

  useEffect(() => {
    // Set tournament date to April 4 at 10:00 AM
    tournamentDate.current = new Date();
    tournamentDate.current.setFullYear(new Date().getFullYear(), 3, 4); // April 4 (Month is 0-indexed)
    tournamentDate.current.setHours(10, 0, 0, 0);

    // Check if April 4th has already passed this year
    const now = new Date();
    if (now > tournamentDate.current) {
      tournamentDate.current.setFullYear(now.getFullYear() + 1); // Move to next year's April 4th
    }

    const interval = setInterval(() => {
      const now = new Date();
      const difference = tournamentDate.current.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rules", label: "Rules" },
    { id: "prizes", label: "Prizes" },
    { id: "registration", label: "Registration" },
  ];

  // Determine theme color based on game type
  const themeColor = tournament.game === "valorant" ? "#FF4655" : "#1F85DE";
  const registrationFee = tournament.game === "valorant" ? "₹1,000" : "₹500";
  const teamSize = tournament.game === "valorant" ? "5 Players" : "1-4 Players";
  const platform = tournament.game === "valorant" ? "PC" : "Mobile";
  const format =
    tournament.game === "valorant" ? "5v5 Tactical Shooter" : "Battle Royale";
  const heroImage =
    tournament.game === "valorant"
      ? "/esports/background.png"
      : "/esports/background2.png";

  return (
    <div className="min-h-screen bg-black  text-white">
      <CustomCursor />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-[url('/esports/background3.png')] bg-no-repeat bg-cover bg-center">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt={`${tournament.title} Tournament`}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(${tournament.game === "valorant" ? "255,70,85" : "31,133,222"
              },0.15),transparent_70%)]`}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: ["-10px", "10px", "-10px"],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-[${themeColor}]/10 blur-[100px]`}
          />
          <motion.div
            animate={{
              y: ["10px", "-10px", "10px"],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className={`absolute bottom-[10%] left-[15%] w-80 h-80 rounded-full bg-[${themeColor}]/10 blur-[120px]`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`inline-block px-4 py-1 mb-4 text-sm font-medium   bg-[${themeColor}]/20 text-[${themeColor}] rounded-sm border border-[${themeColor}]/30`}
            style={{
              backgroundColor: `${themeColor}20`,
              color: themeColor,
              borderColor: `${themeColor}30`,
            }}
          >
            LASTROUND PRESENTS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-4"
          >
            <span className="inline-block transform -skew-x-12 text-white">
              {tournament.game.toUpperCase()}
            </span>
            <span
              className="inline-block transform skew-x-12"
              style={{ color: themeColor }}
            >
              {tournament.game === "valorant" ? " CHAMPIONSHIP" : " ESPORTS"}
            </span>
            {tournament.game === "bgmi" && (
              <span className="block mt-2 text-white">TOURNAMENT</span>
            )}
          </motion.h1>
        </div>

        {/* Countdown Timer - Repositioned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 z-10 transform translate-y-1/2"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 backdrop-blur-sm"
                style={{ backgroundColor: `${themeColor}10` }}
              />
              <div className="relative p-6 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Tournament Starts In:
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {formatDate(tournamentDate.current)} at 10:00 AM
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="text-center">
                    <div
                      className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-2 w-14 border"
                      style={{ borderColor: `${themeColor}30` }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {days}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Days
                    </span>
                  </div>
                  <div className="text-center">
                    <div
                      className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-2 w-14 border"
                      style={{ borderColor: `${themeColor}30` }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {hours}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Hours
                    </span>
                  </div>
                  <div className="text-center">
                    <div
                      className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-2 w-14 border"
                      style={{ borderColor: `${themeColor}30` }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {minutes}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Mins
                    </span>
                  </div>
                  <div className="text-center">
                    <div
                      className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-2 w-14 border"
                      style={{ borderColor: `${themeColor}30` }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {seconds}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Secs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <ParallaxSection className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs Navigation */}
          <div className="mb-12 border-b border-white/10">
            <div className="flex overflow-x-auto scrollbar-hide space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-1 text-sm font-medium transition-colors relative ${activeTab === tab.id ? "" : "text-gray-400 hover:text-white"
                    }`}
                  style={{
                    color: activeTab === tab.id ? themeColor : undefined,
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: themeColor }}
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[50vh]">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-white">
                      Tournament Overview
                    </h2>
                    <p className="text-gray-300 mb-4">
                      Join the ultimate {tournament.title}, a collaboration
                      between TGG and Nexus Esports. Compete against the best
                      players, showcase your skills, and battle for glory and
                      prizes.
                    </p>
                    <p className="text-gray-300">
                      The tournament will take place this Saturday at 10:00 AM,
                      featuring intense
                      {tournament.game === "valorant"
                        ? " 5v5 tactical gameplay in a double elimination bracket format. Teams will compete in best-of-3 matches to determine the champions."
                        : " battles and strategic gameplay. Teams will be scored based on their performance, with the top 10 scoring teams advancing to further matches."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      Tournament Format
                    </h3>
                    <ul className="space-y-3">
                      {tournament.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">{rule}</p>
                            <p className="text-gray-400 text-sm">
                              {index === 0 &&
                                tournament.game === "valorant" &&
                                "Standard competitive 5v5 team format with agent selection."}
                              {index === 0 &&
                                tournament.game === "bgmi" &&
                                "Teams will compete in a series of matches and will be scored based on their performance."}
                              {index === 1 &&
                                tournament.game === "valorant" &&
                                "Teams get a second chance after their first loss in the tournament."}
                              {index === 1 &&
                                tournament.game === "bgmi" &&
                                "The top 10 scoring teams, excluding those eliminated, will move on to further matches."}
                              {index === 2 &&
                                tournament.game === "valorant" &&
                                "Each matchup will be decided by a best-of-3 series."}
                              {index === 2 &&
                                tournament.game === "bgmi" &&
                                "The team with the highest overall score from the 3 matches on Saturday will move forward."}
                              {index === 3 &&
                                tournament.game === "valorant" &&
                                "Maps will be selected through a veto process before each match."}
                              {index === 3 &&
                                tournament.game === "bgmi" &&
                                "If there are multiple teams with equal scores, the highest place points will decide the winner."}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Calendar
                        className="mr-2 w-5 h-5"
                        style={{ color: themeColor }}
                      />
                      Tournament Details
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white font-medium">
                          {formatDate(tournamentDate.current)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white font-medium">10:00 AM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Format:</span>
                        <span className="text-white font-medium">{format}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Team Size:</span>
                        <span className="text-white font-medium">
                          {teamSize}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Platform:</span>
                        <span className="text-white font-medium">
                          {platform}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <DollarSign
                        className="mr-2 w-5 h-5"
                        style={{ color: themeColor }}
                      />
                      Registration Fees
                    </h3>
                    <Link href="mailto:Ekyam.vemanothsav@gmail.com">
                      Email Us
                    </Link>

                    <ul className="space-y-4">
                      {tournament.game === "valorant" ? (
                        <li className="flex justify-between">
                          <span className="text-gray-400">
                            Team Registration:
                          </span>
                          <span className="text-white font-medium">
                            {registrationFee}
                          </span>
                        </li>
                      ) : (
                        <>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Individual:</span>
                            <span className="text-white font-medium">₹250</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">
                              Team (1-4 players):
                            </span>
                            <span className="text-white font-medium">
                              {registrationFee}
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <Link
                    href="#registration"
                    onClick={() => setActiveTab("registration")}
                    className="block w-full text-white py-3 rounded-sm text-center font-medium transition-colors"
                    style={{ backgroundColor: themeColor }}
                  >
                    Register Now
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Rules Tab */}
            {activeTab === "rules" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Tournament Rules
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Shield
                          className="mr-2 w-5 h-5"
                          style={{ color: themeColor }}
                        />
                        General Rules
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <AlertTriangle
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              {tournament.game === "valorant"
                                ? "Anti-Cheat Required"
                                : "No Third-Party Apps"}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {tournament.game === "valorant"
                                ? "All players must have Riot Vanguard anti-cheat installed and running."
                                : "The use of any external apps or cheats will result in the disqualification of the entire team. "}
                              <span className="font-bold">
                                {tournament.game !== "valorant"
                                  ? "iPad is not allowed"
                                  : ""}{" "}
                              </span>
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertTriangle
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              {tournament.game === "valorant"
                                ? "Standard Competitive Rules"
                                : "Device Restrictions"}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {tournament.game === "valorant"
                                ? "Standard competitive rules apply as per Valorant's competitive mode."
                                : "Only mobile devices are allowed. Emulator players are not permitted."}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertTriangle
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">Fair Play</p>
                            <p className="text-gray-400 text-sm">
                              All participants must adhere to fair play
                              principles.
                              {tournament.game === "bgmi" &&
                                " Any form of teaming with other squads is prohibited."}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertTriangle
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Punctuality
                            </p>
                            <p className="text-gray-400 text-sm">
                              {tournament.game === "valorant"
                                ? "Teams must be ready 15 minutes before their scheduled match time. Late arrivals may result in forfeiture."
                                : "Players must be ready 15 minutes before their scheduled match time. Late arrivals may result in disqualification."}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertTriangle
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">Student ID</p>
                            <p className="text-gray-400 text-sm">
                              ID is mandatory
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Users
                          className="mr-2 w-5 h-5"
                          style={{ color: themeColor }}
                        />
                        Team Rules
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Team Composition
                            </p>
                            <p className="text-gray-400 text-sm">
                              {tournament.game === "valorant"
                                ? "Teams must have exactly 5 players. One substitute player is allowed but must be registered before the tournament."
                                : "Teams can have 1 to 4 players. Individual registrants will be placed in random teams."}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Substitutions
                            </p>
                            <p className="text-gray-400 text-sm">
                              {tournament.game === "valorant"
                                ? "Substitutions can only be made between matches, not during a match."
                                : "No substitutions are allowed once the tournament has begun."}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Team Captain
                            </p>
                            <p className="text-gray-400 text-sm">
                              Each team must designate a captain who will be
                              responsible for communication with tournament
                              officials.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Trophy
                          className="mr-2 w-5 h-5"
                          style={{ color: themeColor }}
                        />
                        {tournament.game === "valorant"
                          ? "Match Rules"
                          : "Scoring System"}
                      </h3>
                      <ul className="space-y-4">
                        {tournament.game === "valorant" ? (
                          <>
                            <li className="flex items-start gap-3">
                              <CheckCircle2
                                className="mt-1 w-5 h-5 flex-shrink-0"
                                style={{ color: themeColor }}
                              />
                              <div>
                                <p className="text-white font-medium">
                                  Map Selection
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Maps will be selected through a veto process.
                                  The higher seeded team gets first ban.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2
                                className="mt-1 w-5 h-5 flex-shrink-0"
                                style={{ color: themeColor }}
                              />
                              <div>
                                <p className="text-white font-medium">
                                  Technical Pauses
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Each team is allowed up to 10 minutes of
                                  technical pause time per match.
                                </p>
                              </div>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start gap-3">
                              <CheckCircle2
                                className="mt-1 w-5 h-5 flex-shrink-0"
                                style={{ color: themeColor }}
                              />
                              <div>
                                <p className="text-white font-medium">
                                  Placement Points
                                </p>
                                <p className="text-gray-400 text-sm">
                                  1st: 15 pts, 2nd: 12 pts, 3rd: 10 pts, 4th: 8
                                  pts, 5th: 6 pts, 6-10th: 4 pts, 11-15th: 2
                                  pts, 16-20th: 1 pt
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2
                                className="mt-1 w-5 h-5 flex-shrink-0"
                                style={{ color: themeColor }}
                              />
                              <div>
                                <p className="text-white font-medium">
                                  Kill Points
                                </p>
                                <p className="text-gray-400 text-sm">
                                  1 point per elimination
                                </p>
                              </div>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Prizes Tab */}
            {activeTab === "prizes" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Prize Pool
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg mb-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Trophy
                          className="mr-2 w-5 h-5"
                          style={{ color: themeColor }}
                        />
                        Cash Prizes
                      </h3>
                      <p className="text-gray-300 mb-6">
                        {tournament.game === "valorant"
                          ? "A total prize pool of ₹50,000 will be distributed among the top teams. Cash prizes will be distributed among team members equally."
                          : "Guaranteed minimum prize of ₹7,500 for the winning team. The prize may increase based on available funds. Cash prizes will be distributed among team members."}
                      </p>

                      <div className="space-y-4">
                        {tournament.prizes.map((prize, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-3 border-b border-white/10"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index === 0
                                  ? `bg-[${themeColor}]/20`
                                  : index === 1
                                    ? "bg-gray-700/20"
                                    : "bg-[#CD7F32]/20"
                                  }`}
                                style={{
                                  backgroundColor:
                                    index === 0
                                      ? `${themeColor}20`
                                      : index === 1
                                        ? "rgba(107, 114, 128, 0.2)"
                                        : "rgba(205, 127, 50, 0.2)",
                                }}
                              >
                                <span
                                  className={`font-bold ${index === 0
                                    ? ""
                                    : index === 1
                                      ? "text-gray-300"
                                      : "text-[#CD7F32]"
                                    }`}
                                  style={{
                                    color: index === 0 ? themeColor : undefined,
                                  }}
                                >
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-white font-medium">
                                {prize.position}
                              </span>
                            </div>
                            <span
                              className={`font-bold ${index === 0 ? "" : "text-gray-300"
                                }`}
                              style={{
                                color: index === 0 ? themeColor : undefined,
                              }}
                            >
                              {prize.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="backdrop-blur-sm border p-6 rounded-lg"
                      style={{
                        backgroundColor: `${themeColor}05`,
                        borderColor: `${themeColor}20`,
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">MVP Award</h3>
                      <p className="text-gray-300">
                        {tournament.game === "valorant"
                          ? "The most valuable player of the tournament will receive a special MVP award and gaming peripherals from our sponsors."
                          : "The player with the highest number of eliminations throughout the tournament will receive a special MVP award."}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-lg blur-xl"
                      style={{ backgroundColor: `${themeColor}05` }}
                    />
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 p-6 rounded-lg h-full">
                      <h3 className="text-xl font-bold mb-4">
                        Prize Distribution
                      </h3>
                      <p className="text-gray-300 mb-6">
                        {tournament.game === "valorant"
                          ? "Prize money will be distributed equally among all team members unless specified otherwise by the team captain."
                          : "For team registrations, the prize money will be distributed equally among all team members unless specified otherwise by the team captain."}
                      </p>

                      <div className="bg-black/30 p-4 rounded-md border border-white/10">
                        <h4
                          className="text-lg font-medium mb-2"
                          style={{ color: themeColor }}
                        >
                          Note:
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {tournament.game === "valorant"
                            ? "All participants will receive digital certificates and exclusive in-game items from our sponsors."
                            : "The final prize pool may increase based on the number of registrations. Any updates to the prize pool will be announced before the tournament begins."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Registration Tab */}
            {activeTab === "registration" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Registration
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg mb-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                        <Users
                          className="mr-2 w-5 h-5"
                          style={{ color: themeColor }}
                        />
                        {tournament.game === "valorant"
                          ? "Registration Details"
                          : "Registration Options"}
                      </h3>
                      <p className="text-gray-300 mb-6">
                        {tournament.game === "valorant"
                          ? "Register your 5-player team for the Valorant Championship. Each team must have exactly 5 players with an optional substitute."
                          : "Choose between individual registration or team registration. Individual players will be assigned to random teams."}
                      </p>

                      <div className="space-y-4">
                        {tournament.game === "valorant" ? (
                          <div className="flex items-center justify-between py-3 border-b border-white/10">
                            <span className="text-white font-medium">
                              Team Registration
                            </span>
                            <span
                              className="font-bold"
                              style={{ color: themeColor }}
                            >
                              ₹1,000
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                              <span className="text-white font-medium">
                                Individual Registration
                              </span>
                              <span
                                className="font-bold"
                                style={{ color: themeColor }}
                              >
                                ₹725
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                              <span className="text-white font-medium">
                                Team Registration (1-4 players)
                              </span>
                              <span
                                className="font-bold"
                                style={{ color: themeColor }}
                              >
                                ₹760
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      className="backdrop-blur-sm border p-6 rounded-lg"
                      style={{
                        backgroundColor: `${themeColor}05`,
                        borderColor: `${themeColor}20`,
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">
                        Important Dates
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Calendar
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Registration Deadline
                            </p>
                            <p className="text-gray-400 text-sm">
                              Friday, 6:00 PM (One day before tournament)
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calendar
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Tournament Date
                            </p>
                            <p className="text-gray-400 text-sm">
                              {formatDate(tournamentDate.current)} at 10:00 AM
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock
                            className="mt-1 w-5 h-5 flex-shrink-0"
                            style={{ color: themeColor }}
                          />
                          <div>
                            <p className="text-white font-medium">
                              Check-in Time
                            </p>
                            <p className="text-gray-400 text-sm">
                              9:30 AM (30 minutes before start)
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-12 bg-gradient-to-br from-transparent  via-red-700 to-purple-700 ">
                    <h1 className="text-4xl font-bold  text-center px-10">
                      We ask for you to join for this grandeur this sem.
                    </h1>
                    <Link
                      href={
                        tournament.game === "valorant"
                          ? "https://forms.gle/Rsyrr3d4sbdhzJ8v7"
                          : "https://docs.google.com/forms/d/e/1FAIpQLSdDhHVqH1ZY37jZa9gn1eeHziX5bZoKlhLHTfndyDTl7wbKyA/viewform?usp=sharing"
                      }
                    >
                      <Button>Register now</Button>
                    </Link>
                    <Button onClick={handleDownload}>
                      Download Poster <DownloadIcon />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Section */}
      <ParallaxSection className="py-16 px-6 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="absolute inset-0 blur-3xl opacity-50"
              style={{
                background: `linear-gradient(to right, ${themeColor}20, ${themeColor}05)`,
              }}
            />
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact our tournament organizers for any questions or
                assistance you may need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:Ekyam.vemanothsav@gmail.com"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-sm transition-colors"
                >
                  Email Us
                </Link>
                <Button
                  disabled
                  className="inline-flex items-center justify-center text-white px-6 py-3 rounded-sm transition-colors"
                  style={{
                    backgroundColor: themeColor,
                  }}
                >
                  Join Discord
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </div>
  );
}
