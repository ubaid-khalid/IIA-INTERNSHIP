// ==========================================
// 1. REFACTORED FUNCTIONS (Hands-on Practice)
// ==========================================

// Traditional Function (Purana Tareeqa):
// function getGreeting(name) { return "Hello " + name; }

// Refactored Arrow Function (Modern & Short):
const getGreeting = (name) => `Welcome, ${name}!`;

// Refactored Implicit Return Arrow Function (Single-line math):
const calculateTotal = (amount) => amount + (amount * 0.10); // 10% Tax addition


// ==========================================
// 2. ARROW VS REGULAR FUNCTION ('this' Binding)
// ==========================================

const userProfile = {
  username: "Ali",

  // Regular Function: Dynamic 'this' (depends on who calls it)
  showRegular: function () {
    return `Regular Function: 'this.username' = ${this ? this.username : 'undefined'}`;
  },

  // Arrow Function: Lexical 'this' (inherits from outer scope/Window)
  showArrow: () => {
    return `Arrow Function: 'this.username' = ${this.username}`; // 'this' outer window object ko point kar raha hai
  }
};


// ==========================================
// 3. CALLBACKS WITH ARROW FUNCTIONS
// ==========================================

const studentScores = [35, 78, 92, 45, 60, 88];

// Function to render score list using .map() callback
const displayScores = (scoresArray) => {
  const listContainer = document.getElementById("score-list");
  
  // Arrow function inside .map() callback
  listContainer.innerHTML = scoresArray
    .map((score) => `<li>Student Score: <strong>${score}</strong></li>`)
    .join("");
};


// ==========================================
// 4. EVENT LISTENERS & UI INTERACTIVITY
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // A. 'this' Binding Test Buttons
  const regularBtn = document.getElementById("btn-regular");
  const arrowBtn = document.getElementById("btn-arrow");
  const outputThis = document.getElementById("output-this");

  // Regular function event listener (Is mein 'this' button element ban jata hai)
  regularBtn.addEventListener("click", function () {
    outputThis.textContent = `${userProfile.showRegular()} | Button ID: ${this.id}`;
  });

  // Arrow function event listener
  arrowBtn.addEventListener("click", () => {
    outputThis.textContent = userProfile.showArrow();
  });


  // B. Refactored Function Execution
  const calcBtn = document.getElementById("btn-calc");
  const outputRefactor = document.getElementById("output-refactor");

  calcBtn.addEventListener("click", () => {
    const nameVal = document.getElementById("user-name").value || "Guest";
    const amountVal = Number(document.getElementById("user-amount").value) || 0;

    const greeting = getGreeting(nameVal);
    const finalBill = calculateTotal(amountVal);

    outputRefactor.textContent = `${greeting} Total amount (with 10% tax): $${finalBill}`;
  });


  // C. Array Callbacks (.filter)
  const allBtn = document.getElementById("btn-all");
  const passedBtn = document.getElementById("btn-passed");

  // Show all scores initially
  displayScores(studentScores);

  allBtn.addEventListener("click", () => displayScores(studentScores));

  passedBtn.addEventListener("click", () => {
    // Arrow function passed directly inside .filter() callback
    const passedScores = studentScores.filter((score) => score >= 50);
    displayScores(passedScores);
  });

});