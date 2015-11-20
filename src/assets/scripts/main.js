/* jshint devel:true */
'use strict';
// require('./module/rAF');
// var fastclick = require('fastclick');
// var _ = require('./helpers/helpers');
var fontLoader = require('./font-loader')

var _init = false

var setTheme = function() {
  var lightSwitch = document.querySelector(".theme-switch")

  lightSwitch.onclick = function () {
    var $docElem = document.documentElement

    if ( $docElem.className.indexOf( "dark" ) > -1 ) {
      $docElem.classList.remove('dark')
      window.localStorage.theme = ''
      console.log('set light')
    } else {
      $docElem.classList.add('dark')
      window.localStorage.theme = 'dark'
      console.log('set dark')
    }
  }
}

var app = {

  init: function() {
    if (_init) return
    _init = true

    // load webfont
    fontLoader()
    setTheme()

    // Attach fastclick
    // fastclick.attach(document.body);

    console.log('App Initialize successfully.')
  }

}

app.init();
