'use strict';

describe('Controller: toDoApp', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var toDoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    toDoCtrl = $controller('toDoCtrl', {
      $scope: scope
    });
  }));

  it('should add items to the list', function () {
    scope.addTodo();
    expect(scope.tasks.length).toBe(1);
  });

  it('should add then remove an item from the list', function () {
    scope.addTodo();
    scope.removeTodo(0);
    expect(scope.tasks.length).toBe(0);
  });

});
