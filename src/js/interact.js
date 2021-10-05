  // import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js';
  // import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js';
  // import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js';
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js';

//Le agrego la clase zoom cuando hago doble click en el elemento .tap-target
// interact('.tap-target')
//   .on('doubletap', (event) => {
//     event.currentTarget.classList.toggle('zoom');
//   });


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

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener



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
        // document.body.appendChild(new Text(event.scale))
        var currentAngle = event.angle + angleScale.angle
        var currentScale = event.scale * angleScale.scale

        scaleElement.style.transform =
          'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'

        // uses the dragMoveListener from the draggable demo above
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