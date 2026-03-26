"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { Participant } from "@/lib/fest/schema";

type AdminStats = {
    total: number;
    checkedIn: number;
    notCheckedIn: number;
    internal: number;
    external: number;
    recentCheckIns: Participant[];
};

export default function FestAdminPage() {
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [storedPassword, setStoredPassword] = useState<string | null>(null);

    useEffect(() => {
        const saved = sessionStorage.getItem("fest_admin_pw");
        if (saved) {
            setStoredPassword(saved);
            fetchStats(saved);
        }
    }, []);

    const fetchStats = useCallback(async (pw: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: pw }),
            });

            if (!res.ok) {
                const err = await res.json();
                if (res.status === 401) {
                    sessionStorage.removeItem("fest_admin_pw");
                    setAuthenticated(false);
                    setStoredPassword(null);
                }
                throw new Error(err.error || "Failed to fetch stats");
            }

            const data = await res.json();
            setStats(data);
            setAuthenticated(true);
            sessionStorage.setItem("fest_admin_pw", pw);
            setStoredPassword(pw);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchStats(password);
    };

    const handleRefresh = () => {
        if (storedPassword) {
            fetchStats(storedPassword);
        }
    };

    // ─── Auto-refresh every 15s ─────────────────────────────────────────
    useEffect(() => {
        if (!authenticated || !storedPassword) return;
        const interval = setInterval(() => fetchStats(storedPassword), 15000);
        return () => clearInterval(interval);
    }, [authenticated, storedPassword, fetchStats]);

    // ─── Login Screen ───────────────────────────────────────────────────
    if (!authenticated) {
        return (
            <div className="relative min-h-screen">
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

                <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
                    <div className="w-full max-w-sm">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                            <div className="mb-6 text-center">
                                <div className="mb-2 text-4xl">🔒</div>
                                <h1 className="text-xl font-bold text-white">Admin Access</h1>
                                <p className="mt-1 text-sm text-white/50">
                                    Enter admin password to continue
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Admin password"
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                                    autoFocus
                                    required
                                />

                                {error && (
                                    <p className="text-center text-sm text-red-400">{error}</p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all"
                                >
                                    {loading ? "Verifying..." : "Enter Dashboard"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Dashboard ──────────────────────────────────────────────────────
    return (
        <div className="relative min-h-screen">
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

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">📊 Admin Dashboard</h1>
                        <p className="mt-1 text-sm text-white/50">
                            Vemanothsav 2026 — Entry Analytics
                        </p>
                    </div>
                    <Button
                        onClick={handleRefresh}
                        disabled={loading}
                        variant="outline"
                        className="border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    >
                        {loading ? "⟳" : "↻"} Refresh
                    </Button>
                </div>

                {stats && (
                    <>
                        {/* Stats Grid */}
                        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <StatCard
                                label="Total"
                                value={stats.total}
                                color="text-white"
                                bg="bg-white/5"
                            />
                            <StatCard
                                label="Checked In"
                                value={stats.checkedIn}
                                color="text-emerald-400"
                                bg="bg-emerald-500/10"
                                border="border-emerald-500/20"
                            />
                            <StatCard
                                label="Not Checked In"
                                value={stats.notCheckedIn}
                                color="text-orange-400"
                                bg="bg-orange-500/10"
                                border="border-orange-500/20"
                            />
                            <StatCard
                                label="Check-in Rate"
                                value={
                                    stats.total > 0
                                        ? `${Math.round((stats.checkedIn / stats.total) * 100)}%`
                                        : "0%"
                                }
                                color="text-yellow-400"
                                bg="bg-yellow-500/10"
                                border="border-yellow-500/20"
                            />
                        </div>

                        {/* Type Breakdown */}
                        <div className="mb-8 grid grid-cols-2 gap-4">
                            <StatCard
                                label="Internal"
                                value={stats.internal}
                                color="text-blue-400"
                                bg="bg-blue-500/10"
                                border="border-blue-500/20"
                            />
                            <StatCard
                                label="External"
                                value={stats.external}
                                color="text-purple-400"
                                bg="bg-purple-500/10"
                                border="border-purple-500/20"
                            />
                        </div>

                        {/* Recent Check-ins */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                            <div className="border-b border-white/10 px-5 py-4">
                                <h2 className="font-semibold text-white">
                                    Recent Check-ins
                                </h2>
                            </div>

                            {stats.recentCheckIns.length === 0 ? (
                                <div className="px-5 py-12 text-center text-white/40">
                                    No check-ins yet
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {stats.recentCheckIns.map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center justify-between gap-4 px-5 py-3"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-medium text-white truncate">
                                                    {p.name}
                                                </p>
                                                <p className="text-xs text-white/40">
                                                    {p.type === "internal"
                                                        ? `${p.usn} • ${p.department}`
                                                        : p.college}
                                                </p>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-sm text-white/70">
                                                    {p.entryTime
                                                        ? new Date(p.entryTime).toLocaleString(
                                                              "en-IN",
                                                              {
                                                                  timeZone: "Asia/Kolkata",
                                                                  timeStyle: "short",
                                                              }
                                                          )
                                                        : "—"}
                                                </p>
                                                <p className="text-xs text-white/40">
                                                    by {p.checkedInBy}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
    label,
    value,
    color,
    bg,
    border,
}: {
    label: string;
    value: string | number;
    color: string;
    bg: string;
    border?: string;
}) {
    return (
        <div
            className={`rounded-xl border ${border || "border-white/10"} ${bg} p-4 backdrop-blur-sm`}
        >
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {label}
            </p>
            <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
        </div>
    );
}
