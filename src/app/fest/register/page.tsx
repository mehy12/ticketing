import type { Metadata } from "next";
import RegistrationForm from "@/components/fest/registration-form";

export const metadata: Metadata = {
    title: "Internal Registration | Vemanothsav 2026",
    description:
        "Register for Vemanothsav 2026 and get your entry QR code for seamless check-in.",
};

export default function FestRegisterPage() {
    return (
        <div className="relative min-h-screen">
            {/* Background — matches the main site */}
            <div className="pointer-events-none fixed inset-0">
                <div
                    style={{
                        backgroundImage: "url('/background.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800 to-[#1c1c1d]"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-20">
                <RegistrationForm />
            </div>
        </div>
    );
}
