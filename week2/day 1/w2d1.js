// ======================================
// EXTERNAL JAVASCRIPT - script.js
// ======================================

// ----- VARIABLES & DATA TYPES -----
let name = "Ubaid";
let age = 23;
let isStudent = true;
let subjects = ["HTML", "CSS", "JavaScript"];

// ----- OPERATORS & EXPRESSIONS -----
let number1 = 10;
let number2 = 5;
let addition = number1 + number2;
let subtraction = number1 - number2;
let multiplication = number1 * number2;
let division = number1 / number2;

// ----- LOG VARIABLES TO CONSOLE -----
console.log("%c📦 Variables & Data Types (External JS)", "font-weight:bold;");
console.log("Name:", name, "(type:", typeof name, ")");
console.log("Age:", age, "(type:", typeof age, ")");
console.log("Student:", isStudent, "(type:", typeof isStudent, ")");
console.log("Subjects:", subjects, "(type:", typeof subjects, ")");

console.log("%c🧮 Operators & Expressions (External JS)", "font-weight:bold;");
console.log("Addition (10+5):", addition);
console.log("Subtraction (10-5):", subtraction);
console.log("Multiplication (10*5):", multiplication);
console.log("Division (10/5):", division);

// ----- DOM INTRODUCTION: LOG ELEMENTS -----
console.log("%c🌳 DOM Elements (External JS)", "font-weight:bold;");
// Log after DOM is ready (defer ensures this)
const headingEl = document.getElementById('heading');
const messageEl = document.getElementById('message');
console.log("Heading element:", headingEl);
console.log("Message element:", messageEl);
console.log("Heading textContent:", headingEl?.textContent);
console.log("Message textContent:", messageEl?.textContent);

// ----- FUNCTION FOR BUTTON (DOM MANIPULATION) -----
function showResult() {
    // Select HTML elements using their ID
    document.getElementById("heading").innerHTML = "Hello " + name;
    document.getElementById("message").innerHTML =
        "Your age is " + age +
        ". The result of 10 + 5 is " + addition;

    // Also log the update
    console.log("%c✅ DOM updated by showResult()", "font-weight:bold;");
    console.log("Heading now:", document.getElementById("heading").innerHTML);
    console.log("Message now:", document.getElementById("message").innerHTML);
}

// Make function available globally (for inline onclick)
window.showResult = showResult;

// ----- ADDITIONAL: Log that external JS is loaded -----
console.log("%c✅ External JavaScript (script.js) loaded successfully.", "font-weight:bold;");