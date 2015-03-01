/**
 * @ngdoc overview
 * @name DebtCalculator
 * @description
 * Provides account management for the application
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
			.when('/about', {
				templateUrl: 'about/about.html'
			})
			.when('/howtouse', {
				templateUrl: 'howtouse/howtouse.html'
			})
			.when('/splash', {
				templateUrl: 'splash/splash.html'
			})
			.otherwise({ redirectTo: '/splash' });
		});