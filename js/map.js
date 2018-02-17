'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var popup;
  var pinList;

  window.map = {
    removeFaded: function () {
      map.classList.remove('map--faded');
    },

    addMapPins: function () {
      mapPinsContainer.appendChild(window.generatePinsNodes(window.similarAds));
    },

    addMapPinsEventListeners: function () {
      pinList = document.querySelectorAll('.map__pin');
      pinList.forEach(function (elem) {
        elem.addEventListener('click', openPopup);
      });
    },
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', closePopup);
  };

  // открываем popup при нажатии на pin
  var openPopup = function (evt) {
    var index = evt.currentTarget.getAttribute('data-pin_number');
    if (map.contains(popup)) {
      map.removeChild(popup);
    }
    map.insertBefore(window.renderCard(window.similarAds[index]), mapFiltersContainer);
    popup = document.querySelector('.popup');
    popup.classList.remove('hidden');
    window.form.getLocationForm(evt);
    popup.querySelector('.popup__close').addEventListener('click', closePopup);
  };

  mainPin.addEventListener('mouseup', window.firstStartPage);
})();
