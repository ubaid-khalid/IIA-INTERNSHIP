// ==========================================
// 1. PRACTICE DEMO FUNCTIONS & SCOPE ('this')
// ==========================================

const getGreeting = (name) => `Welcome, ${name}!`;
const calculateTotal = (amount) => amount + (amount * 0.10);

const userProfile = {
  username: "Ali",
  showRegular: function () {
    return `Regular Function: 'this.username' = ${this ? this.username : 'undefined'}`;
  },
  showArrow: () => {
    return `Arrow Function: 'this.username' = ${this.username}`;
  }
};

// ==========================================
// 2. DATA STRUCTURE & STATE
// ==========================================

let tasksData = [
  {
    id: 101,
    title: "Setup Responsive CSS Grid Layout",
    priority: "high",
    completed: true,
    assignee: { name: "Ubaid Khalid", role: "Intern" },
    tags: ["CSS", "Media Queries", "Grid"]
  },
  {
    id: 102,
    title: "Array Methods Data Filtering Logic",
    priority: "high",
    completed: true,
    assignee: { name: "Ubaid Khalid", role: "Intern" },
    tags: ["JavaScript", "ES6", "Array Methods"]
  },
  {
    id: 103,
    title: "Refactor Nested Object Display",
    priority: "normal",
    completed: false,
    assignee: { name: "Usama Qazi", role: "Trainer" },
    tags: ["DOM", "Objects"]
  },
  {
    id: 104,
    title: "Cross-browser Responsive Testing",
    priority: "low",
    completed: false,
    assignee: { name: "Ubaid Khalid", role: "Intern" },
    tags: ["Testing", "CSS"]
  }
];

let currentFilter = "all";
let isUppercase = false;
let searchQuery = "";

// ==========================================
// 3. COMPUTED METRICS & DOM RENDERING
// ==========================================

const computeProjectMetrics = (tasks) => {
  const total = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = total - completedCount;
  const highPriorityCount = tasks.filter(t => t.priority === "high").length;

  return { total, completedCount, pendingCount, highPriorityCount };
};

const renderAnalytics = () => {
  const container = document.getElementById("stats-container");
  if (!container) return;

  const metrics = computeProjectMetrics(tasksData);

  container.innerHTML = `
    <div class="stat-box">
      <span class="stat-title">Total Tasks</span>
      <span class="stat-value">${metrics.total}</span>
    </div>
    <div class="stat-box">
      <span class="stat-title">Completed</span>
      <span class="stat-value" style="color: var(--accent-green)">${metrics.completedCount}</span>
    </div>
    <div class="stat-box">
      <span class="stat-title">Pending</span>
      <span class="stat-value" style="color: var(--accent-amber)">${metrics.pendingCount}</span>
    </div>
    <div class="stat-box">
      <span class="stat-title">High Priority</span>
      <span class="stat-value" style="color: var(--accent-red)">${metrics.highPriorityCount}</span>
    </div>
  `;
};

const getProcessedTasks = () => {
  let processed = [...tasksData];

  if (currentFilter === "high") {
    processed = processed.filter(task => task.priority === "high");
  } else if (currentFilter === "pending") {
    processed = processed.filter(task => !task.completed);
  } else if (currentFilter === "done") {
    processed = processed.filter(task => task.completed);
  }

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    processed = processed.filter(task => {
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchTag = task.tags.some(tag => tag.toLowerCase().includes(query));
      return matchTitle || matchTag;
    });
  }

  if (isUppercase) {
    processed = processed.map(task => ({
      ...task,
      title: task.title.toUpperCase()
    }));
  }

  return processed;
};

