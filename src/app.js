/**
 * @ngdoc overview
 * @name Accounts
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
				templateUrl: 'about/about.html',
				controller: 'AboutController'
			})
			.when('/howtouse', {
				templateUrl: 'howtouse/howtouse.html',
				controller: 'HowToUseController'
			})
			.otherwise({ redirectTo: '/accounts' });
		})

	.controller('CRTL', function ($scope, $timeout){
		function switchVariable() {
				$scope.pageInitialized = true;
			}

			$timeout(function() {
				switchVariable();
			},6000);

		


		});