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
    period: "07/2026 – 08/2026",
    summary:
      "A family investment tracker across three deployed services — ML risk models trained on real Federal Reserve survey data and a Gemini assistant grounded in the family's own portfolio.",
    description: [
      "WealthNest gives a household one unified view of its investments — mutual funds, stocks, gold, FDs, PPF, and more — instead of scattering them across separate apps and spreadsheets, with role-based access separating family heads, members, and administrators. Built as a team project with Aayushi and Raghav.",
      "It runs as three independently deployed services: a React (Vite) + Redux Toolkit frontend, a Node.js/Express + MongoDB backend for auth and CRUD, and a Django REST Framework service for machine learning and analytics.",
      "The risk-classification model is trained on real data from a U.S. Federal Reserve household survey rather than synthetic numbers, and chosen by 5-fold cross-validation across kNN, Decision Tree, Random Forest, and SVM. Future-value forecasting, rebalancing alerts, goal tracking, Seaborn/Plotly/NetworkX analytics, PDF reports, and a Gemini-powered assistant grounded in the family's real portfolio round it out.",
      "Fully deployed on Render (three services) with MongoDB Atlas, backed by 37 automated tests across Jest and Django's test framework.",
    ],
    highlights: [
      "Three independently deployed services — React + Redux, Node/Express + MongoDB, Django REST ML",
      "Risk model trained on real U.S. Federal Reserve household-survey data, selected by 5-fold CV across kNN, Decision Tree, Random Forest, and SVM",
      "Future-value forecasting, automatic rebalancing alerts, and goal tracking",
      "Gemini-powered assistant grounded in the family's real portfolio data",
      "37 automated tests across Jest and Django's test framework",
    ],
    tech: ["React.js", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Django REST", "Machine Learning", "Gemini API"],
    featured: true,
    codeUrl: "https://github.com/ShreeyaBhatt/WealthNest_v1.1",
    demoUrl: "https://wealthnest-client.onrender.com",
    demoLabel: "Live Demo",
    status: "DEPLOYED",
    system: "Full-Stack + ML",
    architecture: [
      "React + Redux",
      "Auth / RBAC",
      "Node / Express API",
      "MongoDB Atlas",
      "Django ML Service",
      "Risk Model (5-fold CV)",
      "Forecast + Rebalance",
      "Gemini Assistant",
    ],
    problem:
      "A household's investments — mutual funds, stocks, gold, FDs, PPF — end up scattered across separate apps and spreadsheets, with no shared view and no clear read on the risk being carried or where the portfolio is heading.",
    approach:
      "Three independently deployed services: a React (Vite) + Redux Toolkit frontend, a Node.js/Express + MongoDB backend for auth and CRUD, and a Django REST Framework service for machine learning and analytics — all on Render with MongoDB Atlas, covered by 37 automated tests across Jest and Django.",
    contribution:
      "An honest risk model: trained on a real U.S. Federal Reserve household survey instead of synthetic numbers, and picked by 5-fold cross-validation across kNN, Decision Tree, Random Forest, and SVM — plus a Gemini assistant that answers with the family's real portfolio as context.",
    learned:
      "Wiring machine learning into a real product end to end: splitting it into services that deploy on their own, serving predictions through an API, keeping model choice honest, and testing across two stacks.",
  },
  {
    slug: "spendwise",
    title: "SpendWise",
    category: "Expense Tracker System",
    period: "01/2026 – 01/2026",
    summary:
      "An expense management system shipped as two live, independently deployed versions — a Python/Streamlit data app and a vanilla-JS web app.",
    description: [
      "SpendWise manages expenses, monthly budgets, and borrowing/lending transactions, with categorisation, budget monitoring, repayment tracking, and spending analytics. Built as a Semester III group project with Raghav and Aayushi.",
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
      "CareeRise is a console-based job portal built with Core Java, JDBC, and Data Structures, backed by MySQL — a Semester II group project with Raghav and Siya. It handles user authentication, resume-based job matching, job discovery, application tracking, and salary-based filtering.",
      "The matching engine reads each user's resume (stored as a CLOB in MySQL) and surfaces only roles where every required skill is present. Matched jobs are held in a custom queue built from linked nodes, and all database operations use PreparedStatements, a MySQL stored procedure, and custom exceptions (InvalidDataException, UserNotFoundException, MultipleLoginException) for reliability.",
    ],
    highlights: [
      "Resume-to-skill matching that only surfaces roles where every required skill is present",
      "Custom queue built from linked nodes to manage matched jobs",
      "Session tracking that blocks simultaneous duplicate logins",
      "Duplicate-application prevention, salary filtering, and applicant-count rankings",
      "PreparedStatements, stored procedures, and custom exception handling",
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
    period: "01/2025 – 02/2025",
    summary:
      "A console-based supermarket management system with inventory tracking, cart management, and multi-mode billing.",
    description: [
      "SmartCart is a Semester I group project (with Aryan, Vrutik, and a third teammate) built in Core Java with OOP and multidimensional arrays, covering product categorisation across Dairy, Snacks, Fruits, and Beverages, real-time inventory tracking, cart management, and stock validation — every cart edit or clear restores stock automatically.",
      "Billing generates itemised bills with threshold-based discounts, conditional charges, and payment-based discounts across Cash, Card, and UPI, with ANSI formatting for the console UI and a JOptionPane UPI QR simulation. Independently developed modules were integrated into a single cohesive application.",
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
      "A console-based payroll system built independently in Semester I using Core Java, OOP, inheritance, encapsulation, and arrays. A Member → Employee class hierarchy holds the records, and gross salary adds HRA (20% of basic), DA (10%), overtime pay, leave allowance, and bonus, minus Provident Fund (12%) and Professional Tax (1%).",
      "Additional functionality includes searching and sorting employee records (via Bubble Sort), automatic employee ID generation, input validation, average salary calculation, and blocking deletion while an employee is serving their notice period.",
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
