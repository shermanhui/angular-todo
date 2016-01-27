'use strict';

describe('A suite exists', function() {

  it('contains spec with an expectation', function() {

    expect(true).toBe(true);

  });
});

describe('Controller: todoController', function () {

  // load the controller's module
  beforeEach(module('toDoApp'));

  var toDoController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    toDoController = $controller('todoController', {
      $scope: scope
    });
  }));

  it('should call add todo', function () {
  	scope.toDoItem = {title: 'Hello'};

  	spyOn(scope.tasks, "$add").and.returnValue(1);
  	scope.addToDo();
  	expect(scope.tasks.$add).toHaveBeenCalled();
  	// console.log(scope.addToDo);
  });

 //  it('should add an item to the list', function() {
	// expect(scope.tasks.length).toBe(1);
 //  });

  it('should add then remove an item from the list', function () {
  	scope.toDoItem = {title: 'Hello'};
    scope.addToDo();
    scope.removeToDo(0);
    expect(scope.tasks.length).toBe(0);
  });

  it('should mark item as complete', function(){

  });

  it('should mark item as incomplete', function(){

  });

});
