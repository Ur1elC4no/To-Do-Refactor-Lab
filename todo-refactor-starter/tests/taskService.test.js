import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});
// MISIÓN 3: agrega al menos dos pruebas para agregarTarea().
describe("agregarTarea", () => {
  it("agrega la tarea al final de la colección", () => {
    const nueva = crearTarea(2, "B");

    const resultado = agregarTarea([crearTarea(1, "A")], nueva);

    expect(resultado).toHaveLength(2);
    expect(resultado[1]).toEqual(nueva);
  });

  it("no muta la colección original", () => {
    const original = [crearTarea(1, "A")];

    agregarTarea(original, crearTarea(2, "B"));

    expect(original).toHaveLength(1);
  });
});
// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
describe("buscarTarea", () => {
  const tareas = [crearTarea(1, "A"), crearTarea(2, "B")];

  it("encuentra una tarea por id existente", () => {
    expect(buscarTarea(tareas, 2)).toEqual({ id: 2, titulo: "B", completada: false });
  });

  it("devuelve undefined si el id no existe", () => {
    expect(buscarTarea(tareas, 99)).toBeUndefined();
  });
});
// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
describe("obtenerPendientes y obtenerTerminadas", () => {
  const mixtas = [
    { id: 1, titulo: "A", completada: true },
    { id: 2, titulo: "B", completada: false }
  ];

  it("obtiene solo las pendientes", () => {
    expect(obtenerPendientes(mixtas).map((t) => t.id)).toEqual([2]);
  });

  it("obtiene solo las terminadas", () => {
    expect(obtenerTerminadas(mixtas).map((t) => t.id)).toEqual([1]);
  });

  it("devuelve vacío si no hay coincidencias", () => {
    expect(obtenerTerminadas([crearTarea(1, "A")])).toEqual([]);
  });

  it("devuelve vacío con una colección vacía", () => {
    expect(obtenerPendientes([])).toEqual([]);
  });
});
// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
describe("cambiarEstado", () => {
  it("alterna el estado de la tarea indicada", () => {
    const resultado = cambiarEstado([crearTarea(1, "A")], 1);

    expect(resultado[0].completada).toBe(true);
  });

  it("no muta el original y deja intactas las otras tareas", () => {
    const tareas = [crearTarea(1, "A"), crearTarea(2, "B")];

    const resultado = cambiarEstado(tareas, 1);

    expect(tareas[0].completada).toBe(false);
    expect(resultado[1]).toEqual(tareas[1]);
  });

  it("con id inexistente no cambia nada", () => {
    const tareas = [crearTarea(1, "A")];

    expect(cambiarEstado(tareas, 99)).toEqual(tareas);
  });
});
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
describe("eliminarTarea", () => {
  const tareas = [crearTarea(1, "A"), crearTarea(2, "B")];

  it("elimina la tarea con el id indicado", () => {
    expect(eliminarTarea(tareas, 1).map((t) => t.id)).toEqual([2]);
  });

  it("con id inexistente conserva todas las tareas", () => {
    expect(eliminarTarea(tareas, 99)).toEqual(tareas);
  });

  it("con colección vacía devuelve vacío", () => {
    expect(eliminarTarea([], 1)).toEqual([]);
  });
});
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.
describe("obtenerResumen", () => {
  it("cuenta total, pendientes y terminadas", () => {
    const tareas = [
      { id: 1, titulo: "A", completada: true },
      crearTarea(2, "B")
    ];

    expect(obtenerResumen(tareas)).toEqual({ total: 2, pendientes: 1, terminadas: 1 });
  });

  it("devuelve ceros con una colección vacía", () => {
    expect(obtenerResumen([])).toEqual({ total: 0, pendientes: 0, terminadas: 0 });
  });
});

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void agregarTarea;
void buscarTarea;
void obtenerPendientes;
void obtenerTerminadas;
void cambiarEstado;
void eliminarTarea;
void obtenerResumen;
