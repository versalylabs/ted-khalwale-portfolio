import { 
  Project, 
  ExperienceItem, 
  TechSkillCategory, 
  Article, 
  DeveloperProfile, 
  SkillItem 
} from '../types.ts';

export const defaultProfile: DeveloperProfile = {
  name: "Ted Khalwale",
  title: "Web Developer & Software Developer",
  headlineRole: "WEB DEVELOPER & SOFTWARE DEVELOPER",
  specialty: "Modern Websites · Business Management Systems · Dashboards · Custom Software",
  bio: "Software developer dedicated to crafting modern websites, reliable business management systems, interactive dashboards, and custom business applications.",
  aboutDescription: "I build modern web applications and custom software that solve real operational challenges. From intuitive client portals and business management systems to high-performance websites and operational dashboards, I write clean, maintainable, and resilient code designed to scale.",
  location: "Nairobi, Kenya & Remote",
  timezone: "EAT (UTC+3) / Global Remote",
  email: "khalwaleted@gmail.com",
  phone: "0704611033",
  photoUrl: "/ted-khalwale-cutout.png",
  github: "https://github.com/khalwaleted",
  linkedin: "https://linkedin.com/in/ted-khalwale",
  twitter: "https://x.com/tedkhalwale",
  instagram: "https://instagram.com/tedkhalwale",
  yearsExperience: 4,
  focusAreas: [
    {
      id: "websites",
      title: "Modern Websites & Web Apps",
      subtitle: "Fast, Responsive, Accessible",
      description: "Custom web applications and responsive business websites engineered with modern React and Next.js, optimized for quick loads, intuitive navigation, and clean cross-device presentation.",
      icon: "globe",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
    },
    {
      id: "business-systems",
      title: "Business Management Systems",
      subtitle: "Operations, Stock & Workflow",
      description: "Centralized business software replacing fragmented spreadsheets with automated inventory tracking, order management, point-of-sale invoicing, and role-based staff permissions.",
      icon: "briefcase",
      technologies: ["Node.js", "Express", "PostgreSQL", "REST APIs"]
    },
    {
      id: "dashboards",
      title: "Interactive Dashboards",
      subtitle: "Visual Metrics & Live Analytics",
      description: "Data visualization interfaces presenting real-time business KPIs, revenue streams, and pipeline metrics in clean, interactive charts with exportable summaries.",
      icon: "layout-dashboard",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Data Visualizations"]
    },
    {
      id: "custom-software",
      title: "Custom Business Software",
      subtitle: "Tailored Tools & SaaS-Style Products",
      description: "Bespoke digital software solutions, automated invoicing engines, client self-service portals, and structured API integrations built around exact business requirements.",
      icon: "cpu",
      technologies: ["Full-Stack", "Prisma", "PostgreSQL", "WebSockets"]
    }
  ]
};

export const masterSkills: SkillItem[] = [
  { name: "HTML & CSS", percentage: 95, icon: "html", category: "frontend" },
  { name: "JavaScript", percentage: 90, icon: "javascript", category: "language" },
  { name: "TypeScript", percentage: 88, icon: "typescript", category: "language" },
  { name: "React.js", percentage: 90, icon: "react", category: "frontend" },
  { name: "Next.js", percentage: 85, icon: "nextjs", category: "framework" },
  { name: "Tailwind CSS", percentage: 92, icon: "tailwind", category: "styling" },
  { name: "Node.js & Express", percentage: 82, icon: "nodejs", category: "backend" },
  { name: "PostgreSQL & SQL", percentage: 80, icon: "database", category: "database" },
  { name: "REST APIs & Integrations", percentage: 88, icon: "api", category: "backend" },
  { name: "Git & Version Control", percentage: 88, icon: "git", category: "tool" }
];

