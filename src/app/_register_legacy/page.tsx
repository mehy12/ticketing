"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { evento } from "@/exports/export";
import { submitRegistration } from "./actions";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { signIn, useSession } from "@/app/lib/auth-client";
import { useRegistrationStore } from "@/store/registration-store";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Check,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    X,
    Upload,
    ImageIcon,
    QrCode,
    CheckCircle2,
    User,
    Hash,
    LogIn,
    Loader2,
    Mail,
    Phone,
    Building2,
    AlertCircle,
} from "lucide-react";

// ── Lazy-load the heavy 3-D blob (SSR off) ───────────────────────────────────
const Blob = dynamic(
    () => import("@/components/ui/blob").then((m) => m.Blob),
    { ssr: false }
);

// ── Zod schema ────────────────────────────────────────────────────────────────
const personalInfoSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be exactly 10 digits")
        .max(10, "Phone number must be exactly 10 digits (you entered too many)"),
    college: z
        .string()
        .min(1, "College name is required")
        .min(2, "College name must be at least 2 characters"),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

// ── Helpers ───────────────────────────────────────────────────────────────────
const cardStyle =
    "rounded-[28px] bg-neutral-900 border border-neutral-800 shadow-2xl shadow-black/60";

// ─────────────────────────────────────────────────────────────────────────────
export default function RegisterPage() {
    const { data: session, isPending: sessionLoading } = useSession();
    const [signingIn, setSigningIn] = useState(false);

    const {
        step, setStep,
        formData, setFormData,
        selectedEvents, toggleEvent,
        utr, setUtr,
        submitted, markSubmitted,
        clearCart, resetRegistration,
    } = useRegistrationStore();

    // ── React-Hook-Form for Step 1 ──────────────────────────────────────────
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields, dirtyFields },
        setValue,
        trigger,
        watch,
        reset,
    } = useForm<PersonalInfoData>({
        resolver: zodResolver(personalInfoSchema),
        mode: "onChange",
        defaultValues: {
            fullName: formData.fullName || "",
            email: formData.email || "",
            phone: formData.phone || "",
            college: formData.college || "",
        },
    });

    // Sync session data into form
    useEffect(() => {
        if (session?.user) {
            const name = session.user.name || "";
            const email = session.user.email || "";
            setValue("fullName", name, { shouldValidate: true });
            setValue("email", email, { shouldValidate: true });
            setFormData({ fullName: name, email });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user?.id]);

    // Sync form values to zustand store
    const watchedValues = watch();
    useEffect(() => {
        setFormData({
            fullName: watchedValues.fullName,
            email: watchedValues.email,
            phone: watchedValues.phone,
            college: watchedValues.college,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedValues.fullName, watchedValues.email, watchedValues.phone, watchedValues.college]);

    const handleGoogleSignIn = async () => {
        setSigningIn(true);
        try {
            await signIn.social({ provider: "google", callbackURL: "/register" });
        } catch {
            setSigningIn(false);
        }
    };

    // ── Local state ─────────────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState("All");
    const [showMobileSummary, setShowMobileSummary] = useState(false);
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [compressedBase64, setCompressedBase64] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Derived data ─────────────────────────────────────────────────────────
    const categories = useMemo(() => {
        const cats = Array.from(new Set(evento.map((e) => e.category)));
        return ["All", ...cats];
    }, []);

    const filteredEvents = useMemo(() =>
        activeCategory === "All" ? evento : evento.filter((e) => e.category === activeCategory),
        [activeCategory]
    );

    const selectedEventObjects = useMemo(() =>
        evento.filter((e) => selectedEvents.includes(e.slug)),
        [selectedEvents]
    );

    const totalPrice = useMemo(() =>
        selectedEventObjects.reduce((sum, e) => sum + e.price, 0),
        [selectedEventObjects]
    );

    // ── Step 1 submit ────────────────────────────────────────────────────────
    const onStep1Submit = (data: PersonalInfoData) => {
        setFormData(data);
        setStep(2);
    };

    const handleSubmitRegistration = () => {
        if (selectedEvents.length > 0) {
            setShowMobileSummary(false);
            setStep(3);
        }
    };

    // ── Image handling ───────────────────────────────────────────────────────
    const compressImage = (file: File): Promise<string> =>
        new Promise((resolve) => {
            const img = document.createElement("img");
            const canvas = document.createElement("canvas");
            const reader = new FileReader();
            reader.onload = (e) => {
                img.onload = () => {
                    const MAX = 1200;
                    let { width, height } = img;
                    if (width > MAX || height > MAX) {
                        const ratio = Math.min(MAX / width, MAX / height);
                        width = Math.round(width * ratio);
                        height = Math.round(height * ratio);
                    }
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL("image/jpeg", 0.7));
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });

    const handleFileChange = async (file: File | null) => {
        if (file && file.type.startsWith("image/")) {
            setScreenshot(file);
            const reader = new FileReader();
            reader.onload = (e) => setScreenshotPreview(e.target?.result as string);
            reader.readAsDataURL(file);
            setCompressedBase64(await compressImage(file));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files?.[0] || null);
    };

    const handleFinalSubmit = async () => {
        if (screenshot && utr.trim()) {
            setSubmitting(true);
            setSubmitError(null);
            try {
                const result = await submitRegistration({
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    college: formData.college,
                    events: selectedEventObjects.map((e) => `${e.name} (₹${e.price})`).join(", "),
                    totalAmount: totalPrice,
                    screenshotBase64: compressedBase64,
                    utr: utr.trim(),
                });
                if (result.success) markSubmitted();
                else setSubmitError(result.error || "Something went wrong. Please try again.");
            } catch {
                setSubmitError("Network error. Please check your connection and try again.");
            } finally {
                setSubmitting(false);
            }
        }
    };

    // ── Form field config ────────────────────────────────────────────────────
    const formFields = [
        {
            name: "fullName" as const,
            label: "Full Name",
            type: "text",
            placeholder: "Enter your full name",
            icon: <User className="h-4 w-4" />,
        },
        {
            name: "email" as const,
            label: "Email Address",
            type: "email",
            placeholder: "your.email@example.com",
            icon: <Mail className="h-4 w-4" />,
        },
        {
            name: "phone" as const,
            label: "Phone (WhatsApp)",
            type: "tel",
            placeholder: "10-digit WhatsApp number",
            icon: <Phone className="h-4 w-4" />,
        },
        {
            name: "college" as const,
            label: "College Name",
            type: "text",
            placeholder: "Enter your college name",
            icon: <Building2 className="h-4 w-4" />,
        },
    ];

    // ── Shared step-indicator ────────────────────────────────────────────────
    const StepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-6">
            {[
                { num: 1, label: "Info" },
                { num: 2, label: "Events" },
                { num: 3, label: "Pay" },
            ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-500 rounded-full ${step >= s.num ? "bg-white text-black shadow-lg" : "bg-neutral-800 text-neutral-500 border border-neutral-700"}`}>
                            {step > s.num ? <Check className="h-3.5 w-3.5" /> : s.num}
                        </div>
                        <span className={`text-[11px] font-medium hidden sm:block ${step >= s.num ? "text-white" : "text-neutral-600"}`}>{s.label}</span>
                    </div>
                    {i < 2 && <div className={`w-6 sm:w-10 h-px transition-all duration-500 ${step >= s.num + 1 ? "bg-white" : "bg-neutral-800"}`} />}
                </div>
            ))}
        </div>
    );

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0d0a00]">

            {/* ── Full-screen animated blob background ── */}
            <div className="absolute inset-0 z-0">
                <Blob
                    color="#c8890a"
                    followMouse
                    fov={15}
                    environmentIntensity={0.4}
                    className="w-full h-full"
                />
                {/* Dark vignette overlay so the form is readable */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70" />
            </div>

            {/* ── Navbar ── */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                    {/* ══ LEFT — Form Panel ══════════════════════════════════════════ */}
                    <div className="w-full lg:w-[480px] shrink-0">

                        {/* Loading */}
                        {sessionLoading ? (
                            <div className={`${cardStyle} p-10 flex items-center justify-center`}>
                                <Loader2 className="h-8 w-8 text-white animate-spin" />
                            </div>

                        /* Not signed in */
                        ) : !session ? (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`${cardStyle} p-8 sm:p-10 text-center`}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto mb-5"
                                >
                                    <LogIn className="h-7 w-7 text-white" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-white mb-2">Sign in to Register</h2>
                                <p className="text-neutral-500 text-sm mb-7 max-w-xs mx-auto">
                                    Sign in with your Google account to register for <span className="text-white font-semibold">Ikyam 2026</span> events
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleGoogleSignIn}
                                    disabled={signingIn}
                                    className="w-full py-3 px-6 rounded-xl bg-white text-gray-800 font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-lg disabled:opacity-60"
                                >
                                    {signingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    )}
                                    {signingIn ? "Signing in…" : "Continue with Google"}
                                </motion.button>
                            </motion.div>

                        /* Signed in — multi-step form */
                        ) : (
                            <div className={`${cardStyle} overflow-hidden`}>
                                {/* Card header */}
                                <div className="px-6 pt-6 pb-0">
                                    <StepIndicator />
                                </div>

                                <AnimatePresence mode="wait">
                                    {/* ── STEP 1: Personal info ── */}
                                    {step === 1 && (
                                        <motion.div
                                            key="s1"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="p-6"
                                        >
                                            <h2 className="text-xl font-bold text-white mb-1">Your Information</h2>
                                            <p className="text-neutral-500 text-xs mb-5">All fields are required</p>

                                            <form onSubmit={handleSubmit(onStep1Submit)} className="space-y-4">
                                                {formFields.map((field, idx) => {
                                                    const fieldError = errors[field.name];
                                                    const isTouched = touchedFields[field.name] || dirtyFields[field.name];
                                                    const hasValue = !!watchedValues[field.name];
                                                    const isFieldValid = isTouched && hasValue && !fieldError;

                                                    return (
                                                        <motion.div
                                                            key={field.name}
                                                            initial={{ opacity: 0, y: 12 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.05 + idx * 0.07 }}
                                                        >
                                                            <label htmlFor={field.name} className="text-xs font-medium text-neutral-400 mb-1.5 block">
                                                                {field.label}
                                                            </label>
                                                            <div className="relative">
                                                                {/* Icon */}
                                                                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                                                                    fieldError && isTouched
                                                                        ? "text-red-400"
                                                                        : isFieldValid
                                                                        ? "text-emerald-400"
                                                                        : "text-neutral-600"
                                                                }`}>
                                                                    {field.icon}
                                                                </span>

                                                                <input
                                                                    id={field.name}
                                                                    type={field.type}
                                                                    placeholder={field.placeholder}
                                                                    {...register(field.name)}
                                                                    className={`w-full bg-neutral-800/60 border rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-0 ${
                                                                        fieldError && isTouched
                                                                            ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/70"
                                                                            : isFieldValid
                                                                            ? "border-emerald-500/30 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                                                                            : "border-neutral-700 focus:ring-white/10 focus:border-neutral-500"
                                                                    }`}
                                                                />

                                                                {/* Status icon on the right */}
                                                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                                                    {fieldError && isTouched && (
                                                                        <AlertCircle className="h-4 w-4 text-red-400" />
                                                                    )}
                                                                    {isFieldValid && (
                                                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                                    )}
                                                                </span>
                                                            </div>

                                                            {/* Error message */}
                                                            <AnimatePresence>
                                                                {fieldError && isTouched && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, height: 0, y: -4 }}
                                                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                                                        exit={{ opacity: 0, height: 0, y: -4 }}
                                                                        transition={{ duration: 0.2 }}
                                                                        className="flex items-center gap-1.5 mt-1.5 pl-1"
                                                                    >
                                                                        <p className="text-red-400 text-xs">
                                                                            {fieldError.message}
                                                                        </p>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>

                                                            {/* Phone helper text */}
                                                            {field.name === "phone" && !fieldError && (
                                                                <p className="text-neutral-600 text-[10px] mt-1 pl-1">
                                                                    Enter your 10-digit Indian mobile number
                                                                </p>
                                                            )}
                                                        </motion.div>
                                                    );
                                                })}

                                                <motion.button
                                                    type="submit"
                                                    whileHover={isValid ? { scale: 1.02, boxShadow: "0 0 24px rgba(255,255,255,0.15)" } : {}}
                                                    whileTap={isValid ? { scale: 0.97 } : {}}
                                                    disabled={!isValid}
                                                    className={`w-full mt-2 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300 ${
                                                        isValid
                                                            ? "bg-white text-black shadow-lg hover:shadow-white/20"
                                                            : "bg-neutral-800 text-neutral-600 cursor-not-allowed border border-neutral-700"
                                                    }`}
                                                >
                                                    Continue to Events <ChevronRight className="h-4 w-4" />
                                                </motion.button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* ── STEP 2: Event selection ── */}
                                    {step === 2 && (
                                        <motion.div
                                            key="s2"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="p-6"
                                        >
                                            {/* Back + category tabs */}
                                            <div className="flex flex-col gap-3 mb-4">
                                                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors text-xs w-fit">
                                                    <ChevronLeft className="h-4 w-4" /> Back
                                                </button>
                                                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                                                    {categories.map((cat) => (
                                                        <button
                                                            key={cat}
                                                            onClick={() => setActiveCategory(cat)}
                                                            className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded-full transition-all duration-200 border ${
                                                                activeCategory === cat
                                                                    ? "bg-white/10 border-white/30 text-white"
                                                                    : "border-neutral-700 text-neutral-500 hover:text-white hover:border-neutral-600"
                                                            }`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Events grid */}
                                            <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1 mb-4 scrollbar-hide">
                                                <AnimatePresence>
                                                    {filteredEvents.map((event, i) => {
                                                        const isSelected = selectedEvents.includes(event.slug);
                                                        return (
                                                            <motion.div
                                                                key={event.slug}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.9 }}
                                                                transition={{ delay: i * 0.03 }}
                                                                onClick={() => toggleEvent(event.slug)}
                                                                className={`relative cursor-pointer rounded-[18px] overflow-hidden aspect-[3/4] border transition-all duration-300 ${
                                                                    isSelected ? "border-white/50 shadow-lg shadow-white/10" : "border-neutral-800 hover:border-neutral-700"
                                                                }`}
                                                            >
                                                                <Image src={event.image || "/placeholder.svg"} fill alt={event.name} className="object-cover object-top" />
                                                                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${event.gradient}`} />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                                {isSelected && (
                                                                    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                                                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                                                                            <Check className="h-4 w-4 text-black" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                                                                    <p className="text-white font-semibold text-xs leading-tight">{event.name}</p>
                                                                    <p className="text-neutral-400 text-xs font-bold mt-0.5">₹{event.price}</p>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </AnimatePresence>
                                            </div>

                                            {/* Cart summary */}
                                            {selectedEvents.length > 0 && (
                                                <div className="border-t border-neutral-800 pt-3">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-neutral-500 text-xs"><NumberFlow value={selectedEvents.length} className="inline" /> selected</span>
                                                        <div className="flex items-center gap-1 text-white font-bold">
                                                            <span>₹</span><NumberFlow value={totalPrice} />
                                                        </div>
                                                    </div>
                                                    <motion.button
                                                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={handleSubmitRegistration}
                                                        className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                                                    >
                                                        Proceed to Payment <ChevronRight className="h-4 w-4" />
                                                    </motion.button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* ── STEP 3: Payment ── */}
                                    {step === 3 && (
                                        <motion.div
                                            key="s3"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="p-6"
                                        >
                                            {!submitted ? (
                                                <div className="space-y-5">
                                                    <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors text-xs">
                                                        <ChevronLeft className="h-4 w-4" /> Back to Events
                                                    </button>

                                                    <div className="flex items-center gap-2">
                                                        <QrCode className="h-4 w-4 text-white" />
                                                        <h2 className="text-lg font-bold text-white">Complete Payment</h2>
                                                    </div>

                                                    {/* Order recap */}
                                                    <div className="bg-neutral-800/50 rounded-xl p-3 space-y-1.5 border border-neutral-800">
                                                        {selectedEventObjects.map((e) => (
                                                            <div key={e.slug} className="flex items-center justify-between text-xs">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className={`w-1 h-3 rounded-full bg-gradient-to-b ${e.gradient}`} />
                                                                    <span className="text-neutral-400">{e.name}</span>
                                                                </div>
                                                                <span className="text-neutral-400">₹{e.price}</span>
                                                            </div>
                                                        ))}
                                                        <div className="border-t border-neutral-700 pt-2 flex items-center justify-between">
                                                            <span className="text-white font-bold text-xs">Total</span>
                                                            <span className="text-white font-bold">₹{totalPrice}</span>
                                                        </div>
                                                    </div>

                                                    {/* QR code */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="bg-white p-3 rounded-xl shadow-lg">
                                                            <div className="relative w-44 h-44">
                                                                <Image src="/upi.jpeg" alt="QR Code" fill className="object-contain" priority />
                                                            </div>
                                                        </div>
                                                        <p className="text-neutral-500 text-xs mt-2 text-center">Scan to pay <span className="text-white font-bold">₹{totalPrice}</span> · Any UPI app</p>
                                                    </div>

                                                    {/* Screenshot upload */}
                                                    <div>
                                                        <label className="text-xs font-medium text-neutral-400 block mb-2">Upload Payment Screenshot</label>
                                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} className="hidden" />
                                                        {!screenshotPreview ? (
                                                            <div
                                                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                                                onDragLeave={() => setIsDragging(false)}
                                                                onDrop={handleDrop}
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all ${isDragging ? "border-white/40 bg-white/5" : "border-neutral-700 hover:border-neutral-600 bg-neutral-800/30"}`}
                                                            >
                                                                <Upload className={`h-7 w-7 mx-auto mb-2 ${isDragging ? "text-white" : "text-neutral-600"}`} />
                                                                <p className="text-neutral-500 text-xs">{isDragging ? "Drop here" : "Click or drag & drop"}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="relative rounded-xl overflow-hidden border border-neutral-800">
                                                                <div className="relative w-full aspect-video">
                                                                    <Image src={screenshotPreview} alt="Screenshot" fill className="object-contain" />
                                                                </div>
                                                                <div className="flex items-center justify-between p-2 bg-neutral-800/50 border-t border-neutral-800">
                                                                    <span className="text-xs text-neutral-400 flex items-center gap-1.5"><ImageIcon className="h-3 w-3 text-emerald-400" />{screenshot?.name}</span>
                                                                    <button onClick={() => { setScreenshot(null); setScreenshotPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-neutral-500 hover:text-red-400 transition-colors">
                                                                        <X className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* UTR */}
                                                    <div>
                                                        <label htmlFor="utr" className="text-xs font-medium text-neutral-400 mb-1.5 block">UTR / Transaction ID</label>
                                                        <div className="relative">
                                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600">
                                                                <Hash className="h-4 w-4" />
                                                            </span>
                                                            <input
                                                                id="utr"
                                                                type="text"
                                                                value={utr}
                                                                onChange={(e) => setUtr(e.target.value)}
                                                                placeholder="Enter UTR or transaction ID"
                                                                className="w-full bg-neutral-800/60 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-white/10 focus:border-neutral-500"
                                                            />
                                                        </div>
                                                        <p className="text-neutral-600 text-[10px] mt-1 pl-1">Found in your UPI app payment history</p>
                                                    </div>

                                                    {submitError && (
                                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                                            {submitError}
                                                        </motion.p>
                                                    )}

                                                    <motion.button
                                                        whileHover={screenshot && utr.trim() && !submitting ? { scale: 1.02 } : {}}
                                                        whileTap={screenshot && utr.trim() && !submitting ? { scale: 0.97 } : {}}
                                                        onClick={handleFinalSubmit}
                                                        disabled={!screenshot || !utr.trim() || submitting}
                                                        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300 ${
                                                            screenshot && utr.trim() && !submitting
                                                                ? "bg-white text-black shadow-lg hover:shadow-white/20"
                                                                : "bg-neutral-800 text-neutral-600 cursor-not-allowed border border-neutral-700"
                                                        }`}
                                                    >
                                                        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit Registration <ChevronRight className="h-4 w-4" /></>}
                                                    </motion.button>
                                                </div>

                                            ) : (
                                                /* Success */
                                                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 120 }} className="space-y-5 text-center py-2">
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                                    </motion.div>

                                                    <div>
                                                        <h2 className="text-xl font-bold text-white mb-1">Registration Submitted!</h2>
                                                        <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                                                            Thanks, <span className="text-white font-medium">{formData.fullName}</span>! We'll verify your payment and confirm at <span className="text-white">{formData.email}</span>.
                                                        </p>
                                                    </div>

                                                    <div className="bg-neutral-800/50 rounded-xl p-3 text-left space-y-1.5 border border-neutral-800">
                                                        {selectedEventObjects.map((e) => (
                                                            <div key={e.slug} className="flex items-center gap-2 text-xs">
                                                                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                                                <span className="text-neutral-400">{e.name}</span>
                                                            </div>
                                                        ))}
                                                        <div className="border-t border-neutral-700 pt-2 flex justify-between">
                                                            <span className="text-neutral-500 text-xs font-medium">Paid</span>
                                                            <span className="text-emerald-400 font-bold text-xs">₹{totalPrice}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-neutral-600 text-xs">WhatsApp confirmation → {formData.phone}</p>

                                                    {/* Join WhatsApp Query Group */}
                                                    <a
                                                        href="https://chat.whatsapp.com/HQZ5bjRYkJlEinHlmp1lG8"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm text-center shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
                                                    >
                                                        <span className="flex items-center justify-center gap-2">
                                                            <Phone className="h-4 w-4" /> Join WhatsApp Group for Queries
                                                        </span>
                                                    </a>

                                                    <div className="border-t border-neutral-800 pt-4">
                                                        <p className="text-neutral-400 text-sm font-medium mb-1">Want to register for more?</p>
                                                        <p className="text-neutral-600 text-xs mb-4">Submit a separate registration with another payment.</p>
                                                        <motion.button
                                                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={() => {
                                                                const saved = { ...formData };
                                                                resetRegistration();
                                                                setFormData(saved);
                                                                reset({
                                                                    fullName: saved.fullName,
                                                                    email: saved.email,
                                                                    phone: saved.phone,
                                                                    college: saved.college,
                                                                });
                                                                setScreenshot(null);
                                                                setScreenshotPreview(null);
                                                                setCompressedBase64(null);
                                                                setSubmitError(null);
                                                                setStep(2);
                                                            }}
                                                            className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2"
                                                        >
                                                            <Sparkles className="h-4 w-4" /> Register for More Events
                                                        </motion.button>
                                                    </div>

                                                    <div className="bg-neutral-800/40 border border-neutral-800 rounded-xl p-4">
                                                        <p className="text-neutral-400 text-xs font-medium mb-1">Made a mistake?</p>
                                                        <p className="text-neutral-600 text-xs mb-3">Wrong events or incorrect details? Reach out and we'll fix it.</p>
                                                        <div className="flex items-center justify-center gap-3 text-xs">
                                                            <a href="mailto:ikyam2026@example.com" className="text-white hover:text-neutral-300 flex items-center gap-1 transition-colors">
                                                                <Mail className="h-3.5 w-3.5" /> Email us
                                                            </a>
                                                            <span className="text-neutral-700">·</span>
                                                            <a href="https://chat.whatsapp.com/HQZ5bjRYkJlEinHlmp1lG8" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                                                                <Phone className="h-3.5 w-3.5" /> WhatsApp
                                                            </a>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* ══ RIGHT — Branding Panel (desktop only) ══════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="hidden lg:flex flex-col items-center justify-center flex-1 gap-8 select-none"
                    >
                        {/* Logo */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <div className="absolute -inset-6 rounded-full bg-white/5 blur-2xl" />
                            <div className="relative w-40 h-40">
                                <Image src="/logo.png" alt="Ikyam 2026" fill className="object-contain drop-shadow-2xl" priority />
                            </div>
                        </motion.div>

                        {/* Event name */}
                        <div className="text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl xl:text-6xl font-black text-white tracking-tight leading-none mb-2"
                            >
                                IKYAM
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl font-bold text-neutral-400"
                            >
                                2026
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-neutral-600 text-sm mt-3 tracking-widest uppercase"
                            >
                                Vemana Institute of Technology
                            </motion.p>
                        </div>

                        {/* Decorative stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="flex gap-6"
                        >
                            {[
                                { label: "Events", value: evento.length.toString() },
                                { label: "Days", value: "3" },
                                { label: "Year", value: "'26" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-2xl font-black text-white">{stat.value}</p>
                                    <p className="text-neutral-600 text-xs uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
