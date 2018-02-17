'use strict';

(function () {
  window.renderCard = function (adsArrayElement) {
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
    popupFeatures.innerHTML = '';

    for (var i = 0; i < adsArrayElement.offer.features.length; i++) {
      var innerPopup = document.createElement('li');
      innerPopup.classList.add('feature', 'feature--' + adsArrayElement.offer.features[i]);
      popupFeatures.appendChild(innerPopup);
    }

    var popupPicturesList = mapCard.querySelector('.popup__pictures');
    popupPicturesList.removeChild(popupPicturesList.querySelector('li'));

    for (i = 0; i < adsArrayElement.offer.photos.length; i++) {
      var popupPicturesItem = document.createElement('li');
      var popupImage = document.createElement('img');
      popupImage.src = adsArrayElement.offer.photos[i];
      popupImage.style.width = '105px';
      popupImage.style.height = '85px';
      popupPicturesItem.appendChild(popupImage);
      popupPicturesList.appendChild(popupPicturesItem);
    }

    mapCard.querySelector('img').src = adsArrayElement.author.avatar;

    return mapCard;
  };
})();
