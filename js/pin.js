'use strict';

(function () {
  var pinElement = document.querySelector('template').content.querySelector('.map__pin');


  window.generatePinsNodes = function (adData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adData.length; i++) { // прогнать через forEach нельзя. Смотреть 16 строку.
      var pin = pinElement.cloneNode(true);

      pin.style.left = adData[i].location.x - 25 + 'px';
      pin.style.top = adData[i].location.y + 70 + 'px';
      pin.setAttribute('data-pin_number', i); // !
      pin.querySelector('img').src = adData[i].author.avatar;

      fragment.appendChild(pin);
    }
    return fragment;
  };
})();
