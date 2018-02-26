'use strict';

(function () {
  var pinElement = document.querySelector('template').content.querySelector('.map__pin');

  var generatePinsNodes = function (adData) {
    var fragment = document.createDocumentFragment();

    adData.forEach(function (elem, i) {
      var pin = pinElement.cloneNode(true);

      pin.style.left = elem.location.x - 25 + 'px';
      pin.style.top = elem.location.y + 70 + 'px';
      pin.setAttribute('data-pin_number', i);
      pin.querySelector('img').src = elem.author.avatar;

      fragment.appendChild(pin);
    });
    return fragment;
  };
  window.pin = {
    generatePinsNodes: generatePinsNodes
  };
})();
