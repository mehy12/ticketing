"use client";

import { useState } from "react";
import Image from "next/image";
import StatusBadge, { getParticipantStatus } from "./status-badge";
import CoordinatorGate from "./coordinator-gate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Participant } from "@/lib/fest/schema";

interface ParticipantCardProps {
    participant: Participant;
    isCoordinatorMode: boolean;
}

export default function ParticipantCard({
    participant,
    isCoordinatorMode,
}: ParticipantCardProps) {
    const [data, setData] = useState<Participant>(participant);
    const [checkingIn, setCheckingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const status = getParticipantStatus(data);

    const handleCheckIn = async (coordinatorName: string) => {
        setCheckingIn(true);
        setError(null);

        try {
            const res = await fetch("/api/checkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: data.id,
                    coordinatorName,
                    source: (data as any).source,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Check-in failed");
            }

            const updated = await res.json();
            setData(updated);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Check-in failed");
        } finally {
            setCheckingIn(false);
        }
    };

    return (
        <div className="mx-auto max-w-lg">
            {/* Status Header */}
            <div className="mb-6 flex flex-col items-center gap-4">
                <StatusBadge status={status} className="text-base px-6 py-3" />

                {status === "invalid" && (
                    <p className="text-center text-sm text-red-400/80">
                        {data.type === "external"
                            ? "Payment not received. Entry denied."
                            : "Entry not permitted."}
                    </p>
                )}
            </div>

            {/* Main Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                {/* ID Card Image */}
                {data.idCardUrl && data.idCardUrl !== "[uploaded]" && (
                    <div className="border-b border-white/10 bg-white/5 p-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                            ID Card
                        </p>
                        <div className="relative w-full overflow-hidden rounded-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={data.idCardUrl}
                                alt={`${data.name}'s ID Card`}
                                className="w-full rounded-lg object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Participant Details */}
                <div className="space-y-0 divide-y divide-white/5">
                    <InfoRow label="Name" value={data.name} highlight />
                    <InfoRow label="College" value={data.college} />
                    <InfoRow label="Phone" value={data.phone} />
                    <InfoRow
                        label="Type"
                        value={
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider",
                                    data.type === "internal"
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "bg-purple-500/20 text-purple-400"
                                )}
                            >
                                {data.type}
                            </span>
                        }
                    />

                    {data.type === "internal" && (
                        <>
                            {data.usn && <InfoRow label="USN" value={data.usn} />}
                            {data.department && (
                                <InfoRow label="Department" value={data.department} />
                            )}
                        </>
                    )}

                    {data.type === "external" && data.events && data.events.length > 0 && (
                        <InfoRow
                            label="Events"
                            value={
                                <div className="flex flex-wrap gap-1.5">
                                    {data.events.map((event, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/80"
                                        >
                                            {event}
                                        </span>
                                    ))}
                                </div>
                            }
                        />
                    )}

                    {/* Entry Status — always visible */}
                    <InfoRow
                        label="Entry"
                        value={
                            data.entryChecked ? (
                                <span className="text-emerald-400 text-sm">✓ Checked in</span>
                            ) : (
                                <span className="text-white/40 text-sm">Not checked in</span>
                            )
                        }
                    />

                    {data.entryChecked && (
                        <>
                            <InfoRow
                                label="Entry Time"
                                value={
                                    data.entryTime
                                        ? new Date(data.entryTime).toLocaleString("en-IN", {
                                              timeZone: "Asia/Kolkata",
                                              dateStyle: "medium",
                                              timeStyle: "short",
                                          })
                                        : "—"
                                }
                            />
                            <InfoRow
                                label="Checked-in By"
                                value={data.checkedInBy || "—"}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Check-In Section (Coordinator only) */}
            {isCoordinatorMode && (
                <div className="mt-6">
                    {data.entryChecked ? (
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                            <p className="text-sm text-emerald-400">
                                ✓ Checked in at{" "}
                                <strong>
                                    {data.entryTime
                                        ? new Date(data.entryTime).toLocaleString("en-IN", {
                                              timeZone: "Asia/Kolkata",
                                              timeStyle: "short",
                                          })
                                        : "—"}
                                </strong>{" "}
                                by <strong>{data.checkedInBy}</strong>
                            </p>
                        </div>
                    ) : status === "valid" ? (
                        <CoordinatorGate>
                            {(coordinatorName) => (
                                <div className="space-y-3">
                                    {error && (
                                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                                            {error}
                                        </div>
                                    )}
                                    <Button
                                        onClick={() => handleCheckIn(coordinatorName)}
                                        disabled={checkingIn}
                                        className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all disabled:opacity-50"
                                    >
                                        {checkingIn ? (
                                            <span className="flex items-center gap-2">
                                                <svg
                                                    className="h-5 w-5 animate-spin"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        className="opacity-25"
                                                    />
                                                    <path
                                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                                        fill="currentColor"
                                                        className="opacity-75"
                                                    />
                                                </svg>
                                                Checking in...
                                            </span>
                                        ) : (
                                            "✓ CHECK IN"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </CoordinatorGate>
                    ) : (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
                            <p className="text-sm text-red-400">
                                ⚠ Cannot check in — participant is not valid
                            </p>
                        </div>
                    )}
                </div>
            )}
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
                className={cn(
                    "text-right",
                    highlight
                        ? "text-base font-bold text-white"
                        : "text-sm text-white/80"
                )}
            >
                {value}
            </span>
        </div>
    );
}
