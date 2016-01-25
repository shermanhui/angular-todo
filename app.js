// module
var toDoApp = angular.module('toDoApp', ['ngRoute', 'ngResource', 'firebase', 'angularUtils.directives.dirPagination']);

// router
toDoApp.config(function ($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl: 'pages/about.html',
		controller: 'aboutController'
	})

	.when('/todo',{
		templateUrl: 'pages/todo.html',
		controller: 'todoController'
	})

	.when('/todo/:todos', {
		templateUrl: 'pages/todo.html',
		controller: 'todoController'
	});
});

// services
// toDoApp.service('addToDo', function(){

// 	this.toDoItem = '';
// });

// controllers
toDoApp.controller('aboutController', ['$scope', function($scope){
	// nothing here for now
}]);

toDoApp.controller('todoController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var fireStorage = new Firebase('https://super-todos.firebaseio.com/');

	$scope.currentPage = 1;

	$scope.pageSize = 5;

	$scope.tasks = $firebaseArray(fireStorage);

	//$scope.limit = 10; // number of items to show

	$scope.$watch('tasks', function(){

		var total = 0;

		var remaining = 0;

		$scope.tasks.forEach(function(todo){ // watch the number of todo tasks and return number of completed/remaining tasks

			if (!todo || !todo.title){ // prevent breaking list if item is illegal

				return;

			}

			total++;

			if (todo.status == false){

				remaining++;

			};
		});

		$scope.totalTasks = total;

		$scope.totalRemaining = remaining;

		$scope.completedTasks = total - remaining;

	}, true);

	$scope.addToDo = function(){ // add new todo item

		//makes id for firebase to use
		var timestamp = new Date().valueOf();

		$scope.tasks.$add({

			id: timestamp,

			title: $scope.toDoItem,

			status: false

		});

		$scope.toDoItem = '';

	};

	$scope.updateStatus = function(index){ // change status from complete to active

		$scope.tasks[index].status = !$scope.tasks[index].status;

		$scope.tasks.$save(index);

	};

	$scope.removeToDo = function(index){ // remove selected todo

		$scope.tasks.$remove(index, 1);

	};

	$scope.removeCompleted = function(){ // uses removeToDo to remove all completed tasks through a forEach loop

		$scope.tasks.forEach(function(todo){

			if (todo.status == true){

				$scope.removeToDo(todo);

			}

		});
	};

	// $scope.showAll = function(){

	// 	$scope.tasks.forEach(function(todo){

	// 		return todo.status = true;

	// 	});
	// };

	// $scope.showCompleted = function(){

	// 	$scope.tasks.forEach(function(todo){
	// 		if (todo.status == true){
	// 			return true
	// 		} else {
	// 			return false
	// 		}
	// 	});

	// };

	// $scope.showRemaining = function(){

	// 	$scope.tasks.forEach(function(todo){
	// 		if (todo.status == false){
	// 			return true
	// 		} else {
	// 			return false
	// 		}
	// 	});
	// };

	$scope.setLimit = function(limiter){ // in progress, doesn't work well because of async issue

		$scope.limit = (limiter <= 0) ? $scope.tasks.length : limiter;

	};
}]);