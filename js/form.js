'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormAddress = document.querySelector('#address');
  var noticeFormType = document.querySelector('#type');
  var noticeFormPrice = document.querySelector('#price');
  var noticeFormRoomNumber = document.querySelector('#room_number');
  var noticeFormCapacity = document.querySelector('#capacity');
  var noticeFormTimein = document.querySelector('#timein');
  var noticeFormTimeout = document.querySelector('#timeout');
  var noticeFormFieldsets = document.querySelectorAll('fieldset');
  var noticeFormReset = document.querySelector('.form__reset');
  var map = document.querySelector('.map');
  var TYPE_MIN_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  var ROOMS_AND_CAPACITY = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var ROOMS_AND_CAPACITY_SELECTED_SYNC = {
    1: [2],
    2: [2],
    3: [2],
    100: [3]
  };
  var PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 74
  };
  var mainPin = document.querySelector('.map__pin--main');
  var getLocationForm = function () {
    noticeFormAddress.value = mainPin.offsetLeft + (PIN_SIZE.WIDTH / 2) + ', ' + (mainPin.offsetTop + PIN_SIZE.HEIGHT);
  };

  var formEnable = function () {
    noticeForm.classList.remove('notice__form--disabled');
  };

  var fieldsetsState = function (state) {
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = state;
    });
  };

  noticeFormType.addEventListener('change', function (evt) {
    var value = evt.currentTarget.value;
    noticeFormPrice.min = TYPE_MIN_PRICE[value];
  });

  noticeFormTimein.addEventListener('change', function (evt) {
    noticeFormTimeout.selectedIndex = evt.currentTarget.selectedIndex;
  });

  noticeFormTimeout.addEventListener('change', function (evt) {
    noticeFormTimein.selectedIndex = evt.currentTarget.selectedIndex;
  });

  noticeFormRoomNumber.addEventListener('change', function (evt) {
    Array.from(noticeFormCapacity.options).forEach(function (elem) { // закрываем все, потом открываем нужные
      elem.disabled = true;
    });
    var roomsValue = evt.currentTarget.value;
    noticeFormCapacity.selectedIndex = ROOMS_AND_CAPACITY_SELECTED_SYNC[roomsValue][0];
    ROOMS_AND_CAPACITY[roomsValue].forEach(function (elem) {
      noticeFormCapacity.querySelector('[value=\'' + elem + '\']').disabled = false;
    });
  });

  noticeFormReset.addEventListener('click', function () {
    pageReset();
  });

  var pageReset = function () {
    noticeForm.reset();
    document.querySelector('.map').classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    window.form.fieldsetsState(true);
    while (map.contains(document.querySelector('.map__pin:not(.map__pin--main)'))) {
      document.querySelector('.map__pin:not(.map__pin--main)').remove();
    }
    if (map.contains(document.querySelector('.popup'))) {
      map.removeChild(document.querySelector('.popup'));
    }

    window.startPageHandler();
  };

  var submitSuccessHandler = function () {
    window.alert.onSuccess('Форма отправлена');
    pageReset();
  };

  var submitErrorHandler = function () {
    window.alert.onError('Ошибка отправки формы');
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), submitSuccessHandler, submitErrorHandler);

  };

  noticeForm.addEventListener('submit', submitHandler);

  window.form = {
    getLocationForm: getLocationForm,
    formEnable: formEnable,
    fieldsetsState: fieldsetsState
  };
})();
