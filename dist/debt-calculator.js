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
			.when('/howtouse', {
				templateUrl: 'howtouse/howtouse.html',
				controller: 'HowToUseController'
			})
			.otherwise({ redirectTo: '/accounts' });
		});
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

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 4000, APR: 3.4, payment: 175 },
						{ name: 'Citi Credit Card', balance: 2000, APR: 7.4, payment: 75 }];

	factory.create = function( account ) {
		factory.accounts.push( account );
	};

	factory.getNewAccount = function() {
		return angular.copy( {
			name	: "",
			balance : "",
			APR 	: "",
			payment : ""
		});
	};

	factory.deleteAccount = function ( account ) {
		angular.forEach( factory.accounts, function( item, index ) {
			if ( angular.equals( account, item ) ) {
				factory.accounts.splice( index, 1 );
			}
		});
	};

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );
var accountListController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;

	//$scope.totalHouse = 45;//works and display 45 on list page
	$scope.addNew = "Totals";

	$scope.newAccount = AccountFactory.getNewAccount();

	// works finally
	// $scope.totalHouse = $scope.accounts[1].name;

	 $scope.blendedAPR = function () {
		answer0 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	answer0 += Number($scope.accounts[i].APR);
		}

	 $scope.totalHouse0 = answer0 / $scope.accounts.length;
	return $scope.totalHouse0;
	}; //end addNew function


	$scope.totalBalance = function () {
		$scope.answer1 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	$scope.answer1 += Number($scope.accounts[i].balance);
		}

		 $scope.totalHouse1 = $scope.answer1;
		 return $scope.totalHouse1 ;

	}; //end addNew function

	$scope.reset = function() {

		$scope.newAccount = "";
	};

	$scope.create = function() {
		AccountFactory.create( $scope.newAccount );

		$scope.newAccount = AccountFactory.getNewAccount();
	};

	$scope.deleteAccount = function( account ) {
		AccountFactory.deleteAccount ( account );
	};

	$scope.totalMonthly = function () {
		$scope.answer2 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	$scope.answer2 += Number($scope.accounts[i].payment);
		}

	 $scope.totalHouse2 = $scope.answer2;
	 return $scope.totalHouse2 ;

	}; //end addNew function


}; //end controller accountListController

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

var HowToUseController = function( $scope, AccountFactory ) {
	$scope.howtouse = AccountFactory.howtouse;
};

angular.module( 'debt-calculator' )
	.controller( 'HowToUseController', HowToUseController );
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