const renderTasks = () => {
  const container = document.getElementById("task-list-container");
  const badge = document.getElementById("task-count-badge");
  if (!container) return;

  const filteredTasks = getProcessedTasks();

  if (badge) {
    badge.textContent = `Showing ${filteredTasks.length} of ${tasksData.length} tasks`;
  }

  if (filteredTasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>🚫 No tasks found matching current criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredTasks.map(task => {
    const statusClass = task.completed ? "done" : "pending";
    const priorityClass = `priority-${task.priority}`;
    const tagsHTML = task.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join("");

    return `
      <div class="task-item ${statusClass} ${task.priority === 'high' ? 'high-priority' : ''}">
        <div class="task-main">
          <div class="task-header-row">
            <span class="task-title">${task.title}</span>
            <span class="priority-tag ${priorityClass}">${task.priority}</span>
          </div>
          <div class="task-meta">
            <span>👤 ${task.assignee.name} (${task.assignee.role})</span>
            <div class="tags-wrapper">${tagsHTML}</div>
          </div>
        </div>

        <div class="task-actions">
          <button class="btn ${task.completed ? 'btn-danger' : 'btn-success'}" onclick="toggleTaskStatus(${task.id})">
            ${task.completed ? 'Mark Pending' : 'Mark Done ✓'}
          </button>
          <button class="btn btn-outline" onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      </div>
    `;
  }).join("");
};

// State Mutations
window.toggleTaskStatus = (id) => {
  tasksData = tasksData.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  renderAnalytics();
  renderTasks();
};

window.deleteTask = (id) => {
  tasksData = tasksData.filter(task => task.id !== id);
  renderAnalytics();
  renderTasks();
};

// ==========================================
// 4. EVENT LISTENERS INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  renderAnalytics();
  renderTasks();

  // Section 1 Event Handlers (Practice)
  const regularBtn = document.getElementById("btn-regular");
  const arrowBtn = document.getElementById("btn-arrow");
  const outputThis = document.getElementById("output-this");

  regularBtn.addEventListener("click", function () {
    outputThis.textContent = `${userProfile.showRegular()} | Button ID: ${this.id}`;
  });

  arrowBtn.addEventListener("click", () => {
    outputThis.textContent = userProfile.showArrow();
  });

  const calcBtn = document.getElementById("btn-calc");
  const outputRefactor = document.getElementById("output-refactor");

  calcBtn.addEventListener("click", () => {
    const nameVal = document.getElementById("user-name").value || "Guest";
    const amountVal = Number(document.getElementById("user-amount").value) || 0;

    const greeting = getGreeting(nameVal);
    const finalBill = calculateTotal(amountVal);

    outputRefactor.textContent = `${greeting} Total bill (with 10% tax): $${finalBill.toFixed(2)}`;
  });

  // Section 2 Task Form Handling
  const addTaskForm = document.getElementById("add-task-form");
  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("task-title");
    const prioritySelect = document.getElementById("task-priority");
    const assigneeSelect = document.getElementById("task-assignee");
    const tagsInput = document.getElementById("task-tags");

    const rawTags = tagsInput.value.split(",").map(t => t.trim()).filter(t => t.length > 0);

    const newTask = {
      id: Date.now(),
      title: titleInput.value.trim(),
      priority: prioritySelect.value,
      completed: false,
      assignee: {
        name: assigneeSelect.value,
        role: assigneeSelect.value.includes("Trainer") ? "Trainer" : "Intern"
      },
      tags: rawTags.length > 0 ? rawTags : ["General"]
    };

    tasksData.unshift(newTask);
    titleInput.value = "";
    tagsInput.value = "JS, Array";

    renderAnalytics();
    renderTasks();
  });

  // Filter Buttons
  const filterButtons = [
    { id: "btn-filter-all", filter: "all" },
    { id: "btn-filter-high", filter: "high" },
    { id: "btn-filter-pending", filter: "pending" },
    { id: "btn-filter-done", filter: "done" }
  ];

  filterButtons.forEach(btnObj => {
    const btnEl = document.getElementById(btnObj.id);
    if (btnEl) {
      btnEl.addEventListener("click", () => {
        document.querySelectorAll(".btn-tab").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
        currentFilter = btnObj.filter;
        renderTasks();
      });
    }
  });

  // Transformation Actions
  document.getElementById("btn-uppercase").addEventListener("click", () => {
    isUppercase = true;
    renderTasks();
  });

  document.getElementById("btn-reset-transform").addEventListener("click", () => {
    isUppercase = false;
    renderTasks();
  });

  // Real-time Search Input
  document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderTasks();
  });
});