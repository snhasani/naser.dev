'use strict';

require('fontfaceobserver');
var loadFont = require('./module/sm-font-loader');

var initFonts = function() {

  if( document.documentElement.className.indexOf( "fonts-loaded" ) > -1 ){
    console.log('we\'re good; fonts loaded already');
    return;
  }

  var iranSans = new FontFaceObserver('iran-sans');

  if (sessionStorage.fontsLoaded || localStorage.fontsLoaded) {
    document.documentElement.classList.add('fonts-loaded');
  } else {

    Promise
    .resolve( iranSans.check('ایران', 1000) )
    .then(function(){
      document.documentElement.classList.add('fonts-loaded');
      sessionStorage.fontsLoaded = true;
    })
    .catch(function() {
      loadFont('iran-sans',
        '/assets/fonts/iranian-sans/iran-sans-light.woff',
        '/assets/fonts/iranian-sans/iran-sans-light.woff2',
        function() {
          document.documentElement.classList.add('fonts-loaded');
          localStorage.fontsLoaded = true;
        }
      );
    });
  }
}

module.exports = initFonts;
