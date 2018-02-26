'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var firstStartPage = function (evt) {
    window.map.removeFaded();
    window.form.formEnable();
    window.form.fieldsetsState(false);
    window.map.addMapPins();
    window.form.getLocationForm(evt);
    window.map.addMapPinsEventListeners();
    mainPin.removeEventListener('mouseup', firstStartPage);
  };

  var startPageHandler = function () {
    mainPin.addEventListener('mouseup', firstStartPage);
  };
  window.form.fieldsetsState(true);
  startPageHandler();
})();
