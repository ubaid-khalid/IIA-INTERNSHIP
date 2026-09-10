// ======================================
// VARIABLES & DATA TYPES
// ======================================

// String
let name = "Ubaid";

// Number
let age = 23;

// Boolean
let isStudent = true;

// Array
let subjects = ["HTML", "CSS", "JavaScript"];

// Display variables in console
console.log("Name:", name);
console.log("Age:", age);
console.log("Student:", isStudent);
console.log("Subjects:", subjects);


// ======================================
// OPERATORS & EXPRESSIONS
// ======================================

let number1 = 10;
let number2 = 5;

// Arithmetic operators
let addition = number1 + number2;
let subtraction = number1 - number2;
let multiplication = number1 * number2;
let division = number1 / number2;

console.log("Addition:", addition);
console.log("Subtraction:", subtraction);
console.log("Multiplication:", multiplication);
console.log("Division:", division);


// ======================================
// DOM INTRODUCTION
// ======================================

function showResult() {

    // Select HTML elements using their ID
    document.getElementById("heading").innerHTML =
        "Hello " + name;

    document.getElementById("message").innerHTML =
        "Your age is " + age +
        ". The result of 10 + 5 is " + addition;
}