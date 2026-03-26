"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import QRDisplay from "./qr-display";
import Image from "next/image";

const DEPARTMENTS = [
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Data Science",
    "Artificial Intelligence & Machine Learning",
    "Cyber Security",
    "Information Science & Engineering",
];

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        usn: "",
        department: "",
        email: "",
        phone: "",
    });
    const [idCardUrl, setIdCardUrl] = useState<string | null>(null);
    const [idCardFile, setIdCardFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [registeredId, setRegisteredId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be under 5MB");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            setIdCardFile(file);
            setIdCardUrl(URL.createObjectURL(file));
            setUploading(false);
        } catch {
            setError("Failed to process image. Please try again.");
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            let secureUrl = null;

            if (idCardFile) {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dmitw9qcc";
                const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "fest_id_cards";

                const formData = new FormData();
                formData.append("file", idCardFile);
                formData.append("upload_preset", uploadPreset);
                formData.append("folder", "fest2k26_id_cards");

                const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData,
                });

                if (!cloudRes.ok) {
                    const errorData = await cloudRes.json();
                    console.error("Cloudinary Error:", errorData);
                    throw new Error(`Image upload failed: ${errorData.error?.message || "Please check your network connection"}`);
                }

                const cloudData = await cloudRes.json();
                secureUrl = cloudData.secure_url;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, idCardUrl: secureUrl }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Registration failed");
            }

            const { id } = await res.json();
            setRegisteredId(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    // ─── Success State: Show QR ─────────────────────────────────────────────
    if (registeredId) {
        return (
            <div className="mx-auto max-w-lg text-center">
                <div className="mb-6">
                    <div className="mb-3 text-5xl">🎉</div>
                    <h2 className="text-2xl font-bold text-white">
                        Registration Complete!
                    </h2>
                    <p className="mt-2 text-white/60">
                        Welcome, <strong className="text-white">{formData.name}</strong>!
                        Here&apos;s your entry QR code.
                    </p>
                </div>

                <QRDisplay
                    participantId={registeredId}
                    participantName={formData.name}
                />

                <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-400">
                        📌 <strong>Save this QR code!</strong> You&apos;ll need it at the
                        entry gate for verification.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setRegisteredId(null);
                        setFormData({ name: "", usn: "", department: "", email: "", phone: "" });
                        setIdCardUrl(null);
                    }}
                    className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                    Register another student →
                </button>
            </div>
        );
    }

    // ─── Registration Form ──────────────────────────────────────────────────
    return (
        <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">
                    Internal Registration
                </h1>
                <p className="mt-2 text-white/60">
                    Register for Vemanothsav 2026 and get your entry QR code
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
                    {/* Name */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                        />
                    </div>

                    {/* USN */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                            USN
                        </label>
                        <input
                            type="text"
                            name="usn"
                            value={formData.usn}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 1VE22CS001"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white uppercase placeholder:text-white/30 placeholder:normal-case outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                            Department
                        </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all appearance-none"
                        >
                            <option value="" disabled className="bg-[#1c1c1d] text-white/50">
                                Select department
                            </option>
                            {DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept} className="bg-[#1c1c1d] text-white">
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="10-digit mobile number"
                            pattern="[0-9]{10}"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                        />
                    </div>

                    {/* ID Card Upload */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                            ID Card Photo
                        </label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        {idCardUrl ? (
                            <div className="relative">
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10">
                                    <Image
                                        src={idCardUrl}
                                        alt="ID Card"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 512px) 100vw, 512px"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIdCardUrl(null);
                                        if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-xs text-white hover:bg-red-400 transition-colors"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="w-full rounded-lg border-2 border-dashed border-white/10 bg-white/5 py-8 text-center hover:border-yellow-500/30 hover:bg-white/10 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-wait"
                            >
                                {uploading ? (
                                    <>
                                        <div className="text-3xl mb-2">⏳</div>
                                        <p className="text-sm text-white/50">Uploading...</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-3xl mb-2">📷</div>
                                        <p className="text-sm text-white/50 group-hover:text-white/70">
                                            Click to upload your ID card
                                        </p>
                                        <p className="mt-1 text-xs text-white/30">
                                            JPG, PNG up to 5MB
                                        </p>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={submitting || uploading}
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all disabled:opacity-50"
                >
                    {submitting ? (
                        <span className="flex items-center gap-2">
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                <path d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" fill="currentColor" className="opacity-75" />
                            </svg>
                            Registering...
                        </span>
                    ) : (
                        "Register & Get QR Code"
                    )}
                </Button>
            </form>
        </div>
    );
}
