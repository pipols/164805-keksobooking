'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeFormAddress = document.querySelector('#address');
  var popup;
  var pinList;
  var adData;


  var restrictionOfMovement = {
    x: {
      min: mainPin.offsetParent.offsetLeft,
      max: mainPin.offsetParent.offsetWidth,
    },
    y: {
      min: mainPin.offsetParent.offsetTop + 115,
      max: mainPin.offsetParent.offsetTop + 655,
    },
  };

  var PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 74
  };
  mainPin.style.zIndex = 2;

  var dataSuccessHandler = function (response) {
    adData = response;
  };

  var dataErrorHandler = function () {
  };

  window.backend.download(dataSuccessHandler, dataErrorHandler);

  window.map = {
    removeFaded: function () {
      map.classList.remove('map--faded');
    },

    addMapPins: function () {
      mapPinsContainer.appendChild(window.generatePinsNodes(adData));
    },

    addMapPinsEventListeners: function () {
      pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
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
    map.insertBefore(window.renderCard(adData[index]), mapFiltersContainer);
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

    var MouseMoveHandler = function (moveEvt) {
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

      if (positionY < restrictionOfMovement.y.min) {
        positionY = restrictionOfMovement.y.min;
      } else if (positionY > restrictionOfMovement.y.max) {
        positionY = restrictionOfMovement.y.max;
      }

      if (positionX < restrictionOfMovement.x.min) {
        positionX = restrictionOfMovement.x.min;
      } else if (positionX > restrictionOfMovement.x.max) {
        positionX = restrictionOfMovement.x.max;
      }

      mainPin.style.top = positionY + 'px';
      mainPin.style.left = positionX + 'px';
      noticeFormAddress.value = positionX + (PIN_SIZE.WIDTH / 2) + ', ' + (positionY + PIN_SIZE.HEIGHT);
    };

    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });
})();
