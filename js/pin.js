'use strict';

(function () {
  var NUMBER_SHOW_ADS = 5;
  var ALIGN_PIN = {
    X: 25,
    Y: 70
  };

  var map = document.querySelector('.map');
  var pinElement = document.querySelector('template').content.querySelector('.map__pin');

  var generatePinsNodes = function (adData) {
    adData = adData.slice(0, NUMBER_SHOW_ADS);
    while (map.contains(document.querySelector('.map__pin:not(.map__pin--main)'))) {
      document.querySelector('.map__pin:not(.map__pin--main)').remove();
    }
    var fragment = document.createDocumentFragment();

    adData.forEach(function (elem, i) {
      var pin = pinElement.cloneNode(true);

      pin.style.left = elem.location.x - ALIGN_PIN.X + 'px';
      pin.style.top = elem.location.y + ALIGN_PIN.Y + 'px';
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
