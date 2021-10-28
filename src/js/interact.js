  // import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js';
  // import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js';
  // import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js';
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js';

/* Esto lo saqué de la librería interact.js */

/* AGRANDAR LA IMAGEN CON GESTOS TÁCTILES */

function dragMoveListener (event) {
  let target = event.target
  // Guardamos la info de los atributos data-x/data-y
  let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // Se translada el elemento
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // Actualizamos la posición de en los atributos
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

let angleScale = {
  angle: 0,
  scale: 1,
}
let gestureArea = document.getElementById('gestureArea')
let scaleElement = document.getElementById('scaleElement')

interact(gestureArea)
  .gesturable({
    listeners: {
      start (event) {
        angleScale.angle -= event.angle
      },
      move (event) {
        let currentAngle = event.angle + angleScale.angle
        let currentScale = event.scale * angleScale.scale

        scaleElement.style.transform = `
          rotate(${currentAngle}deg) scale(${currentScale})`;
        dragMoveListener(event)
      },
      end (event) {
        angleScale.angle = angleScale.angle + event.angle
        angleScale.scale = angleScale.scale * event.scale
      }
    }
  })
  .draggable({
    listeners: { move: dragMoveListener },
    inertia: true,
  })
