'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    randomValueFromArray: function (arr) {
      var num = Math.floor(Math.random() * arr.length);
      return arr[num];
    },

    arrayShuffle: function (arrayIn) {
      var array = arrayIn.slice();
      var randomArray = [];
      while (array.length > 0) {
        var randomIndex = Math.floor(Math.random() * array.length);
        randomArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
      }
      return randomArray;
    },

    arrayToRandomArray: function (arrayIn) {
      var shuffledArray = this.arrayShuffle(arrayIn);
      shuffledArray.splice(this.getRandomNumber(0, arrayIn.length));
      return shuffledArray;
    },
  };
})();
