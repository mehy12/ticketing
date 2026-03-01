import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────────────────────────

export type FormData = {
    fullName: string;
    email: string;
    phone: string;
    college: string;
};

export type TransactionInfo = {
    utr: string;
    screenshotName: string | null; // store name only (File can't be serialised)
};

// ─── State ───────────────────────────────────────────────────────────────────

type RegistrationState = {
    // multi-step progress
    step: number;

    // personal info
    formData: FormData;

    // selected events (slugs)
    selectedEvents: string[];

    // payment / transaction
    utr: string;
    submitted: boolean;
    submittedAt: string | null; // ISO timestamp

    // actions
    setStep: (step: number) => void;
    setFormData: (data: Partial<FormData>) => void;
    toggleEvent: (slug: string) => void;
    clearCart: () => void;
    setUtr: (utr: string) => void;
    markSubmitted: () => void;
    resetRegistration: () => void;
};

// ─── Initial values ───────────────────────────────────────────────────────────

const initialFormData: FormData = {
    fullName: '',
    email: '',
    phone: '',
    college: '',
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useRegistrationStore = create<RegistrationState>()(
    persist(
        (set, get) => ({
            step: 1,
            formData: initialFormData,
            selectedEvents: [],
            utr: '',
            submitted: false,
            submittedAt: null,

            setStep: (step) => set({ step }),

            setFormData: (data) =>
                set((state) => ({ formData: { ...state.formData, ...data } })),

            toggleEvent: (slug) =>
                set((state) => ({
                    selectedEvents: state.selectedEvents.includes(slug)
                        ? state.selectedEvents.filter((s) => s !== slug)
                        : [...state.selectedEvents, slug],
                })),

            clearCart: () => set({ selectedEvents: [] }),

            setUtr: (utr) => set({ utr }),

            markSubmitted: () =>
                set({ submitted: true, submittedAt: new Date().toISOString() }),

            resetRegistration: () =>
                set({
                    step: 1,
                    formData: initialFormData,
                    selectedEvents: [],
                    utr: '',
                    submitted: false,
                    submittedAt: null,
                }),
        }),
        {
            name: 'ikyam-registration', // localStorage key
            storage: createJSONStorage(() => localStorage),
            // Only persist these fields — skip transient UI state
            partialize: (state) => ({
                step: state.step,
                formData: state.formData,
                selectedEvents: state.selectedEvents,
                utr: state.utr,
                submitted: state.submitted,
                submittedAt: state.submittedAt,
            }),
        }
    )
);