export const techBadges = [
  { name: "HTML5", icon: "html", color: "bg-[#e34f26]", text: "5" },
  { name: "CSS3", icon: "css", color: "bg-[#1572b6]", text: "3" },
  { name: "JavaScript", icon: "js", color: "bg-[#f7df1e] text-black", text: "JS" },
  { name: "TypeScript", icon: "ts", color: "bg-[#3178c6]", text: "TS" },
  { name: "React", icon: "react", color: "bg-[#087ea4]", text: "⚛" },
  { name: "Next.js", icon: "next", color: "bg-black border border-slate-700", text: "N" },
  { name: "Tailwind CSS", icon: "tailwind", color: "bg-[#06b6d4]", text: "≈" },
  { name: "Node.js", icon: "node", color: "bg-[#22c55e]", text: "Node" },
  { name: "Git", icon: "git", color: "bg-[#f05032]", text: "⎇" }
];

export const featuredProjects: Project[] = [
  {
    id: "retail-flow-system",
    orderNumber: "01",
    title: "RetailFlow — Business & Inventory Management System",
    category: "business",
    mockupType: "ecommerce",
    role: "Lead Full-Stack Developer",
    status: "Production Ready",
    tagline: "Comprehensive business management system for inventory, point-of-sale, and billing",
    period: "2024 · Business Management Software",
    summary: "A centralized business management system built to replace manual inventory records and paper invoices with real-time stock tracking, automated low-stock reorder alerts, and multi-user point-of-sale invoicing.",
    problem: "Retailers and distribution businesses often rely on fragmented spreadsheets and manual physical logs, leading to inventory shrinkage, stockout surprises, delayed checkout reconciliation, and lost sales.",
    solution: "Designed and implemented an all-in-one web-based operations platform with synchronized stock tracking, instant barcode lookup, automated PDF invoice generation, and role-based staff access permissions.",
    keyFeatures: [
      "Real-time inventory level tracking across warehouse and store branches",
      "Automated low-stock threshold notifications and reorder recommendation lists",
      "Point-of-sale checkout module with instant receipt and invoice generation",
      "Role-based access control separating cashier, manager, and administrator permissions",
      "End-of-day sales reconciliation and cash-drawer auditing reports"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Prisma"],
    imageUrl: "/projects/retailflow.svg",
    screenshots: [
      "/projects/retailflow.svg",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
    ],
    measurableResults: [
      { label: "Stock Visibility", value: "Real-Time" },
      { label: "Checkout Duration", value: "<45 Seconds" },
      { label: "Discrepancy Reduction", value: "Significant" }
    ],
    caseStudy: {
      challenge: "Handling concurrent sales transactions while ensuring stock quantities remained accurate without race conditions or database locks.",
      architectureSolution: "Structured transactional database operations using PostgreSQL serializable transactions and row-level locking for cart checkout events.",
      tradeoffs: "Prioritized strict data consistency and audit logging over eventual consistency to guarantee financial and inventory accuracy.",
      codeSnippet: {
        language: "typescript",
        caption: "Transactional stock decrement and receipt allocation",
        code: `export async function processSale(saleData: SaleInput) {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify and lock current stock levels
    for (const item of saleData.items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        throw new Error(\`Insufficient stock for item: \${item.name}\`);
      }
      // 2. Decrement inventory atomically
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    // 3. Create recorded sale ledger entry
    return await tx.sale.create({ data: saleData });
  });
}`
      },
      results: [
        "Eliminated inventory reconciliation errors across daily operating shifts",
        "Streamlined cashier checkout workflow and automated daily sales reporting"
      ]
    }
  },
  {
    id: "pulse-board-dashboard",
    orderNumber: "02",
    title: "PulseBoard — Operations & Analytics Dashboard",
    category: "dashboard",
    mockupType: "crypto",
    role: "Frontend & UI Engineer",
    status: "Active",
    tagline: "Interactive executive dashboard for real-time business KPIs and revenue tracking",
    period: "2024 · Interactive Dashboard",
    summary: "An interactive analytics dashboard consolidating revenue streams, customer growth rates, and operational pipeline health into clean visual representations with exportable reports.",
    problem: "Business managers and executives struggled to make timely decisions due to key performance indicators being scattered across disparate platforms, requiring manual weekly compilation.",
    solution: "Created an executive dashboard featuring dynamic charts, customizable date range filters, multi-metric KPI cards, and instant CSV/PDF report generation.",
    keyFeatures: [
      "Dynamic time-series visualizations for revenue, order volume, and customer acquisition",
      "Customizable date-range selector with automated previous-period comparisons",
      "Quick status filters for identifying stalled accounts and pending operational tasks",
      "Exportable summary reports in PDF and spreadsheet formats for stakeholders",
      "Persistent dark mode styling with accessible contrast ratios"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Recharts", "REST APIs"],
    imageUrl: "/projects/pulseboard.svg",
    screenshots: [
      "/projects/pulseboard.svg",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
    ],
    measurableResults: [
      { label: "Rendering Performance", value: "60 FPS" },
      { label: "Data Consolidation", value: "Unified View" },
      { label: "Mobile Responsiveness", value: "100%" }
    ],
    caseStudy: {
      challenge: "Rendering large time-series datasets smoothly on mobile browsers without UI lag or frame drops.",
      architectureSolution: "Implemented data windowing and debounced query state so heavy visual renders only compute when date intervals settle.",
      tradeoffs: "Pre-aggregated monthly summaries on the API layer to keep client payload sizes under 50kb.",
      codeSnippet: {
        language: "typescript",
        caption: "Debounced multi-period metrics aggregator hook",
        code: `export function useMetricsFilter(initialRange: DateRange) {
  const [range, setRange] = useState(initialRange);
  const [data, setData] = useState<MetricPoint[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      const results = await fetchMetrics(range);
      setData(results);
    }, 250);
    return () => clearTimeout(handler);
  }, [range]);

  return { range, setRange, data };
}`
      },
      results: [
        "Enabled executives to review daily performance at a glance on mobile and desktop",
        "Replaced hours of weekly manual reporting with one-click report exports"
      ]
    }
  },
  {
    id: "storefront-ecommerce",
    orderNumber: "03",
    title: "StoreFront — High-Performance E-Commerce Web App",
    category: "web",
    mockupType: "ecommerce",
    role: "Full-Stack Web Developer",
    status: "Production Ready",
    tagline: "Modern e-commerce platform with fast product discovery, cart sync, and secure checkout",
    period: "2024 · Web Application",
    summary: "A modern full-stack e-commerce web application engineered for speed, intuitive product discovery, real-time cart persistence, and secure customer payment processing.",
    problem: "Clunky template e-commerce stores often suffer from slow page transitions, broken responsive layouts on phones, and complicated multi-step checkouts that cause customer drop-offs.",
    solution: "Engineered a headless storefront with instant debounced search filtering, optimistic cart modifications, responsive product galleries, and a streamlined one-page checkout flow.",
    keyFeatures: [
      "Instant client-side product filtering by category, price, and availability",
      "Optimistic cart state updates that react immediately without waiting for server roundtrips",
      "Mobile-optimized product image carousel and detail views",
      "Stripe payment integration with encrypted checkout sessions and webhook verification",
      "Customer order status lookup and automated email order confirmations"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe API", "PostgreSQL"],
    imageUrl: "/projects/storefront.svg",
    screenshots: [
      "/projects/storefront.svg",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
    ],
    measurableResults: [
      { label: "Core Web Vitals", value: "98/100" },
      { label: "Cart Update Latency", value: "Instant (Optimistic)" },
      { label: "Mobile Experience", value: "Touch-Friendly" }
    ],
    caseStudy: {
      challenge: "Preventing cart state synchronization conflicts when shoppers browse simultaneously across tabs or on intermittent mobile networks.",
      architectureSolution: "Used local client persistence paired with debounced background synchronization to guarantee cart contents remain intact.",
      tradeoffs: "Leveraged server-side static page generation for product listings with client-side dynamic hydration for stock checks.",
      codeSnippet: {
        language: "typescript",
        caption: "Optimistic cart store with local recovery",
        code: `export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const cached = localStorage.getItem("store_cart");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      const next = existing
        ? prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
        : [...prev, { ...product, qty: 1 }];
      localStorage.setItem("store_cart", JSON.stringify(next));
      return next;
    });
  };

  return { items, addItem };
}`
      },
      results: [
        "Achieved near-instant page transitions across mobile and desktop devices",
        "Significantly improved mobile shopping usability and checkout flow completion"
      ]
    }
  },
  {
    id: "task-orbit-saas",
    orderNumber: "04",
    title: "TaskOrbit — Team Workflow & Project Collaboration Tool",
    category: "saas",
    mockupType: "taskmanager",
    role: "Full-Stack Developer",
    status: "Active",
    tagline: "Collaborative project management software with kanban boards and sprint milestones",
    period: "2024 · SaaS-Style Web Application",
    summary: "A project collaboration tool designed for high-velocity software and operational teams. Features drag-and-drop kanban boards, milestone deadlines, and activity audit trails.",
    problem: "Existing enterprise project management tools often feel bloated with steep learning curves, slow loading screens, and excessive complexity that team members actively resist using.",
    solution: "Built a focused, fluid project management app prioritizing clean visual organization, instant board updates, keyboard navigation, and clear milestone progress tracking.",
    keyFeatures: [
      "Smooth drag-and-drop kanban boards with customizable workflow columns",
      "Sprint milestone progress tracking and visual completion percentage meters",
      "Task detail drawers supporting rich descriptions, subtask checklists, and assignees",
      "Keyboard shortcut engine allowing rapid task creation and status advancement",
      "Activity timeline tracking every status change and assignment update"
    ],
    technologies: ["React", "TypeScript", "Node.js", "WebSockets", "Tailwind CSS", "PostgreSQL"],
    imageUrl: "/projects/taskorbit.svg",
    screenshots: [
      "/projects/taskorbit.svg",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80"
    ],
    measurableResults: [
      { label: "Board Interaction", value: "Drag-and-Drop" },
      { label: "Sync Overhead", value: "Sub-Second" },
      { label: "Learning Curve", value: "Zero Training" }
    ],
    caseStudy: {
      challenge: "Providing seamless drag-and-drop reordering without layout shifts or sluggish DOM updates.",
      architectureSolution: "Integrated native pointer events with optimistic client state updates, reconciling the card position with the backend asynchronously.",
      tradeoffs: "Focused on core sprint essentials (boards, tasks, checklists) rather than complicated custom scripting engines.",
      codeSnippet: {
        language: "typescript",
        caption: "Optimistic kanban card move handler",
        code: `export function handleCardMove(cardId: string, sourceCol: string, targetCol: string) {
  // 1. Immediate visual column transition
  setColumns((prev) => {
    const card = prev[sourceCol].find((c) => c.id === cardId);
    if (!card) return prev;
    return {
      ...prev,
      [sourceCol]: prev[sourceCol].filter((c) => c.id !== cardId),
      [targetCol]: [...prev[targetCol], { ...card, column: targetCol }]
    };
  });

  // 2. Persist to API in background
  api.patch(\`/tasks/\${cardId}\`, { column: targetCol });
}`
      },
      results: [
        "Reduced team onboarding time to under 10 minutes",
        "Adopted for daily sprint standups and milestone tracking"
      ]
    }
  },
  {
    id: "bill-craft-invoicing",
    orderNumber: "05",
    title: "BillCraft — Invoicing & Client Billing Software",
    category: "business",
    mockupType: "ecommerce",
    role: "Full-Stack Developer",
    status: "Production Ready",
    tagline: "Automated billing software with multi-currency support, PDF generator, and payment tracking",
    period: "2023 · Custom Business Software",
    summary: "A custom billing and invoicing web application tailored for consultants, agencies, and businesses to generate professional invoices, calculate tax rates, and track receivables.",
    problem: "Service businesses and consultants lose hours each month drafting invoices in word processors, manually calculating taxes and currency conversions, and tracking down unpaid receivables.",
    solution: "Developed an automated invoicing platform with dynamic line-item calculation, automatic tax and discount computation, client record keeping, and clean printable PDF exports.",
    keyFeatures: [
      "Custom invoice generator with company branding, tax numbers, and custom notes",
      "Multi-currency support with automatic exchange rate conversion",
      "Client directory storing payment terms, contact details, and billing histories",
      "Instant PDF invoice generation formatted for standard printing and digital dispatch",
      "Invoice status lifecycle tracking (Draft, Sent, Paid, Overdue) with reminder alerts"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    imageUrl: "/projects/billcraft.svg",
    screenshots: [
      "/projects/billcraft.svg",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
    ],
    measurableResults: [
      { label: "Invoice Creation", value: "<2 Minutes" },
      { label: "Export Format", value: "Printable PDF" },
      { label: "Currency Support", value: "Multi-Currency" }
    ],
    caseStudy: {
      challenge: "Generating consistent, clean printable PDF invoices across all major desktop and mobile browser engines.",
      architectureSolution: "Created print-optimized CSS media rules ensuring invoices export cleanly without awkward page splits or distorted font rendering.",
      tradeoffs: "Used client-side print stylesheets to enable instantaneous PDF generation without demanding heavy server-side headless browser instances.",
      codeSnippet: {
        language: "typescript",
        caption: "Invoice line-item subtotal and tax calculation",
        code: `export function calculateInvoiceTotals(items: LineItem[], taxRate: number, discount: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount;

  return { subtotal, discountAmount, taxAmount, total };
}`
      },
      results: [
        "Cut invoice drafting time from 30 minutes to under 2 minutes per client",
        "Streamlined client record-keeping and overdue payment follow-ups"
      ]
    }
  },
  {
    id: "nexus-studio-website",
    orderNumber: "06",
    title: "NexusStudio — Modern Business Portfolio & Booking Website",
    category: "web",
    mockupType: "taskmanager",
    role: "Frontend Architect",
    status: "Completed",
    tagline: "Fast, accessible business marketing website with structured SEO and lead capture",
    period: "2023 · Modern Website",
    summary: "A marketing and services website engineered to communicate business offerings clearly, load instantaneously across mobile connections, and convert visitors into qualified project leads.",
    problem: "Many service companies rely on outdated, generic template websites that take seconds to load, fail mobile accessibility checks, and lack clear call-to-actions for client inquiries.",
    solution: "Designed and coded a bespoke web presence with modern typography, subtle micro-interactions, full keyboard accessibility, Schema.org SEO, and an integrated inquiry workflow.",
    keyFeatures: [
      "Responsive layout optimized for smartphones, tablets, laptops, and ultra-wide screens",
      "Semantic HTML5 structure with complete ARIA keyboard accessibility compliance",
      "Integrated project inquiry modal with input validation and direct email routing",
      "Schema.org structured data (JSON-LD) for enhanced search engine indexing",
      "Zero layout shift (CLS) with optimized responsive image containers"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Web Performance"],
    imageUrl: "/projects/nexusstudio.svg",
    screenshots: [
      "/projects/nexusstudio.svg",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
    ],
    measurableResults: [
      { label: "Google Lighthouse", value: "100/100" },
      { label: "Page Load Time", value: "<1 Second" },
      { label: "Accessibility Score", value: "WCAG Compliant" }
    ],
    caseStudy: {
      challenge: "Achieving a distinctive, premium visual aesthetic while strictly maintaining 100/100 performance and accessibility scores.",
      architectureSolution: "Applied utility-first styling with hardware-accelerated CSS properties and zero third-party font or tracking script bloat.",
      tradeoffs: "Avoided heavy external animation libraries in favor of lightweight CSS transforms and transitions.",
      codeSnippet: {
        language: "typescript",
        caption: "Accessible modal focus trap and escape listener",
        code: `export function useModalEscape(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
}`
      },
      results: [
        "Earned top scores across Lighthouse performance, accessibility, and SEO metrics",
        "Significantly increased visitor inquiry conversions through a friction-free contact flow"
      ]
    }
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "independent-web-dev",
    role: "Independent Web & Software Developer",
    company: "Self-Employed / Client Projects",
    location: "Nairobi, Kenya & Remote",
    period: "2022 — Present",
    badge: "Current",
    description: "Architecting and developing custom business management systems, modern websites, operational dashboards, and full-stack web applications for businesses and individual clients.",
    achievements: [
      "Built and deployed bespoke inventory and business management systems tailored to client operational workflows",
      "Created high-performance responsive web applications using React, Next.js, TypeScript, and PostgreSQL",
      "Engineered administrative dashboards providing real-time data visualization and operational visibility",
      "Ensured all shipped applications meet strict performance, mobile responsiveness, and security standards"
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "Git"]
  },
  {
    id: "frontend-web-developer",
    role: "Frontend & Full-Stack Developer",
    company: "Web Solutions & Client Engagements",
    location: "Nairobi, Kenya & Remote",
    period: "2020 — 2022",
    description: "Developed modern responsive websites, interactive customer portals, and web components for diverse client requirements.",
    achievements: [
      "Translated client requirements and wireframes into clean, semantic, and accessible HTML5/CSS3/React interfaces",
      "Integrated third-party APIs, payment gateways, and automated form processing systems",
      "Improved website loading performance, mobile usability, and search engine optimization (SEO) across client sites"
    ],
    stack: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3", "Tailwind CSS", "Node.js", "REST APIs", "Git"]
  }
];

export const skillCategories: TechSkillCategory[] = [
  {
    name: "Web & Frontend Development",
    description: "Modern, responsive, and accessible user interfaces",
    skills: [
      { name: "React.js & Next.js", level: "Expert", productionHighlight: "Modular component architecture, server rendering, state management, hooks" },
      { name: "TypeScript & JavaScript", level: "Expert", productionHighlight: "Type-safe robust web code, modern ES6+ paradigms, async workflows" },
      { name: "HTML5 & Semantic Structure", level: "Expert", productionHighlight: "Accessible document outline, ARIA compliance, SEO best practices" },
      { name: "Tailwind CSS & Modern CSS", level: "Expert", productionHighlight: "Responsive design, design token systems, dark mode, micro-interactions" }
    ]
  },
  {
    name: "Backend, APIs & Databases",
    description: "Server logic, database architecture, and external integrations",
    skills: [
      { name: "Node.js & Express", level: "Advanced", productionHighlight: "RESTful API services, authentication, routing, middleware" },
      { name: "PostgreSQL & Database Design", level: "Advanced", productionHighlight: "Relational schema design, queries, Prisma ORM, data integrity" },
      { name: "REST APIs & Webhooks", level: "Advanced", productionHighlight: "Third-party service integrations, payment gateways, automated workflows" },
      { name: "Git, Version Control & CI/CD", level: "Expert", productionHighlight: "Branching strategies, GitHub, automated build checks, Vercel/Cloud deployment" }
    ]
  }
];

export const technicalArticles: Article[] = [
  {
    id: "building-business-management-systems",
    title: "Key Principles for Engineering Reliable Business Management Systems",
    date: "2024",
    readTime: "5 min read",
    category: "Software Architecture",
    summary: "How to design inventory, billing, and operational software that businesses can rely on daily without data loss or UI friction.",
    content: `When building software that businesses rely on for daily operations—such as inventory management, order tracking, and billing—reliability is the paramount requirement.
    
### 1. Data Integrity Comes First
Every transaction affecting inventory quantities or billing ledgers must be atomic. Utilizing relational databases like PostgreSQL with proper database transactions prevents partial updates and inventory mismatch.

### 2. Intuitive, Low-Friction Workflows
Staff members use operational systems for hours every day. The interface must be straightforward, keyboard-accessible, and free of unnecessary modal confirmations for common repetitive tasks.

### 3. Clear Audit Trails
Every status change, stock deduction, and payment recording should carry a verifiable audit timestamp. This gives business owners complete visibility into their operational history.`
  },
  {
    id: "optimizing-modern-web-performance",
    title: "Practical Steps for Sub-Second Modern Web Application Performance",
    date: "2024",
    readTime: "6 min read",
    category: "Web Engineering",
    summary: "Actionable techniques for eliminating layout shifts, reducing bundle sizes, and building fast, responsive web applications.",
    content: `Web performance directly impacts user engagement and conversion rates. Here are the core practices I apply to every web project:

### 1. Zero Layout Shift (CLS)
Always reserve aspect-ratio containers for images and dynamic media before they finish loading. This prevents the jarring content jumping that frustrates mobile visitors.

### 2. Strategic State Placement
Keep React state as localized as possible. Avoid lifting transient input or hover state to top-level providers, which triggers unnecessary cascade re-renders across the entire tree.

### 3. Mobile-First Responsive Design
Test on realistic mobile network speeds and small screens from day one. A website that performs flawlessly on a 4G smartphone will fly on desktop.`
  }
];
