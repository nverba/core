'use strict';

angular.module('App:People', [])
  .controller('PeopleController', ['State', peopleFn]);

function peopleFn(State) {

  this.counter = State.counter;

}