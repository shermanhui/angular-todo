// module
var toDoApp = angular.module('toDoApp', ['ngRoute', 'ngResource', 'firebase']);

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

	$scope.tasks = $firebaseArray(fireStorage);

	$scope.limit = 10; // number of items to show

	$scope.$watch('tasks', function(){

		var total = 0;

		var remaining = 0;

		$scope.tasks.forEach(function(todo){

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

	$scope.addToDo = function(){

		//makes id for firebase to use
		var timestamp = new Date().valueOf();

		$scope.tasks.$add({

			id: timestamp,

			title: $scope.toDoItem,

			status: false

		});

		$scope.toDoItem = '';

	};

	$scope.removeToDo = function(index){

		$scope.tasks.$remove(index, 1);

	};

	$scope.updateStatus = function(index){ // change status from complete to active

		$scope.tasks[index].status = !$scope.tasks[index].status;

		$scope.tasks.$save(index);

	};

	$scope.setLimit = function(limiter){

		$scope.limit = (limiter <= 0) ? $scope.tasks.length : limiter;

	};
}]);