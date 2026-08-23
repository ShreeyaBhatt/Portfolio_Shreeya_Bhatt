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
  },
];

/** @param {string} slug */
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
