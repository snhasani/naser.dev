'use strict';

require('fontfaceobserver');
var loadFont = require('./sm-font-loader');

var initFonts = function() {

  if( document.documentElement.className.indexOf( "fonts-loaded" ) > -1 ){
    console.log('we\'re good; fonts loaded already');
    return;
  }

  var iranSans = new FontFaceObserver('Iran Sans Light');

  Promise
  .resolve( iranSans.check('ایران') )
  .then(function(){
    document.documentElement.className += ' fonts-loaded';
    document.cookie = 'fonts-loaded=true';
  })
  .catch(function() {
    loadFont('Iran Sans Light',
      '/assets/fonts/iranian-sans/iran-sans-light.woff',
      '/assets/fonts/iranian-sans/iran-sans-light.woff2',
      function() {
        document.documentElement.className += ' fonts-loaded';
        document.cookie = 'fonts-loaded=true';
      }
    );
  });
}

module.exports = initFonts;
