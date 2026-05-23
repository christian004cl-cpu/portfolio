export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "p01",
    index: "01",
    title: "Konko.IA",
    client: "Konko",
    year: "2026",
    tags: ["Motion", "Web", "Responsive"],
    image: "/konko-hover.png",
    href: "#",
  },
  {
    id: "p02",
    index: "02",
    title: "Pro",
    client: "Rappi Inc.",
    year: "2026",
    tags: ["Membership", "App", "Strategy"],
    image: "/pro-app.png",
    href: "#",
  },
  {
    id: "p03",
    index: "03",
    title: "Mustache",
    client: "Rappi INC.",
    year: "2024",
    tags: ["Design System", "Foundations", "Semantics"],
    image: "/mustache-hero-bigot.webp",
    href: "https://diegovz.com/projects/mustache-ds/",
  },
  {
    id: "p04",
    index: "04",
    title: "Zira Freelance",
    client: "Zira Agency",
    year: "2024",
    tags: ["App", "Mobile First", "Web"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "p05",
    index: "05",
    title: "Decorlux",
    client: "Decor",
    year: "2024",
    tags: ["Mobile First", "Web"],
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "p06",
    index: "06",
    title: "Cirkula",
    client: "Cirkula",
    year: "2023",
    tags: ["E-commerce", "Design System", "App", "Strategy"],
    image: "/hover-cirkula.png",
    href: "#",
  },
];
