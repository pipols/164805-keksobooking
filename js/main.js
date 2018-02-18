'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  window.firstStartPage = function (evt) {
    window.map.removeFaded();
    window.form.formEnable();
    window.form.fieldsetsState(false);
    window.map.addMapPins();
    window.form.getLocationForm(evt);
    window.map.addMapPinsEventListeners();
  };

  window.startPageHandler = function () {
    mainPin.addEventListener('mouseup', window.firstStartPage);
  };

  window.startPageHandler();
})();
