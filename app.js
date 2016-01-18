// module
var toDoApp = angular.module('toDoApp', ['ngRoute', 'ngResource']);

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
});

// controllers
toDoApp.controller('aboutController', ['$scope', function($scope){

}]);

toDoApp.controller('todoController', ['$scope', function($scope){

}]);