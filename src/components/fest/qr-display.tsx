"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface QRDisplayProps {
    participantId: string;
    participantName: string;
}

export default function QRDisplay({ participantId, participantName }: QRDisplayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dataUrl, setDataUrl] = useState<string>("");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const qrUrl = `${baseUrl}/fest/p/${participantId}`;

    useEffect(() => {
        if (!canvasRef.current) return;

        QRCode.toCanvas(canvasRef.current, qrUrl, {
            width: 280,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });

        QRCode.toDataURL(qrUrl, {
            width: 600,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        }).then(setDataUrl);
    }, [qrUrl]);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="rounded-2xl bg-white p-4 shadow-lg shadow-white/10">
                <canvas ref={canvasRef} />
            </div>

            <p className="text-center text-sm text-white/60 max-w-xs">
                Show this QR code at the entry gate for verification
            </p>

            {dataUrl && (
                <a
                    href={dataUrl}
                    download={`vemanothsav-qr-${participantName.replace(/\s+/g, "-").toLowerCase()}.png`}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                    Download QR Code
                </a>
            )}
        </div>
    );
}
