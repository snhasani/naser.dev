/* jshint devel:true */
'use strict';
// require('./module/rAF');
// var fastclick = require('fastclick');
// var _ = require('./helpers/helpers');
var fontLoader = require('./font-loader');

var _init = false;

var app = {

  init: function() {
    if (_init) return;
    _init = true;

    // load webfont
    fontLoader();

    // Attach fastclick
    // fastclick.attach(document.body);

    console.log('App Initialize successfully.');
  }

}

app.init();

// window.App = app;

// window.addEventListener('DOMContentLoaded', window.App.init, false);
