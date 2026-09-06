import competitionJson from "./competition.json";

const getPrizePool = (competition) => {
 const prizePoolDetail = competition.details?.find((detail) =>
  /prize\s*pool|price\s*pool/i.test(detail)
 );

 return Number(prizePoolDetail?.replace(/[^\d]/g, "")) || 0;
};

const topCompetitions = [...competitionJson.competitionsData]
 .sort((a, b) => getPrizePool(b) - getPrizePool(a))
 .slice(0, 3);

const domeEvents = [
 {
  id: "ai-summit",
  type: "event",
  title: "AI Summit",
  category: "FEATURED",
  image: "/home/dome/aisummit.jpeg",
  alt: "AI Summit",
  description: "Discover the ideas, people, and technology shaping the future of artificial intelligence at Drishti 2026.",
  details: ["Stay tuned for the complete event schedule and registration details."],
  registerOptions: [],
 },
 {
  id: "biennale",
  type: "event",
  title: "Biennale",
  category: "FEATURED",
  image: "/home/dome/biennale.jpeg",
  alt: "Biennale",
  description: "Experience Biennale at Drishti 2026.",
  details: ["Stay tuned for the complete event schedule and registration details."],
  registerOptions: [],
 },
];

export const featuredEvents = [...topCompetitions, ...domeEvents];
