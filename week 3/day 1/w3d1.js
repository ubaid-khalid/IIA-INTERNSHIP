/**
 * Week 3 - Day 1: JavaScript (Modern ES6) & Frontend Project Planning[cite: 1]
 * Intern: Ubaid Khalid | Trainer: Usama Qazi[cite: 1]
 */

// ==========================================
// 1. RECAP: let/const vs var & SCOPING[cite: 1]
// ==========================================

const verifyScopeRules = () => {
  // 'let' & 'const' are block-scoped[cite: 1]
  if (true) {
    let scopedLet = "Trapped in block";
    const scopedConst = "Constant value";
    var leakedVar = "Leaked from block"; // 'var' is function-scoped
  }
  
  console.log("var recap:", leakedVar); // Accessible
  // console.log(scopedLet); // Throws ReferenceError
};

verifyScopeRules();

// ==========================================
// 2. TEMPLATE LITERALS & DEFAULT PARAMETERS[cite: 1]
// ==========================================

/**
 * Creates a formatted checklist item string[cite: 1]
 * @param {string} task - Task description
 * @param {string} category - Tech category (defaults to 'General')
 */
const formatTask = (task, category = "General") => {
  return `[${category.toUpperCase()}] - ${task}`;
};

// ==========================================
// 3. FRONTEND PROJECT: TECH CHECKLIST DATA[cite: 1]
// ==========================================

const techChecklist = [
  { id: 1, category: "HTML", requirement: "Semantic elements structure (<header>, <main>, <footer>)", completed: true },
  { id: 2, category: "CSS", requirement: "Flexbox / Grid layouts and CSS variables setup", completed: true },
  { id: 3, category: "JavaScript", requirement: "ES6 Overview (let/const, template literals, default params)", completed: true },
  { id: 4, category: "Planning", requirement: "Wireframe layout planning and tech checklist setup", completed: true },
  { id: 5, category: "Git", requirement: "Repository initialized with clean descriptive commits", completed: false }
];

// ==========================================
// 4. DOM MANIPULATION & DYNAMIC RENDERING
// ==========================================

const renderChecklist = (items = []) => {
  const container = document.getElementById("checklist-container");
  if (!container) return;

  container.innerHTML = ""; // Clear existing content

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "checklist-item";

    // Template literal formatting for dynamic HTML rendering[cite: 1]
    li.innerHTML = `
      <span><strong>${item.category}:</strong> ${item.requirement}</span>
      <span class="badge ${item.completed ? 'complete' : 'pending'}">
        ${item.completed ? 'Completed' : 'Pending'}
      </span>
    `;

    container.appendChild(li);
  });
};

// Update footer dynamic copyright year using template literals[cite: 1]
const updateFooter = (author = "Ubaid Khalid") => {
  const footerText = document.getElementById("footer-text");
  if (footerText) {
    footerText.innerHTML = `&copy; ${new Date().getFullYear()} ${author}. Built for Week 3 Day 1.`;
  }
};

// Initialize page functionality on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderChecklist(techChecklist);
  updateFooter("Ubaid Khalid");
});