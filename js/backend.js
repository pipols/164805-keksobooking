'use strict';

(function () {

  var SEND_FORM = 'https://js.dump.academy/keksobooking';
  var GET_DATA = 'https://js.dump.academy/keksobooking/data';

  var initRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout);
    });

    return xhr;
  };

  var upload = function (data, onLoad, onError) {
    var xhr = initRequest(onLoad, onError);
    xhr.open('POST', SEND_FORM);
    xhr.send(data);
  };

  var download = function (onLoad, onError) {
    var xhr = initRequest(onLoad, onError);
    xhr.open('GET', GET_DATA);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download,
  };
})();
