"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface CoordinatorGateProps {
    children: (coordinatorName: string) => ReactNode;
}

const COORDINATOR_KEY = "fest_coordinator_name";

export default function CoordinatorGate({ children }: CoordinatorGateProps) {
    const [coordinatorName, setCoordinatorName] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem(COORDINATOR_KEY);
        if (stored) {
            setCoordinatorName(stored);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const name = input.trim();
        if (name.length >= 2) {
            localStorage.setItem(COORDINATOR_KEY, name);
            setCoordinatorName(name);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(COORDINATOR_KEY);
        setCoordinatorName(null);
        setInput("");
    };

    if (!mounted) return null;

    if (!coordinatorName) {
        return (
            <div className="mx-auto mt-8 max-w-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="mb-4 text-center">
                        <div className="mb-2 text-3xl">🛂</div>
                        <h3 className="text-lg font-bold text-white">
                            Coordinator Access
                        </h3>
                        <p className="mt-1 text-sm text-white/60">
                            Enter your name to enable check-in mode
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Your full name"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                            autoFocus
                            minLength={2}
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all"
                            disabled={input.trim().length < 2}
                        >
                            Continue as Coordinator
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
                <span className="text-sm text-yellow-400">
                    🛂 Coordinator: <strong>{coordinatorName}</strong>
                </span>
                <button
                    onClick={handleLogout}
                    className="text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                    Switch
                </button>
            </div>
            {children(coordinatorName)}
        </div>
    );
}
