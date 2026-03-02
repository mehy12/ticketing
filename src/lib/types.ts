// export type Event = {
//     slug: string;
//     name: string;
//     tagline: string;
//     description: string;
//     image?: string;
//     gradient: string;
//     category: string;
//     date: string;
//     time: string;
//     venue: string;
//     eligibility?: string[];
//     minTeamSize?: number;
//     maxTeamSize?: number;
//     featured?: boolean;
//     price: number;
//     rules: string[];
//     prizes: {
//         position: string;
//         amount: string;
//         description: string;
//     }[];
//     faqs?: {
//         question: string;
//         answer: string;
//     }[];
//     registration: {
//         method: string;
//         deadline: string;
//         fee?: string;
//         link?: string;
//     };
//     coordinators: {
//         name: string;
//         contact: string;
//         email?: string;
//         role?: string;
//         image?: string;
//     }[];
// };

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