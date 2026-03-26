"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import StatusBadge, { getParticipantStatus } from "@/components/fest/status-badge";
import type { Participant } from "@/lib/fest/schema";

type ScanState = "name" | "scanning" | "loading" | "result";

export default function ScanPage() {
    const [coordinatorName, setCoordinatorName] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [scanState, setScanState] = useState<ScanState>("name");
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [checkingIn, setCheckingIn] = useState(false);
    const [checkedIn, setCheckedIn] = useState(false);
    const scannerRef = useRef<HTMLDivElement>(null);
    const html5QrCodeRef = useRef<unknown>(null);

    // Load saved coordinator name
    useEffect(() => {
        const saved = localStorage.getItem("fest_coordinator");
        if (saved) {
            setCoordinatorName(saved);
            setScanState("scanning");
        }
    }, []);

    const stopScanner = useCallback(async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const scanner = html5QrCodeRef.current as any;
            if (scanner) {
                await scanner.stop();
                scanner.clear();
                html5QrCodeRef.current = null;
            }
        } catch {
            // Ignore stop errors
        }
    }, []);

    // Start scanner when in scanning state
    useEffect(() => {
        if (scanState !== "scanning") return;

        let mounted = true;

        const startScanner = async () => {
            const { Html5Qrcode } = await import("html5-qrcode");

            if (!mounted || !scannerRef.current) return;

            const scanner = new Html5Qrcode("qr-reader");
            html5QrCodeRef.current = scanner;

            try {
                await scanner.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText: string) => {
                        // Extract UUID from the scanned URL
                        const uuidMatch = decodedText.match(
                            /\/fest\/p\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
                        );

                        if (uuidMatch) {
                            scanner.stop().then(() => scanner.clear()).catch(() => {});
                            html5QrCodeRef.current = null;
                            if (mounted) {
                                fetchParticipant(uuidMatch[1]);
                            }
                        }
                    },
                    () => {
                        // Ignore scan errors (no QR found in frame)
                    }
                );
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Camera access denied. Please allow camera permissions."
                    );
                }
            }
        };

        startScanner();

        return () => {
            mounted = false;
            stopScanner();
        };
    }, [scanState, stopScanner]);

    const fetchParticipant = async (id: string) => {
        setScanState("loading");
        setError(null);
        setParticipant(null);
        setCheckedIn(false);

        try {
            const res = await fetch(`/api/participant?id=${id}`);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Participant not found");
            }
            const data = await res.json();
            setParticipant(data);
            setScanState("result");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch");
            setScanState("result");
        }
    };

    const handleCheckIn = async () => {
        if (!participant) return;
        setCheckingIn(true);
        setError(null);

        try {
            const res = await fetch("/api/checkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: participant.id,
                    coordinatorName,
                    source: (participant as any).source,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Check-in failed");
            }

            const updated = await res.json();
            setParticipant(updated);
            setCheckedIn(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Check-in failed");
        } finally {
            setCheckingIn(false);
        }
    };

    const resetForNextScan = () => {
        setParticipant(null);
        setError(null);
        setCheckedIn(false);
        setScanState("scanning");
    };

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nameInput.trim()) return;
        const name = nameInput.trim();
        setCoordinatorName(name);
        localStorage.setItem("fest_coordinator", name);
        setScanState("scanning");
    };

    const switchCoordinator = () => {
        stopScanner();
        localStorage.removeItem("fest_coordinator");
        setCoordinatorName("");
        setNameInput("");
        setParticipant(null);
        setError(null);
        setScanState("name");
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
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

            <div className="relative z-10 mx-auto max-w-lg px-4 py-8">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-white">🛂 Entry Scanner</h1>
                    <p className="mt-1 text-sm text-white/50">Vemanothsav 2026</p>
                    {coordinatorName && (
                        <div className="mt-2 flex items-center justify-center gap-2">
                            <span className="text-xs text-white/40">
                                Coordinator: <strong className="text-white/70">{coordinatorName}</strong>
                            </span>
                            <button
                                onClick={switchCoordinator}
                                className="text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors"
                            >
                                Switch
                            </button>
                        </div>
                    )}
                </div>

                {/* ─── Name Entry ─────────────────────────────── */}
                {scanState === "name" && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <div className="mb-6 text-center">
                            <div className="mb-2 text-4xl">👤</div>
                            <h2 className="text-lg font-semibold text-white">Coordinator Login</h2>
                            <p className="mt-1 text-sm text-white/50">
                                Enter your name to start scanning
                            </p>
                        </div>
                        <form onSubmit={handleNameSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                placeholder="Your full name"
                                autoFocus
                                required
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all"
                            >
                                Start Scanning
                            </Button>
                        </form>
                    </div>
                )}

                {/* ─── Camera Scanner ────────────────────────── */}
                {scanState === "scanning" && (
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                            <div id="qr-reader" ref={scannerRef} className="w-full" />
                        </div>
                        <p className="text-center text-sm text-white/40 animate-pulse">
                            Point camera at a QR code...
                        </p>
                        {error && (
                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                                {error}
                            </div>
                        )}
                    </div>
                )}

                {/* ─── Loading ───────────────────────────────── */}
                {scanState === "loading" && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="h-10 w-10 animate-spin text-yellow-500" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" fill="currentColor" className="opacity-75" />
                        </svg>
                        <p className="mt-4 text-white/50">Fetching participant...</p>
                    </div>
                )}

                {/* ─── Result ────────────────────────────────── */}
                {scanState === "result" && (
                    <div className="space-y-4">
                        {participant ? (
                            <>
                                {/* Status */}
                                <div className="flex justify-center">
                                    <StatusBadge
                                        status={
                                            checkedIn
                                                ? "checked-in"
                                                : getParticipantStatus(participant)
                                        }
                                        className="text-base px-6 py-3"
                                    />
                                </div>

                                {/* ID Card Image */}
                                {participant.idCardUrl && participant.idCardUrl !== "[uploaded]" && (
                                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden p-4">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                                            ID Card
                                        </p>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={participant.idCardUrl}
                                            alt={`${participant.name}'s ID Card`}
                                            className="w-full rounded-lg object-cover"
                                        />
                                    </div>
                                )}

                                {/* Participant Info */}
                                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden divide-y divide-white/5">
                                    <InfoRow label="Name" value={participant.name} highlight />
                                    {participant.type === "internal" ? (
                                        <>
                                            {participant.usn && (
                                                <InfoRow label="USN" value={participant.usn} />
                                            )}
                                            {participant.department && (
                                                <InfoRow label="Dept" value={participant.department} />
                                            )}
                                        </>
                                    ) : (
                                        <InfoRow label="College" value={participant.college} />
                                    )}
                                    <InfoRow label="Phone" value={participant.phone} />
                                    <InfoRow
                                        label="Type"
                                        value={
                                            <span
                                                className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold uppercase ${
                                                    participant.type === "internal"
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : "bg-purple-500/20 text-purple-400"
                                                }`}
                                            >
                                                {participant.type}
                                            </span>
                                        }
                                    />
                                </div>

                                {/* Check In / Already Checked In */}
                                {checkedIn || participant.entryChecked ? (
                                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                                        <p className="text-lg font-bold text-emerald-400">
                                            ✓ Checked In
                                        </p>
                                        <p className="text-sm text-emerald-400/70 mt-1">
                                            {participant.entryTime
                                                ? `at ${new Date(participant.entryTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", timeStyle: "short" })}`
                                                : ""}
                                            {participant.checkedInBy ? ` by ${participant.checkedInBy}` : ""}
                                        </p>
                                    </div>
                                ) : getParticipantStatus(participant) === "valid" ? (
                                    <>
                                        {error && (
                                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                                                {error}
                                            </div>
                                        )}
                                        <Button
                                            onClick={handleCheckIn}
                                            disabled={checkingIn}
                                            className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all disabled:opacity-50"
                                        >
                                            {checkingIn ? "Checking in..." : "✓ CHECK IN"}
                                        </Button>
                                    </>
                                ) : (
                                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
                                        <p className="text-sm text-red-400">
                                            ⚠ Cannot check in — {participant.type === "external" ? "payment not received" : "entry not permitted"}
                                        </p>
                                    </div>
                                )}

                                {/* Next Scan Button */}
                                <Button
                                    onClick={resetForNextScan}
                                    variant="outline"
                                    className="w-full h-12 text-base border-white/10 text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                                >
                                    📷 Scan Next QR Code
                                </Button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
                                    <div className="text-3xl mb-2">❌</div>
                                    <p className="text-red-400 font-semibold">
                                        {error || "Participant not found"}
                                    </p>
                                </div>
                                <Button
                                    onClick={resetForNextScan}
                                    className="w-full h-12 text-base bg-yellow-500 text-black font-semibold hover:bg-yellow-400 rounded-xl"
                                >
                                    📷 Scan Again
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Helper ─────────────────────────────────────────────────────────────────

function InfoRow({
    label,
    value,
    highlight,
}: {
    label: string;
    value: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-4 px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40 pt-0.5 shrink-0">
                {label}
            </span>
            <span
                className={
                    highlight
                        ? "text-base font-bold text-white text-right"
                        : "text-sm text-white/80 text-right"
                }
            >
                {value}
            </span>
        </div>
    );
}
