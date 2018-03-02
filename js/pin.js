'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinElement = document.querySelector('template').content.querySelector('.map__pin');

  var generatePinsNodes = function (adData) {
    adData = adData.slice(0, 5); // !!!
    while (map.contains(document.querySelector('.map__pin:not(.map__pin--main)'))) {
      document.querySelector('.map__pin:not(.map__pin--main)').remove();
    }
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
