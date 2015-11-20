'use strict';

require('fontfaceobserver');
var loadFont = require('./module/sm-font-loader');

var initFonts = function() {

  // if( window.localStorage.fontsLoaded ){
  //   document.documentElement.className += ' fonts-loaded';
  //   console.log('we\'re good; fonts loaded already');
  //   return;
  // }

  var iranSans = new FontFaceObserver('Iran Sans Light');

  Promise
  .resolve( iranSans.check('ایران', 5000) )
  .then(function(){
    document.documentElement.className += ' fonts-loaded';
    window.localStorage.fontsLoaded = 'true';
  })
  .catch(function() {
    loadFont('Iran Sans Light',
      '/assets/fonts/iranian-sans/iran-sans-light.woff',
      '/assets/fonts/iranian-sans/iran-sans-light.woff2',
      function() {
        document.documentElement.className += ' fonts-loaded';
        window.localStorage.fontsLoaded = 'true';
      }
    );
  });
}

module.exports = initFonts;
