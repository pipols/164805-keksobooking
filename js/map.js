'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeFormAddress = document.querySelector('#address');
  var popup;
  var pinList;
  window.adData = [];

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

  var ESC_KEYCODE = 27;
  var PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 74
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

  var closePopup = function () {
    if (map.contains(popup)) {
      popup.classList.add('hidden');
      popup.querySelector('.popup__close').removeEventListener('click', closePopup);
      document.removeEventListener('keydown', PopupEscPressHandler);
    }
  };

  var PopupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function (evt) {
    var index = evt.currentTarget.getAttribute('data-pin_number');
    if (map.contains(popup)) {
      map.removeChild(popup);
    }
    map.insertBefore(window.card.renderCard(window.adData[index]), mapFiltersContainer);
    popup = document.querySelector('.popup');
    popup.classList.remove('hidden');
    popup.querySelector('.popup__close').addEventListener('click', closePopup);
    document.addEventListener('keydown', PopupEscPressHandler);
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

  var preLoadPage = function (evt) {
    if (window.adData.length === 0) {
      startPage(evt);
      mapFiltersContainer.style.opacity = '0';
      window.backend.download(dataSuccessHandler, dataErrorHandler);
    } else {
      startPage(evt);
    }
  };

  window.startPageHandler = function () {
    window.form.fieldsetsState(true);
    mainPin.addEventListener('mouseup', preLoadPage);
  };

  var startPage = function (evt) {
    window.map.removeFaded();
    window.form.formEnable();
    window.form.fieldsetsState(false);
    window.form.getLocationForm(evt);
    mainPin.removeEventListener('mouseup', preLoadPage);
  };

  window.startPageHandler();

  window.map = {
    closePopup: closePopup,
    removeFaded: removeFaded,
    addMapPins: addMapPins,
    addMapPinsEventListeners: addMapPinsEventListeners,
    startPage: startPage
  };
})();
