'use strict';

require('../../node_modules/material-design-lite/material.min.js');
require('../components/helpers/factory.js');
require('../components/state/factory.js');
require('../components/dates/controller.js');
require('../components/people/controller.js');
require('../components/counter/directive.js');

var routes = require('../config/routes.json');

angular.module('Core', ['ngNewRouter', 'ngSanitize', 'Core:State', 'pascalprecht.translate', 'templates', 'App:Dates', 'App:People', 'App:Counter', 'Core:And']);

angular.module('Core').controller('CoreController', ['$scope', '$router', '$http', '$q', '$location', 'And', 'State', CoreControllerFn]);

angular.module('Core').config(['$translateProvider', configFn]);

function CoreControllerFn($scope, $router, $http, $q, $location, And, State) {
  
  $router.config(routes);
  
}

function configFn($translateProvider) {

  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useStaticFilesLoader({
    prefix: '/lang/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
};