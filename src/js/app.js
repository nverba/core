'use strict';

require('../components/helpers/and-helpers.js');
require('../components/state/application-state.js');
require('../components/aside/aside.js');
require('../components/register/register.js');

var routes = require('../config/routes.json');

angular.module('Core', ['ngNewRouter', 'ngSanitize', 'Core:State', 'pascalprecht.translate', 'templates', 'and.helpers']);

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