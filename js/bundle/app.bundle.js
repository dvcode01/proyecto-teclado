"use strict";

var keys = [
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
      ],
      [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"],
      ],
      [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["Ç", "}"],
      ],
      [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
      ],
      [["SPACE", "SPACE"]],
];
var mayus = false;
var shift = false;
var current = null;
renderKeyboard();

function renderKeyboard() {
  var keyboardContainer = document.querySelector('.keyboard-container');
  var empty = "<div class=\"key-empty\"></div>";
  
  // recorre los arreglos de keys hasta llegar a sus valores
  var layers = keys.map(function (layer) {
    return layer.map(function (key) {
      if (key[0] === 'SHIFT') {
        return "<button class=\"key key-shift\">".concat(key[0], "</button>");
      }

      if (key[0] === 'MAYUS') {
        return "<button class=\"key key-mayus\">".concat(key[0], "</button>");
      }

      if (key[0] === 'SPACE') {
        return "<button class=\"key key-space\"></button>";
      }

      return "<button class=\"key key-normal\">".concat(shift ? key[1] : mayus && key[0].toLowerCase().charCodeAt(0) >= 97 && key[0].toLowerCase().charCodeAt(0) <= 122 ? key[1] : key[0], "\n            </button>\n            ");
    });
  }); 
  
  // agrega espacios al final de la 1era fila y al comienzo de la 2da
  layers[0].push(empty);
  layers[1].unshift(empty);
  var htmlLayers = layers.map(function (layer) {
    return layer.join('');
  });
  keyboardContainer.innerHTML = ''; 

  // agregamos el contenedor layer a el contenedor de las teclas
  htmlLayers.forEach(function (layer) {
    keyboardContainer.innerHTML += "<div class=\"layer\">".concat(layer, "</div>");
  });
  document.querySelectorAll('.key').forEach(function (key) {
    key.addEventListener('click', function () {
      if (current) {
        if (key.textContent === 'SHIFT') {
          shift = !shift;
        } else if (key.textContent === 'MAYUS') {
          mayus = !mayus;
        } else if (key.textContent === '') {
          current.value += ' ';
        } else {
          current.value += key.textContent.trim();

          if (shift) {
            shift = false;
          }
        }

        renderKeyboard();
        current.focus();
      }
    });
  });
} 

// este evento se aplica a el input que queremos escribir
document.querySelectorAll('input').forEach(function (input) {
  input.addEventListener('focusin', function (e) {
    current = e.target;
  });
});