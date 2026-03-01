"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { evento } from "@/exports/export";
import { submitRegistration } from "./actions";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import PriceFlow from "@/components/ui/smoothui/price-flow";
import NumberFlow from '@number-flow/react';
import {
    Calendar,
    Clock,
    Check,
    ChevronRight,
    ChevronLeft,
    User,
    Mail,
    Phone,
    GraduationCap,
    Sparkles,
    X,
    ShoppingCart,
    Upload,
    ImageIcon,
    QrCode,
    CheckCircle2,
    MapPin,
    Hash,
} from "lucide-react";

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    college: string;
};

type FormErrors = {
    fullName?: string;
    email?: string;
    phone?: string;
    college?: string;
};

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        college: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showMobileSummary, setShowMobileSummary] = useState(false);
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [utr, setUtr] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(evento.map((e) => e.category)));
        return ["All", ...cats];
    }, []);

    const filteredEvents = useMemo(() => {
        if (activeCategory === "All") return evento;
        return evento.filter((e) => e.category === activeCategory);
    }, [activeCategory]);

    const selectedEventObjects = useMemo(() => {
        return evento.filter((e) => selectedEvents.includes(e.slug));
    }, [selectedEvents]);

    const totalPrice = useMemo(() => {
        return selectedEventObjects.reduce((sum, e) => sum + e.price, 0);
    }, [selectedEventObjects]);

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case "fullName":
                if (!value.trim()) return "Full name is required";
                if (value.trim().length < 2) return "Name must be at least 2 characters";
                return undefined;
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Enter a valid email address";
                return undefined;
            case "phone":
                if (!value.trim()) return "Phone number is required";
                if (!/^\d{10}$/.test(value.replace(/\s/g, "")))
                    return "Enter a valid 10-digit phone number";
                return undefined;
            case "college":
                if (!value.trim()) return "College name is required";
                return undefined;
            default:
                return undefined;
        }
    };

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (name: keyof FormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, formData[name]),
        }));
    };

    const isFormValid = () => {
        return (
            !validateField("fullName", formData.fullName) &&
            !validateField("email", formData.email) &&
            !validateField("phone", formData.phone) &&
            !validateField("college", formData.college)
        );
    };

    const handleContinue = () => {
        const newErrors: FormErrors = {
            fullName: validateField("fullName", formData.fullName),
            email: validateField("email", formData.email),
            phone: validateField("phone", formData.phone),
            college: validateField("college", formData.college),
        };
        setErrors(newErrors);
        setTouched({ fullName: true, email: true, phone: true, college: true });

        if (isFormValid()) {
            setStep(2);
        }
    };

    const toggleEvent = (slug: string) => {
        setSelectedEvents((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug]
        );
    };

    const handleSubmitRegistration = () => {
        if (selectedEvents.length > 0) {
            setShowMobileSummary(false);
            setStep(3);
        }
    };

    const [compressedBase64, setCompressedBase64] = useState<string | null>(null);

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const img = document.createElement("img");
            const canvas = document.createElement("canvas");
            const reader = new FileReader();

            reader.onload = (e) => {
                img.onload = () => {
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let { width, height } = img;

                    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
                        width = Math.round(width * ratio);
                        height = Math.round(height * ratio);
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL("image/jpeg", 0.7));
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (file: File | null) => {
        if (file && file.type.startsWith("image/")) {
            setScreenshot(file);
            const reader = new FileReader();
            reader.onload = (e) => setScreenshotPreview(e.target?.result as string);
            reader.readAsDataURL(file);

            // Compress for submission
            const compressed = await compressImage(file);
            setCompressedBase64(compressed);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFileChange(file || null);
    };

    const handleFinalSubmit = async () => {
        if (screenshot && utr.trim()) {
            setSubmitting(true);
            setSubmitError(null);
            try {
                const eventNames = selectedEventObjects
                    .map((e) => `${e.name} (₹${e.price})`)
                    .join(", ");

                const result = await submitRegistration({
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    college: formData.college,
                    events: eventNames,
                    totalAmount: totalPrice,
                    screenshotBase64: compressedBase64,
                    utr: utr.trim(),
                });

                if (result.success) {
                    setSubmitted(true);
                } else {
                    setSubmitError(result.error || "Something went wrong. Please try again.");
                }
            } catch {
                setSubmitError("Network error. Please check your connection and try again.");
            } finally {
                setSubmitting(false);
            }
        }
    };

    const formFields: {
        name: keyof FormData;
        label: string;
        type: string;
        placeholder: string;
        icon: React.ReactNode;
    }[] = [
            {
                name: "fullName",
                label: "Full Name",
                type: "text",
                placeholder: "Enter your full name",
                icon: <User className="h-5 w-5" />,
            },
            {
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "Enter your email address",
                icon: <Mail className="h-5 w-5" />,
            },
            {
                name: "phone",
                label: "Phone Number (WhatsApp)",
                type: "tel",
                placeholder: "Enter your 10-digit number",
                icon: <Phone className="h-5 w-5" />,
            },
            {
                name: "college",
                label: "College Name",
                type: "text",
                placeholder: "Enter your college name",
                icon: <GraduationCap className="h-5 w-5" />,
            },
        ];

    return (
        <div
            className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background.png')" }}
        >
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10 mt-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
                            Register for Ikyam 2026
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Fill in your details and choose the events you want to participate
                        in.
                    </p>
                </motion.div>

                {/* Step Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-3 sm:gap-4 mb-10"
                >
                    {[
                        { num: 1, label: "Your Info" },
                        { num: 2, label: "Select Events" },
                        { num: 3, label: "Payment" },
                    ].map((s, i) => (
                        <div key={s.num} className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s.num
                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30"
                                        : "bg-gray-800 text-gray-400"
                                        }`}
                                >
                                    {step > s.num ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : s.num}
                                </div>
                                <span
                                    className={`text-xs sm:text-sm font-medium hidden sm:block ${step >= s.num ? "text-white" : "text-gray-500"
                                        }`}
                                >
                                    {s.label}
                                </span>
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-8 sm:w-16 md:w-24 h-0.5 transition-all duration-500 ${step >= s.num + 1
                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                        : "bg-gray-700"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.35 }}
                            className="max-w-xl mx-auto"
                        >
                            <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20">
                                        <Sparkles className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            Personal Information
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            All fields are required
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {formFields.map((field, idx) => (
                                        <motion.div
                                            key={field.name}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.08 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    {field.icon}
                                                </div>
                                                <input
                                                    type={field.type}
                                                    value={formData[field.name]}
                                                    onChange={(e) =>
                                                        handleInputChange(field.name, e.target.value)
                                                    }
                                                    onBlur={() => handleBlur(field.name)}
                                                    placeholder={field.placeholder}
                                                    className={`w-full pl-11 pr-4 py-3 bg-gray-900/70 border rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all duration-200 ${errors[field.name] && touched[field.name]
                                                        ? "border-red-500/60 focus:ring-red-500/40"
                                                        : "border-gray-700 focus:ring-yellow-500/40 focus:border-yellow-500/50"
                                                        }`}
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {errors[field.name] && touched[field.name] && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-red-400 text-xs mt-1.5 pl-1"
                                                    >
                                                        {errors[field.name]}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleContinue}
                                    disabled={!isFormValid()}
                                    className={`w-full mt-8 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid()
                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/25"
                                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    Continue to Events
                                    <ChevronRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.35 }}
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Left: Event Selection */}
                                <div className="flex-1 min-w-0">
                                    {/* Back Button & Category Filters */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setStep(1)}
                                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm shrink-0"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Back to Info
                                        </motion.button>

                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat
                                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-md"
                                                        : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white border border-gray-700/50"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Event Cards Grid */}
                                    <motion.div
                                        layout
                                        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    >
                                        <AnimatePresence>
                                            {filteredEvents.map((event, i) => {
                                                const isSelected = selectedEvents.includes(event.slug);
                                                return (
                                                    <motion.div
                                                        key={event.slug}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ delay: i * 0.03 }}
                                                        onClick={() => toggleEvent(event.slug)}
                                                        className="cursor-pointer aspect-[1/1.414] group"
                                                        style={{ perspective: "1000px" }}
                                                    >
                                                        <div
                                                            className={`relative w-full h-full transition-transform duration-700 rounded-xl border group-hover:[transform:rotateY(180deg)] ${isSelected
                                                                ? "border-yellow-500/60 shadow-lg shadow-yellow-500/20 ring-2 ring-yellow-500/30"
                                                                : "border-gray-800"
                                                                }`}
                                                            style={{
                                                                transformStyle: "preserve-3d",
                                                            }}
                                                        >
                                                            {/* ===== FRONT FACE ===== */}
                                                            <div
                                                                className="absolute inset-0 rounded-xl overflow-hidden"
                                                                style={{ backfaceVisibility: "hidden" }}
                                                            >
                                                                <Image
                                                                    src={event.image || "/placeholder.svg"}
                                                                    fill
                                                                    alt={event.name}
                                                                    className="object-cover object-top"
                                                                />
                                                                <div
                                                                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${event.gradient} z-10`}
                                                                />
                                                                <Badge
                                                                    className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${event.gradient} text-white border-none`}
                                                                >
                                                                    Ikyam 2026
                                                                </Badge>

                                                                {/* Bottom gradient + name */}
                                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-12 z-10">
                                                                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                                                        {event.name}
                                                                    </h3>
                                                                </div>

                                                                {/* Selected check overlay */}
                                                                {isSelected && (
                                                                    <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center">
                                                                        <motion.div
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-500/30"
                                                                        >
                                                                            <Check className="h-8 w-8 text-black" />
                                                                        </motion.div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* ===== BACK FACE ===== */}
                                                            <div
                                                                className="absolute inset-0 rounded-xl overflow-hidden bg-black/90"
                                                                style={{
                                                                    backfaceVisibility: "hidden",
                                                                    transform: "rotateY(180deg)",
                                                                }}
                                                            >
                                                                {/* BG poster at very low opacity */}
                                                                <Image
                                                                    src={event.image || "/placeholder.svg"}
                                                                    fill
                                                                    alt={event.name}
                                                                    className="object-cover object-top opacity-[0.08]"
                                                                />
                                                                <div
                                                                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${event.gradient} z-10`}
                                                                />

                                                                {/* Back content */}
                                                                <div className="relative z-10 flex flex-col justify-between h-full p-5">
                                                                    <div>
                                                                        <h3 className="text-lg font-bold text-white mb-2">
                                                                            {event.name}
                                                                        </h3>
                                                                        <Badge
                                                                            className={`mb-3 text-[10px] px-2.5 py-0.5 bg-gradient-to-r ${event.gradient} text-white border-none`}
                                                                        >
                                                                            {event.category}
                                                                        </Badge>
                                                                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-4 mb-4">
                                                                            {event.description}
                                                                        </p>
                                                                        <div className="space-y-1.5 text-xs text-gray-400">
                                                                            <div className="flex items-center gap-1.5">
                                                                                <Calendar className="h-3 w-3 shrink-0" />
                                                                                <span>{event.date}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1.5">
                                                                                <Clock className="h-3 w-3 shrink-0" />
                                                                                <span>{event.time}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1.5">
                                                                                <MapPin className="h-3 w-3 shrink-0" />
                                                                                <span>{event.venue}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1.5">
                                                                                <User className="h-3 w-3 shrink-0" />
                                                                                <span>
                                                                                    {event.minTeamSize === event.maxTeamSize
                                                                                        ? event.minTeamSize === 1
                                                                                            ? "Solo"
                                                                                            : `Team of ${event.minTeamSize}`
                                                                                        : `${event.minTeamSize}–${event.maxTeamSize} members`}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Price footer */}
                                                                    <div className="pt-3 border-t border-gray-700 flex items-center justify-between">
                                                                        <span
                                                                            className={`text-2xl font-bold bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}
                                                                        >
                                                                            ₹{event.price}
                                                                        </span>
                                                                        <span className={`text-xs font-medium ${isSelected ? "text-yellow-400" : "text-gray-500"}`}>
                                                                            {isSelected ? "✓ Selected" : "Click to select"}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Selected check overlay on back */}
                                                                {isSelected && (
                                                                    <div className="absolute top-3 right-3 z-20">
                                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                                                                            <Check className="h-4 w-4 text-black" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>

                                {/* Right: Price Summary — Desktop */}
                                <div className="hidden lg:block w-80 shrink-0">
                                    <div className="sticky top-28">
                                        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl">
                                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                                                Order Summary
                                            </h3>

                                            {selectedEventObjects.length === 0 ? (
                                                <div className="text-center py-8">
                                                    <div className="w-16 h-16 rounded-full bg-gray-800/60 flex items-center justify-center mx-auto mb-3">
                                                        <Sparkles className="h-7 w-7 text-gray-600" />
                                                    </div>
                                                    <p className="text-gray-500 text-sm">
                                                        No events selected yet.
                                                    </p>
                                                    <p className="text-gray-600 text-xs mt-1">
                                                        Click on event cards to select
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm text-gray-400">Selected</span>
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                                                            <NumberFlow
                                                                value={selectedEventObjects.length}
                                                                className="text-sm font-bold text-yellow-400"
                                                            />
                                                            <span className="text-xs text-yellow-400/80">
                                                                {selectedEventObjects.length === 1 ? 'event' : 'events'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                                                        <AnimatePresence>
                                                            {selectedEventObjects.map((event) => (
                                                                <motion.div
                                                                    key={event.slug}
                                                                    initial={{ opacity: 0, x: 20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: -20 }}
                                                                    className="flex items-center justify-between gap-2 bg-gray-900/40 rounded-lg px-3 py-2.5 border border-gray-800/50"
                                                                >
                                                                    <div className="flex items-center gap-2 min-w-0">
                                                                        <div
                                                                            className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${event.gradient} shrink-0`}
                                                                        />
                                                                        <span className="text-sm text-gray-200 truncate">
                                                                            {event.name}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 shrink-0">
                                                                        <span className="text-sm font-semibold text-white">
                                                                            ₹{event.price}
                                                                        </span>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleEvent(event.slug);
                                                                            }}
                                                                            className="text-gray-500 hover:text-red-400 transition-colors"
                                                                        >
                                                                            <X className="h-3.5 w-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </AnimatePresence>
                                                    </div>

                                                    <div className="border-t border-gray-700 mt-4 pt-4">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="text-gray-400 text-sm">
                                                                Total
                                                            </span>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-2xl font-bold text-white">₹</span>
                                                                <NumberFlow
                                                                    value={totalPrice}
                                                                    className="text-2xl font-bold text-white"
                                                                />
                                                            </div>
                                                        </div>

                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleSubmitRegistration}
                                                            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                                                        >
                                                            Proceed to Payment
                                                        </motion.button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Summary Bar */}
                            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
                                <AnimatePresence>
                                    {showMobileSummary && (
                                        <motion.div
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            exit={{ y: "100%" }}
                                            transition={{ type: "spring", damping: 25 }}
                                            className="bg-black/95 backdrop-blur-xl border-t border-gray-800 rounded-t-2xl p-5 max-h-[60vh] overflow-y-auto"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-white font-bold flex items-center gap-2">
                                                    <ShoppingCart className="h-5 w-5 text-yellow-400" />
                                                    Order Summary
                                                </h3>
                                                <button
                                                    onClick={() => setShowMobileSummary(false)}
                                                    className="text-gray-400 hover:text-white"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>

                                            {selectedEventObjects.length === 0 ? (
                                                <p className="text-gray-500 text-sm text-center py-4">
                                                    No events selected yet
                                                </p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {selectedEventObjects.map((event) => (
                                                        <div
                                                            key={event.slug}
                                                            className="flex items-center justify-between bg-gray-900/40 rounded-lg px-3 py-2 border border-gray-800/50"
                                                        >
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                <div
                                                                    className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${event.gradient} shrink-0`}
                                                                />
                                                                <span className="text-sm text-gray-200 truncate">
                                                                    {event.name}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 shrink-0">
                                                                <span className="text-sm font-semibold text-white">
                                                                    ₹{event.price}
                                                                </span>
                                                                <button
                                                                    onClick={() => toggleEvent(event.slug)}
                                                                    className="text-gray-500 hover:text-red-400"
                                                                >
                                                                    <X className="h-3.5 w-3.5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Bottom bar */}
                                {selectedEvents.length > 0 && (
                                    <motion.div
                                        initial={{ y: 100 }}
                                        animate={{ y: 0 }}
                                        className="bg-black/95 backdrop-blur-xl border-t border-gray-800 px-5 py-3.5 flex items-center justify-between"
                                    >
                                        <button
                                            onClick={() => setShowMobileSummary(!showMobileSummary)}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="relative">
                                                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                                                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                                    <NumberFlow value={selectedEvents.length} />
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-0.5">
                                                    <span className="text-white font-bold text-lg">₹</span>
                                                    <NumberFlow
                                                        value={totalPrice}
                                                        className="text-white font-bold text-lg"
                                                    />
                                                </div>
                                                <p className="text-gray-400 text-[11px] -mt-0.5">
                                                    <NumberFlow value={selectedEvents.length} className="inline" />{" "}
                                                    {selectedEvents.length === 1 ? "event" : "events"}{" "}
                                                    selected
                                                </p>
                                            </div>
                                        </button>

                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSubmitRegistration}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-sm"
                                        >
                                            Pay Now
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>

                            {/* Spacer for mobile bottom bar */}
                            <div className="lg:hidden h-20" />
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.35 }}
                            className="max-w-2xl mx-auto"
                        >
                            {!submitted ? (
                                <div className="space-y-6">
                                    {/* Back button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setStep(2)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Back to Events
                                    </motion.button>

                                    {/* QR Code Section */}
                                    <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-2xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20">
                                                <QrCode className="h-5 w-5 text-yellow-400" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">
                                                    Complete Payment
                                                </h2>
                                                <p className="text-sm text-gray-400">
                                                    Scan the QR code and upload the screenshot
                                                </p>
                                            </div>
                                        </div>

                                        {/* Order recap */}
                                        <div className="bg-gray-900/50 rounded-xl border border-gray-800/50 p-4 mb-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm text-gray-400">Selected Events</span>
                                                <span className="text-sm text-gray-400">{selectedEventObjects.length} {selectedEventObjects.length === 1 ? "event" : "events"}</span>
                                            </div>
                                            <div className="space-y-1.5 mb-3">
                                                {selectedEventObjects.map((event) => (
                                                    <div key={event.slug} className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${event.gradient}`} />
                                                            <span className="text-gray-300">{event.name}</span>
                                                        </div>
                                                        <span className="text-gray-300">₹{event.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-700 pt-2 flex items-center justify-between">
                                                <span className="text-white font-bold">Total Amount</span>
                                                <PriceFlow value={totalPrice} className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent" />
                                            </div>
                                        </div>

                                        {/* QR Code */}
                                        <div className="flex flex-col items-center mb-6">
                                            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg shadow-yellow-500/10">
                                                <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                                                    <Image
                                                        src="/upi.jpeg"
                                                        alt="Payment QR Code"
                                                        fill
                                                        className="object-contain"
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm text-center">
                                                Scan with any UPI app to pay <span className="font-bold text-yellow-400">₹{totalPrice}</span>
                                            </p>
                                            <p className="text-gray-500 text-xs mt-1">Google Pay · PhonePe · Paytm · Any UPI</p>
                                        </div>

                                        {/* Upload Section */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                Upload Payment Screenshot
                                            </label>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                                className="hidden"
                                            />

                                            {!screenshotPreview ? (
                                                <motion.div
                                                    whileHover={{ scale: 1.01 }}
                                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                                    onDragLeave={() => setIsDragging(false)}
                                                    onDrop={handleDrop}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${isDragging
                                                        ? "border-yellow-500 bg-yellow-500/5"
                                                        : "border-gray-700 hover:border-gray-500 bg-gray-900/30"
                                                        }`}
                                                >
                                                    <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragging ? "text-yellow-400" : "text-gray-500"}`} />
                                                    <p className="text-gray-300 text-sm font-medium mb-1">
                                                        {isDragging ? "Drop your screenshot here" : "Click to upload or drag and drop"}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">PNG, JPG, JPEG up to 10MB</p>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900/30"
                                                >
                                                    <div className="relative w-full aspect-video">
                                                        <Image
                                                            src={screenshotPreview}
                                                            alt="Payment screenshot"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-gray-900/80 border-t border-gray-800">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <ImageIcon className="h-4 w-4 text-green-400 shrink-0" />
                                                            <span className="text-sm text-gray-300 truncate">{screenshot?.name}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setScreenshot(null);
                                                                setScreenshotPreview(null);
                                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                                            }}
                                                            className="text-gray-500 hover:text-red-400 transition-colors shrink-0 ml-2"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* UTR Input */}
                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                UTR Number
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    <Hash className="h-5 w-5" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={utr}
                                                    onChange={(e) => setUtr(e.target.value)}
                                                    placeholder="Enter your UTR / Transaction ID"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/50 transition-all duration-200"
                                                />
                                            </div>
                                            <p className="text-gray-500 text-xs mt-1.5 pl-1">You can find this in your UPI app payment history</p>
                                        </div>

                                        {/* Submit Button */}
                                        {submitError && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-sm text-center mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                                            >
                                                {submitError}
                                            </motion.p>
                                        )}
                                        <motion.button
                                            whileHover={screenshot && utr.trim() && !submitting ? { scale: 1.02 } : {}}
                                            whileTap={screenshot && utr.trim() && !submitting ? { scale: 0.98 } : {}}
                                            onClick={handleFinalSubmit}
                                            disabled={!screenshot || !utr.trim() || submitting}
                                            className={`w-full mt-6 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${screenshot && utr.trim() && !submitting
                                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/25"
                                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                                }`}
                                        >
                                            {submitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Registration
                                                    <ChevronRight className="h-5 w-5" />
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                /* Success State */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className="bg-black/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 sm:p-10 shadow-2xl text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                                    >
                                        <CheckCircle2 className="h-10 w-10 text-white" />
                                    </motion.div>

                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                        Registration Submitted!
                                    </h2>
                                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                        Thank you, <span className="text-white font-medium">{formData.fullName}</span>! Your registration for{" "}
                                        <span className="text-yellow-400 font-medium">{selectedEventObjects.length} {selectedEventObjects.length === 1 ? "event" : "events"}</span>{" "}
                                        has been submitted. We&apos;ll verify your payment and send a confirmation to{" "}
                                        <span className="text-white font-medium">{formData.email}</span>.
                                    </p>

                                    <div className="bg-gray-900/50 rounded-xl border border-gray-800/50 p-4 mb-6 text-left">
                                        <div className="space-y-2">
                                            {selectedEventObjects.map((event) => (
                                                <div key={event.slug} className="flex items-center gap-2 text-sm">
                                                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                                                    <span className="text-gray-300">{event.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-700 mt-3 pt-3 flex items-center justify-between">
                                            <span className="text-white font-bold text-sm">Amount Paid</span>
                                            <span className="font-bold text-green-400">₹{totalPrice}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 text-xs">
                                        A WhatsApp confirmation will be sent to {formData.phone}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
