webpackHotUpdate(0,{

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angularjs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uirouter_angularjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__uirouter_angularjs__);



const myApp = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('mathapp', [__WEBPACK_IMPORTED_MODULE_1__uirouter_angularjs___default.a]);

myApp.config(function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  const helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world, you dog!</h3>'
  };

  const aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});

/***/ })

})