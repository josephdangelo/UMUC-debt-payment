(function () {
'use strict';
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
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 2000, APR: 20, payment: 100 },
				{ name: 'Citi Credit Card', balance: 3000, APR: 16, payment: 100 },
				{ name: 'American Airlines Credit Card', balance: 4000, APR: 12, payment: 100 },
				{ name: 'Ford Explorer Auto Loan', balance: 20000, APR: 7, payment: 400 },
				{ name: 'Mortgage', balance: 200000, APR: 3, payment: 1200 }];

	factory.addAccount = function() {
		factory.accounts.push( factory.getNewAccount() );
	};

	factory.getNewAccount = function() {
		console.log( 'hi ' );
		
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
				console.log( account );
			}
		});
	};

	// factory.deleteAccount = function ( index ) {
	// 	var i = index;
	// 	factory.accounts.splice( index, 1 );
	// 	for(i; i < factory.accounts.length; i++){
	// 		factory.accounts[i].index = i;
	// 	}

	// };
	

	factory.editAccount = function ( account ) {
		angular.forEach( factory.accounts, function( item, index) {
			if ( angular.equals( account, item ) ) {
				var editAccount = {
					index : index,
					name : "newName",
					APR : "newAPR",
					balance : "newBalance"
				};
				
			//	factory.accounts.splice( index, 1 ); 
				factory.accounts.push(updatedAccount);
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

	$scope.addNew = "Totals";

	$scope.blendedAPR = function () {
		var answer0 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	answer0 += (Number($scope.accounts[i].APR)* Number($scope.accounts[i].balance));
		}
	 $scope.totalHouse0 = answer0 ;

	// $scope.totalHouse0 = answer0 / $scope.accounts.length;
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

		$scope.newAccount = AccountFactory.getNewAccount();
	};

	$scope.editAccount = function( account ) {
		var selectedAccount = account;
		$scope.newAccount = selectedAccount;

		//$scope.deleteAccount(account);
	};

	$scope.deleteAccount = function( account ) {
		AccountFactory.deleteAccount ( account );
	};

	$scope.addAccount = function() {
		AccountFactory.addAccount();
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
var reportController = function( $scope, ReportFactory ) {
	$scope.reportData = ReportFactory.reportData;
	
	$scope.runReport = function() {
		// Execute the report in the factory
		ReportFactory.runReport();

		// Calculate values for the chart
		var chartSeries = [];
		var chartCategories = [];

		// Populate the series array with the account information
		angular.forEach( ReportFactory.reportData.accounts, function( account, index ) {
			chartSeries.push({
				name: account,
				data: []
			});
		});

		// For each report month, add the balance to the respective series 
		angular.forEach( ReportFactory.reportData.months, function( month, monthNDX ) {
			chartCategories.push( monthNDX );

			angular.forEach( month.accounts, function( account, accountNDX ) {
				chartSeries[ accountNDX ].data.push( account.endingBalance );
			});
		});

		// Initialize the Highchart graph
		$('#container').highcharts({
	        title: {
	            text: 'Projected Balances',
	            x: -20 //center
	        },
	        xAxis: {
	            categories: chartCategories
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
	        series: chartSeries
	    });
	};
};

angular.module( 'debt-calculator' )
	.controller( 'ReportController', reportController );
var reportFactory = function( AccountFactory ){
	var factory = {};

	factory.reportData = { accounts: [], months : [] };

	factory.runReport = function() {
		var totalBalance = 0;

		// Initialize the total balance and accounts array
		angular.forEach( AccountFactory.accounts, function( item, index ) {
			totalBalance += item.balance;
			factory.reportData.accounts.push( item.name );
		});

		// Execute the report.  As long as there's a balance, keep iterating.
		while ( totalBalance ) {
			// The current report month
			var reportMonth = {
				totalInterest : 0, // Interest for all accounts
				totalBalance  : 0, // Ending balanace for all accounts
				notApplied    : 0, // Money not applied this month
				accounts	  : [] // Array of account actuals
			};

			// Loop through each account to calculate its values for this month
			for ( var i = 0; i < AccountFactory.accounts.length; i++ ) {
				var item = AccountFactory.accounts[ i ];
				var previousBalance;

				// If this is the first month, the previous balance is the balance entered by the user.  
				// Otherwise get the ending balance from the previous month
				if ( factory.reportData.months.length ) {
					previousBalance = factory.reportData.months[ factory.reportData.months.length - 1 ].accounts[ i ].endingBalance;
				} else {
					previousBalance = item.balance;
				}
				var amountPaid = 0;

				// Calculate the amount that will be paid this month.  If the minimum payment exceeds the balance, use the balance.
				if ( previousBalance ) {
					amountPaid = ( item.payment > previousBalance ) ? previousBalance : item.payment;
				}

				// Determine what the balance for this account will be after the payment is made
				var balanceAfterPayment = previousBalance - amountPaid;
				
				// Determine how much will be paid in interest for this account
				var interestPaid = ( ( item.APR / 100 ) / 12 ) * balanceAfterPayment;

				// Determine ending balance for this month  
				var endingBalance = balanceAfterPayment + interestPaid;
				
				// Add the month object to the account array with its respective values
				reportMonth.accounts.push({
					name 			: item.name,
					endingBalance 	: endingBalance,
					interestPaid 	: interestPaid
				});

				// Update the running interest and balance totals
				reportMonth.totalInterest += interestPaid;
				reportMonth.totalBalance += endingBalance;
			}

			totalBalance = reportMonth.totalBalance;

			factory.reportData.months.push(reportMonth);
		}

		
	};

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'ReportFactory', reportFactory );

})();