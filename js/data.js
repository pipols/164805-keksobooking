'use strict';

(function () {
  var countAdvert = 8;
  var AD_PARAMS = {
    AVATAR: [
      'img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png',
    ],
    TITLE: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде',
    ],
    PRICE: {
      MIN: 1000,
      MAX: 1000000,
    },
    TYPE: ['flat', 'house', 'bungalo'],
    GUESTS: {
      MIN: 0,
      MAX: 10,
    },
    ROOMS: {
      MIN: 1,
      MAX: 5,
    },
    TIME: ['12:00', '13:00', '14:00'],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
    LOCATION_X: {
      MIN: 300,
      MAX: 900,
    },
    LOCATION_Y: {
      MIN: 150,
      MAX: 500,
    },
  };

  window.createAdsArray = function (count) {
    var arrayAcc = [];

    for (var i = 0; i < count; i++) {
      var locationX = window.utils.getRandomNumber(AD_PARAMS.LOCATION_X.MIN, AD_PARAMS.LOCATION_X.MAX);
      var locationY = window.utils.getRandomNumber(AD_PARAMS.LOCATION_Y.MIN, AD_PARAMS.LOCATION_Y.MAX);
      var time = window.utils.randomValueFromArray(AD_PARAMS.TIME);
      arrayAcc[i] = {
        author: {
          avatar: AD_PARAMS.AVATAR[i],
        },

        offer: {
          title: window.utils.randomValueFromArray(AD_PARAMS.TITLE),
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNumber(AD_PARAMS.PRICE.MIN, AD_PARAMS.PRICE.MAX),
          type: window.utils.randomValueFromArray(AD_PARAMS.TYPE),
          rooms: window.utils.getRandomNumber(AD_PARAMS.ROOMS.MIN, AD_PARAMS.ROOMS.MAX),
          guests: window.utils.getRandomNumber(AD_PARAMS.GUESTS.MIN, AD_PARAMS.GUESTS.MAX),
          checkin: time,
          checkout: time,
          features: window.utils.arrayToRandomArray(AD_PARAMS.FEATURES),
          description: '',
          photos: window.utils.arrayShuffle(AD_PARAMS.PHOTOS),
        },

        location: {
          x: locationX,
          y: locationY,
        },
      };
    }
    return arrayAcc;
  };
  window.similarAds = window.createAdsArray(countAdvert);
})();
