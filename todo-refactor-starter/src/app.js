/*
 * MISIÓN 9 · ADAPTADOR DE INTERFAZ
 * Este archivo solo lee eventos, delega las reglas a taskService.js y renderiza.
 */
import {
  crearTarea,
  agregarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "./taskService.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filters = [...document.querySelectorAll("[data-filter]")];

let tareas = ["Revisar requisitos", "Diseñar pruebas", "Refactorizar código"].map(
  (titulo, i) => crearTarea(i + 1, titulo)
);
let siguienteId = tareas.length + 1;
let filtro = "todas";

const selectores = {
  todas: (t) => t,
  pendientes: obtenerPendientes,
  terminadas: obtenerTerminadas
};

function render() {
  const visibles = selectores[filtro](tareas);

  list.innerHTML = "";
  visibles.forEach((tarea) => {
    const li = document.createElement("li");
    li.className = tarea.completada ? "task done" : "task";
    li.innerHTML = `<span class="title"></span>
      <span class="task-actions">
        <button data-toggle="${tarea.id}">${tarea.completada ? "Reabrir" : "Completar"}</button>
        <button data-delete="${tarea.id}">Eliminar</button>
      </span>`;
    li.querySelector(".title").textContent = tarea.titulo;
    list.appendChild(li);
  });

  const { total, pendientes, terminadas } = obtenerResumen(tareas);
  summary.textContent = `Total: ${total} · Pendientes: ${pendientes} · Terminadas: ${terminadas}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId++, titulo));
  input.value = "";
  message.textContent = "";
  render();
});

list.addEventListener("click", (event) => {
  const { toggle, delete: borrar } = event.target.dataset;
  if (toggle !== undefined) tareas = cambiarEstado(tareas, Number(toggle));
  else if (borrar !== undefined) tareas = eliminarTarea(tareas, Number(borrar));
  else return;
  render();
});

filters.forEach((button) =>
  button.addEventListener("click", () => {
    filtro = button.dataset.filter;
    filters.forEach((b) => b.classList.toggle("active", b === button));
    message.textContent = "";
    render();
  })
);

render();