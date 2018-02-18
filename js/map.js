'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeFormAddress = document.querySelector('#address');
  var popup;
  var pinList;
  var RESTRICTION_OF_MOVEMENT = {
    LOCATION_X: {
      MIN: 300,
      MAX: 900,
    },
    LOCATION_Y: {
      MIN: 150,
      MAX: 500,
    },
  };
  var PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 74
  };

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

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var positionY = mainPin.offsetTop - shift.y;
      var positionX = mainPin.offsetLeft - shift.x;

      if (positionY < RESTRICTION_OF_MOVEMENT.LOCATION_Y.MIN) {
        positionY = RESTRICTION_OF_MOVEMENT.LOCATION_Y.MIN;
      } else if (positionY > RESTRICTION_OF_MOVEMENT.LOCATION_Y.MAX) {
        positionY = RESTRICTION_OF_MOVEMENT.LOCATION_Y.MAX;
      }

      if (positionX < RESTRICTION_OF_MOVEMENT.LOCATION_X.MIN) {
        positionX = RESTRICTION_OF_MOVEMENT.LOCATION_X.MIN;
      } else if (positionX > RESTRICTION_OF_MOVEMENT.LOCATION_X.MAX) {
        positionX = RESTRICTION_OF_MOVEMENT.LOCATION_X.MAX;
      }

      mainPin.style.top = positionY + 'px';
      mainPin.style.left = positionX + 'px';
      noticeFormAddress.value = positionX + (PIN_SIZE.WIDTH / 2) + ', ' + (positionY + PIN_SIZE.HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
