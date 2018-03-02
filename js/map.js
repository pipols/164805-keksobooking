'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 74
  };

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeFormAddress = document.querySelector('#address');
  var popup;
  var pinList;
  window.adData = [];
  window.newData = [];

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

  mainPin.style.zIndex = 2;

  var dataSuccessHandler = function (response) {
    window.adData = response;
    window.map.addMapPins(window.adData);
    mapFiltersContainer.style.opacity = '1';
  };

  var dataErrorHandler = function (text) {
    window.alert.onError(text);
  };

  var removeFaded = function () {
    map.classList.remove('map--faded');
  };

  var addMapPins = function (adsArray) {
    mapPinsContainer.appendChild(window.pin.generatePinsNodes(adsArray));
    addMapPinsEventListeners();
  };

  var addMapPinsEventListeners = function () {
    pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinList.forEach(function (elem) {
      elem.addEventListener('click', openPopup);
    });
  };

  var closePopupHandler = function () {
    if (map.contains(popup)) {
      popup.classList.add('hidden');
      popup.querySelector('.popup__close').removeEventListener('click', closePopupHandler);
      document.removeEventListener('keydown', popupEscPressHandler);
    }
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopupHandler();
    }
  };

  var openPopup = function (evt) {
    var index = evt.currentTarget.getAttribute('data-pin_number');
    if (map.contains(popup)) {
      map.removeChild(popup);
    }
    if (window.newData.length) {
      map.insertBefore(window.card.renderCard(window.newData[index]), mapFiltersContainer);
    } else {
      map.insertBefore(window.card.renderCard(window.adData[index]), mapFiltersContainer);
    }
    popup = document.querySelector('.popup');
    popup.classList.remove('hidden');
    popup.querySelector('.popup__close').addEventListener('click', closePopupHandler);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
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

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var preLoadPageHandler = function (evt) {
    if (window.adData.length === 0) {
      mapFiltersContainer.style.opacity = '0';
      window.backend.download(dataSuccessHandler, dataErrorHandler);
    }
    startPage(evt);
  };

  window.startPageHandler = function () {
    window.form.fieldsetsState(true);
    mainPin.addEventListener('mouseup', preLoadPageHandler);
  };

  var startPage = function (evt) {
    window.map.removeFaded();
    window.form.formEnable();
    window.form.fieldsetsState(false);
    window.form.getLocationForm(evt);
    mainPin.removeEventListener('mouseup', preLoadPageHandler);
  };

  window.startPageHandler();

  window.map = {
    closePopupHandler: closePopupHandler,
    removeFaded: removeFaded,
    addMapPins: addMapPins,
    addMapPinsEventListeners: addMapPinsEventListeners,
    startPage: startPage
  };
})();
