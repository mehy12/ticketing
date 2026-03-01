export interface Tournament {
    slug: string;
    game: "valorant" | "bgmi";
    title: string;
    rules: string[];
    prizes: { position: string; amount: string }[];
}

const tournaments: Tournament[] = [
    {
        slug: "valorant",
        game: "valorant",
        title: "Valorant Championship",
        rules: [
            "5v5 Team Format",
            "Double Elimination Bracket",
            "Best of 3 Matches",
            "Map Veto System",
        ],
        prizes: [
            { position: "1st Place", amount: "₹25,000" },
            { position: "2nd Place", amount: "₹15,000" },
            { position: "3rd Place", amount: "₹10,000" },
        ],
    },
    {
        slug: "bgmi",
        game: "bgmi",
        title: "BGMI Esports Tournament",
        rules: [
            "Squad Format (1-4 Players)",
            "Top 10 Teams Advance",
            "3 Matches — Best Overall Score",
            "Tiebreaker by Placement Points",
        ],
        prizes: [
            { position: "1st Place", amount: "₹7,500" },
            { position: "2nd Place", amount: "₹5,000" },
            { position: "3rd Place", amount: "₹2,500" },
        ],
    },
];

export function getTournamentData(slug: string): Tournament | undefined {
    return tournaments.find((t) => t.slug === slug);
}
