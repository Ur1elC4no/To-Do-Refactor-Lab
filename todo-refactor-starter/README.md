# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código

Responde aquí:

1. ¿Dónde almacenarías ahora el estado completada de una tarea?
Dentro de la propia tarea, como una propiedad de un objeto: { id, titulo, completada }. En legacy.js las tareas son strings y un string no puede guardar un estado. Con un objeto, el estado viaja junto con los datos de la tarea y empieza en false.

2. ¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?
Con strings habría que rehacer la estructura (arreglos paralelos o strings con formato) y reescribir todo el código que los usa. Con objetos solo se agrega una propiedad (prioridad, fecha, responsable). Las funciones que copian con spread ({ ...tarea }) siguen funcionando sin cambios.

3. ¿Qué parte del código representa datos y qué parte representa interfaz?
En legacy.js los datos son el arreglo tareas, que solo tiene strings sin estructura. La interfaz es mostrarTareas(), que usa document.querySelector e innerHTML. Están mezclados en el mismo archivo. Después del refactor, taskService.js tendrá los datos y las reglas, como funciones puras sin DOM. app.js solo leerá eventos, delegará al servicio y dibujará el resultado.

4. ¿Qué comportamiento debemos conservar durante el refactor?
El comportamiento visible para el usuario:

Se pueden agregar tareas.
Un título vacío o de solo espacios se rechaza con un mensaje.
Se puede eliminar una tarea.
Se muestra el total.
Las 3 tareas iniciales siguen apareciendo.

Cambia la estructura interna, no lo que el usuario ve y hace.

### Tres comportamientos observables que NO deben cambiar

1. Al agregar una tarea con título válido, aparece en la lista, el campo se limpia y se actualiza el total.
2. Si el título está vacío o solo tiene espacios, no se agrega y se muestra “Escribe un título antes de agregar.”
3. Al eliminar una tarea, desaparece solo esa tarea, las demás permanecen y el total se actualiza.

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

- **RED:** ¿qué prueba escribiste y por qué falló?
- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

## Pair Programming

Registra por misión quién fue **Driver** y quién **Navigator**. Intercambien roles con frecuencia y no hagan commit hasta que ambos puedan explicar el código y la prueba.
