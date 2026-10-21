"use strict";
// ---- Navigation toggle (mobile) ----
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", function () {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// ---- Academic planner ----
const taskForm = document.getElementById("taskForm");
if (taskForm) {
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");
  const err = document.getElementById("taskError");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");
  let tasks = [];
  try { tasks = JSON.parse(localStorage.getItem("tasks")) || []; } catch (e) { tasks = []; }

  function save() {
    try { localStorage.setItem("tasks", JSON.stringify(tasks)); } catch (e) { /* storage unavailable */ }
  }

  function render() {
    list.innerHTML = "";
    tasks.forEach(function (task) {
      const li = document.createElement("li");
      if (task.done) li.classList.add("done");

      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = task.done;
      box.setAttribute("aria-label", "Mark completed: " + task.text);
      box.addEventListener("change", function () { toggleTask(task.id); });

      const text = document.createElement("span");
      text.className = "text";
      text.textContent = task.text;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "del";
      del.textContent = "Delete";
      del.setAttribute("aria-label", "Delete task: " + task.text);
      del.addEventListener("click", function () { deleteTask(task.id); });

      li.append(box, text, del);
      list.appendChild(li);
    });
    const done = tasks.filter(function (t) { return t.done; }).length;
    count.textContent = tasks.length ? done + " of " + tasks.length + " tasks completed" : "";
    empty.hidden = tasks.length > 0;
  }

  function addTask(text) { tasks.push({ id: Date.now(), text: text, done: false }); save(); render(); }
  function toggleTask(id) {
    tasks = tasks.map(function (t) { return t.id === id ? { id: t.id, text: t.text, done: !t.done } : t; });
    save(); render();
  }
  function deleteTask(id) { tasks = tasks.filter(function (t) { return t.id !== id; }); save(); render(); }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) { err.textContent = "Type a task before adding it."; input.focus(); return; }
    err.textContent = "";
    addTask(value);
    input.value = "";
    input.focus();
  });
  render();
}

// ---- Contact form validation ----
const form = document.getElementById("contactForm");
if (form) {
  const status = document.getElementById("formStatus");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const digitsOnly = /^[0-9]+$/;

  function setError(id, message) {
    document.getElementById(id + "Error").textContent = message;
    document.getElementById(id).classList.toggle("invalid", message !== "");
    return message === "";
  }

  function validate() {
    const v = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim()
    };
    let ok = true;
    ok = setError("name", v.name ? "" : "Enter your name.") && ok;
    ok = setError("email", !v.email ? "Enter your email address." : (emailPattern.test(v.email) ? "" : "Enter a valid email, like name@example.com.")) && ok;
    ok = setError("phone", !v.phone ? "Enter your phone number." : (digitsOnly.test(v.phone) ? "" : "Use digits only, with no spaces or symbols.")) && ok;
    ok = setError("message", v.message ? "" : "Write a message.") && ok;
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    if (validate()) {
      status.textContent = "Message sent. Thank you for reaching out.";
      form.reset();
    }
  });
  ["name", "email", "phone", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () { setError(id, ""); });
  });
}
