'use strict';

(function () {
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

  var filter = [];
  var formFilter = document.querySelector('.map__filters');

  var housingType = formFilter.querySelector('#housing-type');
  var housingPrice = formFilter.querySelector('#housing-price');
  var housingRooms = formFilter.querySelector('#housing-rooms');
  var housingGuests = formFilter.querySelector('#housing-guests');
  var housingFeatures = formFilter.querySelector('#housing-features');

  var filterWifi = formFilter.querySelector('#filter-wifi');
  var filterDishwasher = formFilter.querySelector('#filter-dishwasher');
  var filterParking = formFilter.querySelector('#filter-parking');
  var filterWasher = formFilter.querySelector('#filter-washer');
  var filterElevator = formFilter.querySelector('#filter-elevator');
  var filterConditioner = formFilter.querySelector('#filter-conditioner');

  housingType.addEventListener('change', function () {
    window.map.closePopupHandler();
    debounce(filterOffers);
  });
  housingPrice.addEventListener('change', function () {
    window.map.closePopupHandler();
    debounce(filterOffers);
  });
  housingRooms.addEventListener('change', function () {
    window.map.closePopupHandler();
    debounce(filterOffers);
  });
  housingGuests.addEventListener('change', function () {
    window.map.closePopupHandler();
    debounce(filterOffers);
  });
  housingFeatures.addEventListener('change', function () {
    window.map.closePopupHandler();
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
