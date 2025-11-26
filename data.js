class Project{
  constructor(id, title, role, category, tags, shortDescription, detailLink){
    this.id = id;
    this.title = title;
    this.role = role;
    this.category = category;
    this.tags = tags;
    this.shortDescription = shortDescription;
    this.detailLink = detailLink;
  }
}

// project data separated from HTML
const projects = [
  new Project(
    1,
    "Tencent Karaoke Revamp",
    "Product Designer",
    "web",
    ["Music", "Mobile", "Growth"],
    "Rebuilt the navigation and onboarding for a leading karaoke app to improve retention.",
    "case.html?id=1"
  ),
  new Project(
    2,
    "AI Voice Companions",
    "UX Designer",
    "ai",
    ["AI", "Voice", "Prototype"],
    "Designed conversational flows and visual shells for synthetic companions powered by LLMs.",
    "case.html?id=2"
  ),
  new Project(
    3,
    "Creator Brand Kit",
    "Product Designer",
    "branding",
    ["Brand", "Guidelines", "No-code"],
    "Built a modular brand kit so creators can ship landing pages and social assets in minutes.",
    "case.html?id=3"
  ),
  new Project(
    4,
    "Fintech Onboarding",
    "Senior Product Designer",
    "web",
    ["Fintech", "KYC", "Experiment"],
    "Simplified KYC onboarding with progressive disclosure and real-time validation.",
    "case.html?id=4"
  ),
  new Project(
    5,
    "Immersive Concert Spaces",
    "Product Designer",
    "ai",
    ["3D", "AI Gen", "Research"],
    "Explored AI-assisted spatial design for immersive concert rooms inside virtual worlds.",
    "case.html?id=5"
  ),
  new Project(
    6,
    "B2B Analytics Dashboard",
    "Product Designer",
    "web",
    ["Data viz", "Dashboard", "B2B"],
    "Redesigned analytics dashboards with clear hierarchies, states, and alerting.",
    "case.html?id=6"
  )
];

// expose projects globally for main.js
window.projects = projects;
