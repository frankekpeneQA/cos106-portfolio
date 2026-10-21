"use strict";

const root = document.body;
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("main-nav");
const themeToggle = document.getElementById("themeToggle");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeToggle) {
    const icon = themeToggle.querySelector(".theme-toggle__icon");
    if (icon) {
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(current);
  });
}

const taskForm = document.getElementById("taskForm");
if (taskForm) {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskError = document.getElementById("taskError");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");

  let tasks = [];

  try {
    tasks = JSON.parse(localStorage.getItem("study_tasks")) || [];
  } catch (error) {
    tasks = [];
  }

  function saveTasks() {
    localStorage.setItem("study_tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
      const item = document.createElement("li");
      if (task.done) item.classList.add("done");

      const left = document.createElement("div");
      left.className = "task-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", "Mark task as complete: " + task.text);
      checkbox.addEventListener("change", function () {
        toggleTask(task.id);
      });

      const text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.text;

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "del";
      delBtn.textContent = "Delete";
      delBtn.setAttribute("aria-label", "Delete task: " + task.text);
      delBtn.addEventListener("click", function () {
        deleteTask(task.id);
      });

      left.appendChild(checkbox);
      left.appendChild(text);
      item.appendChild(left);
      item.appendChild(delBtn);
      taskList.appendChild(item);
    });

    const completed = tasks.filter(function (task) {
      return task.done;
    }).length;

    count.textContent = tasks.length ? completed + " of " + tasks.length + " tasks completed" : "";
    empty.hidden = tasks.length > 0;
  }

  function addTask(text) {
    tasks.push({ id: Date.now(), text: text, done: false });
    saveTasks();
    renderTasks();
  }

  function toggleTask(id) {
    tasks = tasks.map(function (task) {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    saveTasks();
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    saveTasks();
    renderTasks();
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const value = taskInput.value.trim();

    if (!value) {
      taskError.textContent = "Type a task before adding it.";
      taskInput.focus();
      return;
    }

    taskError.textContent = "";
    addTask(value);
    taskInput.value = "";
    taskInput.focus();
  });

  renderTasks();
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const status = document.getElementById("formStatus");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const digitsOnly = /^[0-9]+$/;

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "Error");

    if (field) field.classList.toggle("invalid", message !== "");
    if (error) error.textContent = message;
    return message === "";
  }

  function validateForm() {
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      phone: contactForm.phone.value.trim(),
      message: contactForm.message.value.trim()
    };

    let ok = true;
    ok = setError("name", formData.name ? "" : "Enter your name.") && ok;
    ok = setError("email", !formData.email ? "Enter your email address." : (emailPattern.test(formData.email) ? "" : "Enter a valid email address.")) && ok;
    ok = setError("phone", !formData.phone ? "Enter your phone number." : (digitsOnly.test(formData.phone) ? "" : "Use digits only, with no spaces or symbols.")) && ok;
    ok = setError("message", formData.message ? "" : "Write a message.") && ok;

    return ok;
  }

  contactForm.addEventListener("submit", function (event) {
    if (!validateForm()) {
      event.preventDefault();
      return;
    }

    status.textContent = "Sending your message...";
  });

  ["name", "email", "phone", "message"].forEach(function (fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("input", function () {
        setError(fieldId, "");
      });
    }
  });
}
