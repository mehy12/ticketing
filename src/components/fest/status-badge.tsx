"use client";

import { cn } from "@/lib/utils";

type StatusType = "valid" | "invalid" | "checked-in";

interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

const statusConfig: Record<StatusType, { label: string; emoji: string; classes: string }> = {
    valid: {
        label: "VALID",
        emoji: "🟢",
        classes: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    invalid: {
        label: "INVALID",
        emoji: "🔴",
        classes: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    "checked-in": {
        label: "ALREADY CHECKED-IN",
        emoji: "🟡",
        classes: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
};

export function getParticipantStatus(participant: {
    type: string;
    paid: boolean;
    entryChecked: boolean;
}): StatusType {
    if (participant.entryChecked) return "checked-in";
    if (participant.type === "internal") return "valid";
    if (participant.type === "external" && participant.paid) return "valid";
    return "invalid";
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold tracking-wider",
                config.classes,
                className
            )}
        >
            <span className="text-lg">{config.emoji}</span>
            {config.label}
        </div>
    );
}
