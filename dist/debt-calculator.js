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
			.when('/about', {
				templateUrl: 'about/about.html',
				controller: 'AboutController'
			})
			.otherwise({ redirectTo: '/accounts' });
		});

var aboutController = function( $scope, AccountFactory ) {
	$scope.about = AccountFactory.about;
};

angular.module( 'debt-calculator' )
	.controller( 'AboutController', aboutController );
var accountEntryController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountEntryController', accountEntryController );
/*
	account-factory.js

	Purpose: Model for the accounts in the system
*/
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 4000, APR: 3.4, payment: 175 }];

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );
var accountListController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountListController', accountListController );
var navController = function( $scope, $location ) {
	// Returns whether the provided path is the current route in the application
	$scope.isCurrentLocation = function( path ){
		return $location.path() == path;
	};
};

angular.module( 'debt-calculator' )
	.controller( 'NavController', navController );
var reportController = function( $scope ) {
	$('#container').highcharts({
		        title: {
		            text: 'Projected Balances',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: ['Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015',
		                'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', 'Nov 2015', 'Dec 2015']
		        },
		        yAxis: {
		            title: {
		                text: 'Balance (USD)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valuePrefix: '$'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Bank of America Credit Card',
		            data: [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0]
		        }, {
		            name: 'Sally Mae Student Loan',
		            data: [2000, 1500, 1000, 500, 0]
		        }, {
		            name: 'USAA Auto Loan',
		            data: [5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 0]
		        }, {
		            name: 'Navy Federal Personal Loan',
		            data: [2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400, 200, 0]
		        }]
		    });
};

angular.module( 'debt-calculator' )
	.controller( 'ReportController', reportController );