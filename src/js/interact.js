  // import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js';
  // import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js';
  // import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js';
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js';

/* Esto lo saqué de la librería interact.js */

/* AGRANDAR LA IMAGEN CON GESTOS TÁCTILES */

function dragMoveListener (event) {
  var target = event.target
  // Guardamos la info de los atributos data-x/data-y
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // Se translada el elemento
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // Actualizamos la posición de en los atributos
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

var angleScale = {
  angle: 0,
  scale: 1
}
var gestureArea = document.getElementById('gestureArea')
var scaleElement = document.getElementById('scaleElement')
var resetTimeout

interact(gestureArea)
  .gesturable({
    listeners: {
      start (event) {
        angleScale.angle -= event.angle

        clearTimeout(resetTimeout)
        scaleElement.classList.remove('reset')
      },
      move (event) {
        var currentAngle = event.angle + angleScale.angle
        var currentScale = event.scale * angleScale.scale

        scaleElement.style.transform = `
          rotate(${currentAngle}deg) scale(${currentScale}) translateX(-50%)`;
        dragMoveListener(event)
      },
      end (event) {
        angleScale.angle = angleScale.angle + event.angle
        angleScale.scale = angleScale.scale * event.scale

        resetTimeout = setTimeout(reset, 5000);
        scaleElement.classList.add('reset');
      }
    }
  })
  .draggable({
    listeners: { move: dragMoveListener },
    inertia: true,
  })

function reset () {
  scaleElement.style.transform = 'scale(1)'

  angleScale.angle = 0
  angleScale.scale = 1
}