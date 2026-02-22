import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8 text-white bg-gradient-to-b from-transparent via-transparent/70 to-transparent/90">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-yellow-400">
            About <span className="text-glow text-purple-400">Vemanotsav</span>{" "}
            & <span className="text-glow text-blue-400">Ikyam</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
            <strong className="text-yellow-300">Vemanotsav</strong> is the{" "}
            <span className="text-glow text-cyan-300">
              annual cultural extravaganza
            </span>{" "}
            of{" "}
            <span className="text-glow text-green-300">
              Vemana Institute of Technology
            </span>
            , celebrating creativity, talent, and diversity. It brings together
            students, performers, and artists to compete, collaborate, and
            experience the spirit of festivity.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
            <strong className="text-yellow-300">Ikyam</strong> is the{" "}
            <span className="text-glow text-indigo-300">
              flagship cultural event
            </span>{" "}
            of Vemanotsav, featuring an electrifying mix of music, dance,
            theater, and fashion.{" "}
            <span className="text-glow text-pink-300">Ikyam 2026</span> marks
            25 years of grandeur, with a special collaboration with{" "}
            <span className="text-glow text-red-400">Bigg Boss Kannada</span> to
            elevate the entertainment quotient.
          </p>
        </div>

        {/* Event Rules & Guidelines */}
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Rules & Guidelines
          </h2>
          <ul className="text-lg text-gray-300 list-disc list-inside">
            <li>
              Participants must register before the deadline to be eligible for
              competitions.
            </li>
            <li>
              Each event has specific rules and time limits. Ensure compliance
              to avoid disqualification.
            </li>
            <li>
              Any form of misconduct or violation of decorum will result in
              immediate disqualification.
            </li>
            <li>
              Participants must bring their own props, costumes, and instruments
              as required.
            </li>
            <li>
              The decisions of judges and event coordinators will be final and
              binding.
            </li>
          </ul>
        </div>

        {/* How to Stay Connected */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-400">Stay Connected</h2>
          <p className="text-lg text-gray-300 mt-4">
            Follow us on social media for updates, behind-the-scenes content,
            and important announcements.
          </p>
          <p className="text-lg text-gray-300 mt-2">
            For inquiries, reach out to us at:
            <Link
              href="mailto:Ikyam.vemanothsav@gmail.com"
              className="text-yellow-300 underline"
            >
              {" "}
              Ikyam.vemanothsav@gmail.com
            </Link>
          </p>
          <p className="text-lg text-gray-300 mt-2">
            Visit our college website:
            <Link
              href="https://vemanait.edu.in/"
              className="text-yellow-400 underline"
            >
              {" "}
              Vemana Institute of Technology
            </Link>
          </p>
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-4">
            List of Events
          </h2>
          <div className="flex w-full justify-center items-center mt-10">
            <table className="w-full max-w-[700px] text-left border-collapse text-gray-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-md">
              <thead>
                <tr className="border-b border-yellow-500 text-yellow-300">
                  <th className="p-3">Event Name</th>
                  <th className="p-3">Category</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Solo Singing", "Music"],
                  ["Group Singing", "Music"],
                  ["Solo Dance", "Dance"],
                  ["Duo Dance", "Dance"],
                  ["Group Dance", "Dance"],
                  ["Mime", "Theater"],
                  ["Mad Ads", "Drama"],
                  ["Ad Making", "Drama"],
                  ["Photography", "Creative Arts"],
                  ["Short Film", "Film & Media"],
                  ["Treasure Hunt", "Adventure"],
                  ["Fashion Show", "Fashion"],
                ].map(([event, category], index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="p-3 text-yellow-200">{event}</td>
                    <td className="p-3 text-yellow-300">{category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
