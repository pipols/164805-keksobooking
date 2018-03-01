'use strict';

(function () {
  var filter = [];

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  var DEBOUNCE_INTERVAL = 500;
  var FILTER_OFFERS_PRICE_LIMITS = {
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    LOW: {
      MAX: 10000
    },
    HIGH: {
      MIN: 50000
    }
  };

  housingType.addEventListener('change', function () {
    window.map.closePopup();
    debounce(filterOffers);
  });
  housingPrice.addEventListener('change', function () {
    window.map.closePopup();
    debounce(filterOffers);
  });
  housingRooms.addEventListener('change', function () {
    window.map.closePopup();
    debounce(filterOffers);
  });
  housingGuests.addEventListener('change', function () {
    window.map.closePopup();
    debounce(filterOffers);
  });
  housingFeatures.addEventListener('change', function () {
    window.map.closePopup();
    debounce(filterOffers);
  });

  var filterOffers = function () {
    filter = window.adData.filter(function (offers) {
      if (housingType.value !== 'any') {
        return offers.offer.type === housingType.value;
      }
      return filter;
    }).filter(function (offers) {
      switch (housingPrice.value) {
        case 'any':
          return offers;
        case 'middle':
          return offers.offer.price >= FILTER_OFFERS_PRICE_LIMITS.MIDDLE.MIN && offers.offer.price <= FILTER_OFFERS_PRICE_LIMITS.MIDDLE.MAX;
        case 'low':
          return offers.offer.price <= FILTER_OFFERS_PRICE_LIMITS.LOW.MAX;
        case 'high':
          return offers.offer.price >= FILTER_OFFERS_PRICE_LIMITS.HIGH.MIN;
      }
      return offers;
    }).filter(function (offers) {
      if (housingRooms.value !== 'any') {
        return offers.offer.rooms === parseInt(housingRooms.value, 10);
      }
      return filter;
    }).filter(function (offers) {
      if (housingGuests.value !== 'any') {
        return offers.offer.guests === parseInt(housingGuests.value, 10);
      }
      return filter;
    }).filter(function (offers) {
      if (filterWifi.checked) {
        return offers.offer.features.includes('wifi');
      }
      return offers;
    }).filter(function (offers) {
      if (filterDishwasher.checked) {
        return offers.offer.features.includes('dishwasher');
      }
      return offers;
    }).filter(function (offers) {
      if (filterParking.checked) {
        return offers.offer.features.includes('parking');
      }
      return offers;
    }).filter(function (offers) {
      if (filterWasher.checked) {
        return offers.offer.features.includes('washer');
      }
      return offers;
    }).filter(function (offers) {
      if (filterElevator.checked) {
        return offers.offer.features.includes('elevator');
      }
      return offers;
    }).filter(function (offers) {
      if (filterConditioner.checked) {
        return offers.offer.features.includes('conditioner');
      }
      return offers;
    });
    window.newData = filter;
    window.map.addMapPins(window.newData);
  };

  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };


})();
