/**
 * Week 3 - Day 3: Modern JavaScript Array & Object Manipulation Project
 * Intern: Ubaid Khalid | Trainer: Usama Qazi
 */

// ==========================================
// 1. INITIAL OBJECT & ARRAY DATA STRUCTURES
// ==========================================

// Global state holding tasks array (Nested Objects & Arrays)
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

// Active State Variables
let currentFilter = "all";
let isUppercase = false;
let searchQuery = "";

// ==========================================
// 2. COMPUTED METRICS VIA OBJECT & ARRAY REDUCTION
// ==========================================

/**
 * Calculates project statistics dynamically using array methods (filter, reduce)
 */
const computeProjectMetrics = (tasks) => {
  const total = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = total - completedCount;
  const highPriorityCount = tasks.filter(t => t.priority === "high").length;

  return {
    total,
    completedCount,
    pendingCount,
    highPriorityCount
  };
};

/**
 * Renders Dashboard Analytics Stats
 */
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

// ==========================================
// 3. TASK LIST RENDERING (MAP & FILTER METHODS)
// ==========================================

/**
 * Filters and transforms the tasks array based on user input
 */
const getProcessedTasks = () => {
  let processed = [...tasksData];

  // 1. Apply Filter (Array.filter)
  if (currentFilter === "high") {
    processed = processed.filter(task => task.priority === "high");
  } else if (currentFilter === "pending") {
    processed = processed.filter(task => !task.completed);
  } else if (currentFilter === "done") {
    processed = processed.filter(task => task.completed);
  }

  // 2. Apply Search Query (Array.filter)
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    processed = processed.filter(task => {
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchTag = task.tags.some(tag => tag.toLowerCase().includes(query));
      return matchTitle || matchTag;
    });
  }

  // 3. Apply Map Transformation (Array.map)
  if (isUppercase) {
    processed = processed.map(task => ({
      ...task,
      title: task.title.toUpperCase()
    }));
  }

  return processed;
};

/**
 * Renders the processed tasks list into the DOM
 */
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
        <p>🚫 No tasks found matching current filters or search criteria.</p>
      </div>
    `;
    return;
  }

  // Generate HTML using Array.map & Array.join
  container.innerHTML = filteredTasks.map(task => {
    const statusClass = task.completed ? "done" : "pending";
    const priorityClass = `priority-${task.priority}`;
    
    // Format Tags Array using Array.map
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

// ==========================================
// 4. DATA MUTATION FUNCTIONS (PUSH, SPLICE, TOGGLE)
// ==========================================

/**
 * Toggle task completion status
 */
window.toggleTaskStatus = (id) => {
  tasksData = tasksData.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  // Re-render UI & Analytics
  renderAnalytics();
  renderTasks();
};

/**
 * Delete task from Array using filter()
 */
window.deleteTask = (id) => {
  tasksData = tasksData.filter(task => task.id !== id);
  renderAnalytics();
  renderTasks();
};

// ==========================================
// 5. EVENT LISTENERS & INTERACTIVITY
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Initial Page Render
  renderAnalytics();
  renderTasks();

  // Form Submit: Add New Task
  const addTaskForm = document.getElementById("add-task-form");
  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("task-title");
    const prioritySelect = document.getElementById("task-priority");
    const assigneeSelect = document.getElementById("task-assignee");
    const tagsInput = document.getElementById("task-tags");

    const rawTags = tagsInput.value.split(",").map(t => t.trim()).filter(t => t.length > 0);

    // Create New Object
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

    // Add to Array (Push)
    tasksData.unshift(newTask);

    // Reset Form
    titleInput.value = "";
    tagsInput.value = "JS, Array";

    // Refresh UI
    renderAnalytics();
    renderTasks();
  });

  // Filter Tab Buttons (filter())
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
        // Update active class
        document.querySelectorAll(".btn-tab").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");

        currentFilter = btnObj.filter;
        renderTasks();
      });
    }
  });

  // Uppercase Transformation Button (map())
  document.getElementById("btn-uppercase").addEventListener("click", () => {
    isUppercase = true;
    renderTasks();
  });

  document.getElementById("btn-reset-transform").addEventListener("click", () => {
    isUppercase = false;
    renderTasks();
  });

  // Search Input (Real-time Filter)
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderTasks();
  });
});
