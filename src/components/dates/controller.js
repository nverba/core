'use strict';

angular.module('App:Dates', [])
  .controller('DatesController', ['State', datesFn]);

function datesFn(State) {

  this.counter = State.counter;

}