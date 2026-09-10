// --- Initial Project Data ---
let userProfile = {
  name: "Ubaid Khalid",
  role: "Frontend Intern",
  location: "Rawalpindi, PK",
  contacts: ["ubaidkhalid333@example.com", "+923151535565", "LinkedIn: /in/ubaid"],
  skills: ["HTML", "CSS", "JavaScript"]
};

const extraStats = {
  experience: "Fresh Graduate",
  projectsCompleted: 5
};

// --- DOM Connections ---
const nameEl = document.getElementById("user-name");
const roleEl = document.getElementById("user-role");
const locationEl = document.getElementById("user-location");
const skillsListEl = document.getElementById("skills-list");
const logBoxEl = document.getElementById("log-box");

const skillInput = document.getElementById("skill-input");
const addSkillBtn = document.getElementById("add-skill-btn");
const showContactBtn = document.getElementById("show-contact-btn");
const mergeStatsBtn = document.getElementById("merge-stats-btn");

// --- Day 4 Core Logic & Refactoring ---

// 1. Refactored Function using Object Destructuring in Parameters
function renderProfile({ name, role, location, skills }) {
  // Direct access to object properties via destructuring
  nameEl.textContent = name;
  roleEl.textContent = `Role: ${role}`;
  locationEl.textContent = `Location: ${location}`;

  skillsListEl.innerHTML = skills
    .map(skill => `<span class="tag">${skill}</span>`)
    .join("");
}

// 2. Refactored Data Handling using Spread Operator (...)
function addSkill(newSkill) {
  if (!newSkill.trim()) return;

  // Immutably updating data using Array & Object Spread
  userProfile = {
    ...userProfile,
    skills: [...userProfile.skills, newSkill] // Adding new item via spread
  };

  renderProfile(userProfile);
  logBoxEl.textContent = `Added skill: "${newSkill}" using Spread Operator.`;
  skillInput.value = "";
}

// 3. Array Destructuring & Rest Operator (...)
function displayContactDetails() {
  // Destructuring array: primary item + rest items gathered into secondary
  const [primaryEmail, ...otherContacts] = userProfile.contacts;

  logBoxEl.innerHTML = `
    <strong>Primary:</strong> ${primaryEmail} <br>
    <strong>Rest:</strong> ${otherContacts.join(" | ")}
  `;
}

// 4. Object Merging with Spread Operator
function mergeStats() {
  // Merging two objects into a new one using Object Spread
  const mergedProfile = { ...userProfile, ...extraStats };

  // Destructuring newly merged values
  const { experience, projectsCompleted } = mergedProfile;

  logBoxEl.innerHTML = `
    <strong>Experience:</strong> ${experience} <br>
    <strong>Projects Completed:</strong> ${projectsCompleted}
  `;
}

// --- Connecting UI Events to Functions ---
addSkillBtn.addEventListener("click", () => addSkill(skillInput.value));
showContactBtn.addEventListener("click", displayContactDetails);
mergeStatsBtn.addEventListener("click", mergeStats);

// Initial Execution
renderProfile(userProfile);