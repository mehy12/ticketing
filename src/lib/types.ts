export interface Event {
    slug: string;
    name: string;
    tagline?: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    category: string;
    image: string;
    rules: string[];
    eligibility?: string[];
    registration: Registration;
    prizes: Prize[];
    coordinators: Coordinator[];
    faqs?: { question: string; answer: string }[];
    maxTeamSize?: number;
    minTeamSize?: number;
    featured?: boolean;
    gradient: string;
    price: number;
}
export interface Coordinator {
    name: string;
    contact: string;
    email?: string;
    role?: string;
    image?: string;
}

export interface Prize {
    position: string;
    amount: string;
    description?: string;
}

export interface Registration {
    method: string;
    deadline: string;
    fee?: string;
    link?: string;
}
