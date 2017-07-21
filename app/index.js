import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

const myApp = angular.module('mathapp', [uiRouter]);

myApp.config(function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  const helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world, you dog!</h3>',
  };

  const aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>',
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
