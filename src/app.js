/*
	app.js

	Purpose: Defines the angular application and its dependencies
*/

angular.module('debt-calculator',['mgcrea.ngStrap', 'ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/accounts', {
				templateUrl: 'account/account-list/account-list.html',
				controller: 'AccountListController'
			})
			.when('/reports', {
				templateUrl: 'report/report.html',
				controller: 'ReportController'
			})
			.otherwise({ redirectTo: '/accounts' });
		});