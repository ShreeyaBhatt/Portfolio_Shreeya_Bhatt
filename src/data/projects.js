/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} period
 * @property {string} summary
 * @property {string[]} description
 * @property {string[]} highlights
 * @property {string[]} tech
 * @property {boolean} [featured]
 * @property {string} [codeUrl]
 * @property {string} [demoUrl]
 * @property {string} [demoLabel]
 * @property {string} [demoUrlSecondary]
 * @property {string} [demoLabelSecondary]
 *
 * ── Digital Lab "experiment" fields ──────────────────────────────────────
 * Derived from the summary / description / highlights above — no new facts.
 * @property {"DEPLOYED"|"SHIPPED"|"PROTOTYPE"} status
 * @property {string} system          One-line classification, e.g. "Full-Stack + ML".
 * @property {string[]} architecture  Node labels for the schematic preview diagram.
 * @property {string} problem         What the project set out to solve.
 * @property {string} approach        How it was built.
 * @property {string} contribution    The most interesting technical decision.
 * @property {string} learned         What it taught.
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "wealthnest",
    title: "WealthNest",
    category: "AI-Powered Family Investment Portfolio Tracker",
    period: "06/2026 – 07/2026",
    summary:
      "A full-stack family investment platform with role-based access, ML-driven risk prediction, and a Gemini-powered AI assistant.",
    description: [
      "WealthNest is a full-stack investment portfolio platform built for families to manage investments and transactions together, with role-based access control separating family heads, members, and administrators.",
      "The core of the platform is a set of machine learning models that classify investment risk and predict future portfolio value — multiple algorithms are compared automatically, and the best-performing model is selected without manual intervention.",
      "A Google Gemini API integration provides portfolio-aware AI assistance directly inside the app, alongside automated chart generation and PDF report exports.",
    ],
    highlights: [
      "Role-based access control for family heads, members, and administrators",
      "ML models for risk classification and future-value prediction with automatic best-model selection",
      "Google Gemini API integration for portfolio-aware AI assistance",
      "Automated charts and PDF report generation",
    ],
    tech: ["Django REST", "Machine Learning", "Gemini API", "React.js", "Node.js", "Express", "MongoDB"],
    featured: true,
    codeUrl: "https://github.com/ShreeyaBhatt/WealthNest_v1.1",
    demoUrl: "https://wealthnest-client.onrender.com",
    demoLabel: "Live Demo",
    status: "DEPLOYED",
    system: "Full-Stack + ML",
    architecture: [
      "Auth / RBAC",
      "Investments",
      "Transactions",
      "Market Data",
      "ML Predictions",
      "AI Assistant",
      "Notifications",
      "MongoDB",
    ],
    problem:
      "Families managing investments together have no shared place to track holdings and transactions, and no clear read on the risk they are carrying or where a portfolio is heading.",
    approach:
      "A full-stack platform on Django REST and a React front end, with role-based access separating family heads, members, and administrators. A set of machine-learning models sits inside the product: they classify investment risk and predict future portfolio value, comparing multiple algorithms and selecting the best performer automatically.",
    contribution:
      "Automatic model selection — several algorithms are trained and compared on each run and the strongest is promoted without manual intervention — plus a Google Gemini integration that answers questions with the user's own portfolio as context.",
    learned:
      "Wiring machine learning into a real product end to end: serving predictions through an API, keeping model choice honest, and folding automated charts and PDF reports into the same flow.",
  },
  {
    slug: "spendwise",
    title: "SpendWise",
    category: "Expense Tracker System",
    period: "01/2026 – 01/2026",
    summary:
      "An expense management system shipped as two live, independently deployed versions — a Python/Streamlit data app and a vanilla-JS web app.",
    description: [
      "SpendWise manages expenses, monthly budgets, and borrowing/lending transactions, with categorisation, budget monitoring, repayment tracking, and spending analytics.",
      "It exists in two parallel implementations: a Python-based version built with Streamlit, Pandas, and Matplotlib for data management and visualization, and a web version built with plain HTML, CSS, and vanilla JavaScript focused on a responsive, dynamic UI.",
    ],
    highlights: [
      "Expense categorisation and monthly budget monitoring",
      "Borrowing/lending (repayment) tracking",
      "Spending analytics and visualization",
      "Shipped as two independently deployed, live versions",
    ],
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib", "HTML5", "CSS3", "JavaScript"],
    codeUrl: "https://github.com/ShreeyaBhatt/SpendWise_Expense_Tracker",
    demoUrl: "https://spendwiseexpensetrackerusingpython-mttyhdzjnpaltleagptftt.streamlit.app/",
    demoLabel: "Python / Streamlit App",
    demoUrlSecondary: "https://shreeyabhatt.github.io/Spendwise_Expense_Tracker_using_HTML_CSS_JS/",
    demoLabelSecondary: "Web App",
    status: "DEPLOYED",
    system: "Data App + Web",
    architecture: [
      "Expenses",
      "Budgets",
      "Borrow / Lend",
      "Analytics",
      "Streamlit UI",
      "Web UI",
    ],
    problem:
      "Everyday money management spans expenses, monthly budgets, and informal borrowing and lending — usually scattered across notes and memory with no view of where the month actually went.",
    approach:
      "One expense system built twice, on purpose: a Python version with Streamlit, Pandas, and Matplotlib for data handling and visualization, and a web version in plain HTML, CSS, and vanilla JavaScript focused on a responsive, dynamic interface. Both were deployed independently and both are live.",
    contribution:
      "Treating the two implementations as a study in trade-offs — the same features (categorisation, budget monitoring, repayment tracking, spending analytics) expressed once through a data-first lens and once through a UI-first one.",
    learned:
      "How much the tooling shapes the build: Pandas makes the analytics trivial and the interface awkward; vanilla JS is the reverse.",
  },
  {
    slug: "careerise",
    title: "CareeRise",
    category: "Job Portal & Recruitment Management System",
    period: "08/2025 – 08/2025",
    summary:
      "A console-based job portal with resume-based job matching and a custom linked-node queue for tracking matches.",
    description: [
      "CareeRise is a console-based job portal built with Core Java, JDBC, and Data Structures, backed by MySQL. It handles user authentication, resume-based job matching, job discovery, application tracking, and salary-based filtering.",
      "Matched jobs are managed through a custom queue built from linked nodes, applying Data Structures concepts directly to the application logic, and all database operations use PreparedStatements, MySQL stored procedures, and custom exceptions for reliability.",
    ],
    highlights: [
      "Resume-based job matching and salary-based filtering",
      "Custom queue built from linked nodes to manage matched jobs",
      "PreparedStatements, stored procedures, and custom exception handling",
      "Application tracking and job discovery",
    ],
    tech: ["Core Java", "JDBC", "Data Structures", "MySQL"],
    codeUrl: "https://github.com/ShreeyaBhatt/CareeRiseJobPortal",
    demoUrl: "https://drive.google.com/file/d/10kYLRJd9O2SCSgV0dtghOcXH4Mgojn6Z/view?usp=drive_link",
    demoLabel: "Demo Video",
    status: "SHIPPED",
    system: "Console System",
    architecture: [
      "Authentication",
      "Resume Matching",
      "Job Discovery",
      "Linked-Node Queue",
      "Application Tracking",
      "MySQL",
    ],
    problem:
      "A job portal has to connect a candidate's resume to relevant openings and then keep track of where every application stands — a matching and bookkeeping problem behind a plain interface.",
    approach:
      "A console application in Core Java over MySQL through JDBC, handling authentication, resume-based job matching, discovery, application tracking, and salary-based filtering. Every database call goes through PreparedStatements and MySQL stored procedures, with custom exceptions for reliability.",
    contribution:
      "Matched jobs are held in a queue built by hand from linked nodes rather than a library collection — a data-structures concept applied directly to the application logic.",
    learned:
      "Applying DSA where it actually earns its place, and writing a defensive data layer with prepared statements, stored procedures, and typed error handling.",
  },
  {
    slug: "smartcart",
    title: "SmartCart",
    category: "Supermarket & Inventory Management System",
    period: "02/2025 – 02/2025",
    summary:
      "A console-based supermarket management system with inventory tracking, cart management, and multi-mode billing.",
    description: [
      "SmartCart is a group-built supermarket management system using Core Java, OOP, and multidimensional arrays, covering product categorisation, inventory tracking, cart management, and stock validation.",
      "Billing supports discounts and conditional charges across Cash, Card, and UPI payment modes, with independently developed modules integrated into a single cohesive application.",
    ],
    highlights: [
      "Product categorisation and inventory tracking",
      "Cart management with stock validation",
      "Billing with discounts and Cash / Card / UPI payment modes",
      "Collaborative integration of independently built modules",
    ],
    tech: ["Core Java", "OOP", "Multidimensional Arrays"],
    codeUrl: "https://github.com/ShreeyaBhatt/SmartCart_SuperMarket_Management_System",
    demoUrl: "https://drive.google.com/file/d/1JN-fgFbySEvSrHFbmRL8HYHAihHnO6Pg/view?usp=drive_link",
    demoLabel: "Demo Video",
    status: "SHIPPED",
    system: "Console System",
    architecture: [
      "Catalogue",
      "Inventory",
      "Cart + Stock Check",
      "Billing",
      "Cash / Card / UPI",
    ],
    problem:
      "A supermarket needs product categorisation, live inventory, a cart that respects stock, and billing that handles discounts and different payment modes — several concerns that have to add up to one coherent till.",
    approach:
      "A group-built console system in Core Java using OOP and multidimensional arrays. Billing supports discounts and conditional charges across Cash, Card, and UPI. Each member built modules independently, which were then integrated into a single application.",
    contribution:
      "Owning a slice of the system and making it fit a shared design — the integration work of reconciling independently written modules into one build.",
    learned:
      "Collaborating on a codebase: agreeing interfaces up front so separately written parts actually compose.",
  },
  {
    slug: "payroll-management-system",
    title: "Payroll Management System",
    category: "Employee Payroll & Salary Management System",
    period: "02/2025 – 02/2025",
    summary:
      "An independently built payroll system handling salary calculation, deductions, overtime, and bonus logic.",
    description: [
      "A console-based payroll system built independently using Core Java, OOP, inheritance, encapsulation, and arrays, managing employee records and calculating salary, allowances, deductions, overtime, and bonuses.",
      "Additional functionality includes searching and sorting employee records (via Bubble Sort), automatic employee ID generation, input validation, and average salary calculation.",
    ],
    highlights: [
      "Salary, allowance, deduction, overtime, and bonus calculation",
      "Searching, sorting, and automatic employee ID generation",
      "Structured class design using inheritance and encapsulation",
      "Independently designed and implemented end to end",
    ],
    tech: ["Core Java", "OOP", "Inheritance", "Encapsulation"],
    codeUrl: "https://github.com/ShreeyaBhatt/Payroll_Management_System",
    demoUrl: "https://drive.google.com/file/d/1Sqp_ToIFUPxs0AMCd3uvWaYQG8rPZJkw/view?usp=drive_link",
    demoLabel: "Demo Video",
    status: "SHIPPED",
    system: "Console System",
    architecture: [
      "Employee Records",
      "Salary Engine",
      "Deductions / OT / Bonus",
      "Search + Sort",
      "Auto ID",
    ],
    problem:
      "Payroll is a pile of small rules — allowances, deductions, overtime, bonuses — that have to be applied consistently across every employee record and stay easy to search and audit.",
    approach:
      "A console payroll system built independently in Core Java using OOP, inheritance, encapsulation, and arrays. It manages employee records and computes salary, allowances, deductions, overtime, and bonuses, with searching and sorting (Bubble Sort), automatic employee-ID generation, input validation, and average-salary calculation.",
    contribution:
      "A structured class hierarchy that keeps each pay rule in one place, so the salary calculation reads as a sequence of well-named steps rather than one long method.",
    learned:
      "Designing with inheritance and encapsulation from the start, and implementing search and sort by hand instead of reaching for built-ins.",
  },
];

/** @param {string} slug */
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
