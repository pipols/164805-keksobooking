'use strict';

(function () {
  var POPUP_TIMEOUT = 2000;

  var body = document.querySelector('body');
  var messageElement = document.createElement('div');

  var hideElement = function (elem) {
    elem.style.display = 'none';
  };

  var showPopupMessage = function (message) {
    messageElement.classList.add('popupMessage');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.display = 'inline-block';
    messageElement.style.marginTop = '20px';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '3px';
    messageElement.style.width = '600px';
    messageElement.style.marginLeft = '-300px';
    messageElement.style.left = '50%';
    messageElement.style.zIndex = '1000';

    body.insertAdjacentElement('afterbegin', messageElement);

    setTimeout(function () {
      hideElement(messageElement);
    }, POPUP_TIMEOUT);
  };

  var showErrorMessage = function (message) {
    showPopupMessage(message);
    messageElement.style.color = '#d8000c';
    messageElement.style.backgroundColor = '#ffbaba';
  };

  var showSuccessMessage = function (message) {
    showPopupMessage(message);
    messageElement.style.color = '#270';
    messageElement.style.backgroundColor = '#dff2bf';
  };

  window.alert = {
    onError: showErrorMessage,
    onSuccess: showSuccessMessage
  };
})();
