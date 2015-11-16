'use strict';

require('fontfaceobserver');
var loadFont = require('./module/sm-font-loader');

var initFonts = function() {

  if( document.documentElement.className.indexOf( "fonts-loaded" ) > -1 ){
    console.log('we\'re good; fonts loaded already');
    return;
  }

  var iranSans = new FontFaceObserver('Iran Sans Light');

  Promise
  .resolve( iranSans.check('ایران') )
  .then(function(){
    console.log('then');
    document.documentElement.className += ' fonts-loaded';
  })
  .catch(function() {
    loadFont('Iran Sans Light',
      '/assets/fonts/iranian-sans/iran-sans-light.woff',
      '/assets/fonts/iranian-sans/iran-sans-light.woff2',
      function() {
        document.documentElement.className += ' fonts-loaded';
      }
    );
  });
}

module.exports = initFonts;
