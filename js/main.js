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
    offStartPageHandler();
  };

  var startPageHandler = function () {
    mainPin.addEventListener('mouseup', window.firstStartPage);
  };

  var offStartPageHandler = function () {
    mainPin.removeEventListener('mouseup', window.firstStartPage);
  };

  startPageHandler();
})();
