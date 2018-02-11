'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
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

var countAdvert = 8;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomValueFromArray = function (arr) {
  var num = Math.floor(Math.random() * arr.length);
  return arr[num];
};

var arrayShuffle = function (arrayIn) {
  var array = arrayIn.slice();
  var randomArray = [];
  while (array.length > 0) {
    var randomIndex = Math.floor(Math.random() * array.length);
    randomArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return randomArray;
};

var arrayToRandomArray = function (arrayIn) {
  var shuffledArray = arrayShuffle(arrayIn);
  shuffledArray.splice(getRandomNumber(0, arrayIn.length));
  return shuffledArray;
};

var createAdsArray = function () {
  var arrayAcc = [];

  for (var i = 0; i < countAdvert; i++) {
    var locationX = getRandomNumber(AD_PARAMS.LOCATION_X.MIN, AD_PARAMS.LOCATION_X.MAX);
    var locationY = getRandomNumber(AD_PARAMS.LOCATION_Y.MIN, AD_PARAMS.LOCATION_Y.MAX);

    arrayAcc[i] = {
      author: {
        avatar: AD_PARAMS.AVATAR[i],
      },

      offer: {
        title: randomValueFromArray(AD_PARAMS.TITLE),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(AD_PARAMS.PRICE.MIN, AD_PARAMS.PRICE.MAX),
        type: randomValueFromArray(AD_PARAMS.TYPE),
        rooms: getRandomNumber(AD_PARAMS.ROOMS.MIN, AD_PARAMS.ROOMS.MAX),
        guests: getRandomNumber(AD_PARAMS.GUESTS.MIN, AD_PARAMS.GUESTS.MAX),
        checkin: randomValueFromArray(AD_PARAMS.CHECKIN),
        checkout: randomValueFromArray(AD_PARAMS.CHECKOUT),
        features: arrayToRandomArray(AD_PARAMS.FEATURES),
        description: '',
        photos: arrayShuffle(AD_PARAMS.PHOTOS),
      },

      location: {
        x: locationX,
        y: locationY,
      },
    };
  }
  return arrayAcc;
};

var generatePinsNodes = function (adData) {
  var pinTemplate = document.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adData.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = adData[i].location.x - 25 + 'px';
    pinElement.style.top = adData[i].location.y + 70 + 'px';
    pinElement.querySelector('img').setAttribute('src', adData[i].author.avatar);

    fragment.appendChild(pinElement);
  }
  return fragment;
};

var renderCard = function (adsArrayElement) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector('h3').textContent = adsArrayElement.offer.title;
  mapCard.querySelector('p').textContent = adsArrayElement.offer.address;
  mapCard.querySelector('.popup__price').textContent = adsArrayElement.offer.price + '\u20bd;/ночь';
  mapCard.querySelector('h4').textContent = adsArrayElement.type;
  mapCard.querySelectorAll('p')[2].textContent = adsArrayElement.offer.rooms + ' комнаты для ' + adsArrayElement.offer.guests + ' гостей';
  mapCard.querySelectorAll('p')[3].textContent = 'Заезд после ' + adsArrayElement.offer.checkin + ', выезд до ' + adsArrayElement.offer.checkout;
  mapCard.querySelectorAll('p')[4].textContent = adsArrayElement.offer.description;

  var popupFeatures = mapCard.querySelector('.popup__features');

  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }

  for (var i = 0; i < adsArrayElement.offer.features.length; i++) {
    var popup = document.createElement('li');
    popup.setAttribute('class', 'feature feature--' + adsArrayElement.offer.features[i]);
    popupFeatures.appendChild(popup);
  }

  var popupPicturesList = mapCard.querySelector('.popup__pictures');
  popupPicturesList.removeChild(popupPicturesList.querySelector('li'));

  for (i = 0; i < adsArrayElement.offer.photos.length; i++) {
    var popupPicturesItem = document.createElement('li');
    var popupImage = document.createElement('img');
    popupImage.setAttribute('src', adsArrayElement.offer.photos[i]);
    popupImage.setAttribute('width', '105px');
    popupImage.setAttribute('height', '85px');
    popupPicturesItem.appendChild(popupImage);
    popupPicturesList.appendChild(popupPicturesItem);
  }

  mapCard.querySelector('img').setAttribute('src', adsArrayElement.author.avatar);

  return mapCard;
};

var similarAds = createAdsArray();

var mapPinsList = document.querySelector('.map__pins');
mapPinsList.appendChild(generatePinsNodes(similarAds));

var mapFiltersContainer = document.querySelector('.map__filters-container');
map.insertBefore(renderCard(similarAds[0]), mapFiltersContainer);
