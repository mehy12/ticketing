import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "Official rules and guidelines for all Vemanothsav 2026 participants. Read the event rules, code of conduct, and important policies before attending.",
  openGraph: {
    title: "Rules | Vemanothsav 2026",
    description:
      "Official rules, guidelines, and code of conduct for Vemanothsav 2026 participants.",
    url: "https://vemanothsav.in/rules",
  },
};

export default function SponsorsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full flex flex-col items-center   bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800  to-[#1c1c1d] "
      >
        <Navbar />
        <div className="bg-transparent/55 max-w-2xl w-full p-6 rounded-lg shadow-lg ">
          <h1 className="text-3xl font-bold text-center text-gray-200 mb-6 flex items-center justify-center gap-2">
            <CheckCircle className="text-green-600" /> Event Rules
          </h1>
          <ul className="space-y-4 text-gray-100">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>College ID Requirement:</strong> A valid college ID is
              mandatory for all participants.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>Judges&apos; Decision:</strong> The verdict of the judges
              will be final and binding.
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="text-red-500" />{" "}
              <strong>Registration Policy:</strong> The registration fee is
              non-refundable.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>Multiple Teams:</strong> Multiple teams from the same
              college are accepted.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>Event Guidelines:</strong> Detailed instructions regarding
              the event will be provided by the respective event coordinators.
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="text-red-500" />{" "}
              <strong>Restricted Items:</strong> No liquids or water bottles are
              allowed inside the premises.
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-500" />{" "}
              <strong>Personal Belongings:</strong> The college holds no
              responsibility for any loss of personal belongings.
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="text-red-500" />{" "}
              <strong>Prohibited Substances:</strong> The use of tobacco,
              alcohol, or narcotic substances is strictly forbidden.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>Code of Conduct:</strong> Participants must maintain
              discipline, as their behavior reflects the college&apos;s
              reputation.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>Respect & Sensitivity:</strong> Avoid offensive comments
              regarding revered personalities, national or religious sentiments,
              gender, caste, race, etc.
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="text-red-500" />{" "}
              <strong>Rule Compliance:</strong> Violating any of the rules will
              lead to disqualification and expulsion.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500" />{" "}
              <strong>Cleanliness & Waste Disposal:</strong> Keep the premises
              clean and dispose of waste properly.
            </li>
          </ul>
          <p className="mt-6 text-white font-semibold text-center border-t pt-4">
            All participants are expected to adhere to these guidelines
            strictly.
          </p>
        </div>
      </div>
    </div>
  );
}
