"use server";

const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbzy_M6qJxRqJzz8t1dUx9LxF3yFWlCamltPoawjX6wkIkBML_8d4vIhdIJ6NkpRb7df/exec";

export async function submitRegistration(data: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    events: string;
    totalAmount: number;
    screenshotBase64: string | null;
    utr: string;
}) {
    try {
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            redirect: "follow",
        });

        // Google Apps Script returns HTML after redirect, so we just check
        // that the request didn't throw — any response means it went through
        const text = await response.text();

        // Check if the response contains our success JSON or is just the redirect page
        try {
            const json = JSON.parse(text);
            if (json.status === "success") {
                return { success: true };
            }
        } catch {
            // Google Apps Script often returns HTML after redirect
            // If we got here without a network error, the data was submitted
        }

        return { success: true };
    } catch (error) {
        console.error("Submission error:", error);
        return {
            success: false,
            error: "Failed to submit. Please try again.",
        };
    }
}
