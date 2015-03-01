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
		})

	.controller('CRTL', function ($scope, $timeout){
		function switchVariable() {
				$scope.pageInitialized = true;
			}

			$timeout(function() {
				switchVariable();
			},6000);

		


		});
var accountEntryController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountEntryController', accountEntryController );
var accountFactory = function(){

	var factory = {};

	factory.accounts = [
		{ name: 'A', balance: 2500, APR: 10, payment: 200 },
		{ name: 'B', balance: 2000, APR: 16, payment: 250 },
		{ name: 'C', balance: 3000, APR: 12, payment: 150 },
		{ name: 'D', balance: 1000, APR: 8, payment: 75 },
		{ name: 'E', balance: 5000, APR: 4, payment: 300 }
	];

	factory.addAccount = function() {
		
		factory.accounts.push( factory.getNewAccount() );
	
	};

	factory.getNewAccount = function() {
		
		return angular.copy( 
			{ name : "", balance : "", APR : "", payment : "" }
		);

	};

	factory.deleteAccount = function ( account ) {

		angular.forEach( factory.accounts, function( item, index ) {
		
			if ( angular.equals( account, item ) ) {
			
				factory.accounts.splice( index, 1 );
			
			}

		});

	};

	factory.editAccount = function ( account ) {
		
		angular.forEach( factory.accounts, function( item, index) {
			
			if ( angular.equals( account, item ) ) {
				
				var editAccount = {
					index : index, name : "newName", APR : "newAPR", balance : "newBalance"
				};
				
				factory.accounts.push( updatedAccount );
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
	$scope.addNew 	= "Totals";

	$scope.blendedAPR = function () {
		
		var blendedAPR = 0;
		
		angular.forEach( $scope.accounts, function( account ){

			blendedAPR += account.APR * account.balance;
		
		});
			
		return blendedAPR;
	}; 


	$scope.totalBalance = function () {
		
		var totalBalance = 0;

		angular.forEach( $scope.accounts, function( item ){

	    	totalBalance += Number( item.balance );
		
		});

		return totalBalance;

	};

	$scope.deleteAccount = function( account ) {

		AccountFactory.deleteAccount ( account );
	
	};

	$scope.addAccount = function() {

		AccountFactory.addAccount();
	
	};

	$scope.totalMonthly = function () {
		
		var monthlyTotal = 0;

		angular.forEach( $scope.accounts, function( account ){
		
			monthlyTotal += account.payment;
		
		});
	 
	 	return monthlyTotal;

	};
	
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
var reportController = function( $scope, ReportFactory ) {
	$scope.reportData 			= ReportFactory.reportData;
	$scope.extraPayment 		= "";
	$scope.reportTypes 			= ReportFactory.reportTypes;
	$scope.selectedReportType 	= {};
	
	$scope.runReport = function() {
		var chartSeries 	= [];
		var chartCategories = [];

		// Execute the report in the factory
		ReportFactory.runReport( $scope.selectedReportType );

		$scope.reportData = ReportFactory.reportData;

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

		Highcharts.setOptions({
            lang: {
               thousandsSep: ','
            }
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
	            valuePrefix: '$',
	            pointFormat: '{series.name}: <b>${point.y:,.2f}</b><br/>'
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
var reportFactory = function( AccountFactory, $filter ){ 
	var factory = {};
	
	factory.reportData  = { accounts: [], months : [] };
	factory.reportTypes = [
		{ name: "Highest APR First", sortAlgorithm: 'APR', reverse: true },
		{ name: "Lowest Balance First", sortAlgorithm: 'balance', reverse: false },
		{ name: "Weighted Algorithm", sortAlgorithm: 'APR', reverse: true }
	];

	factory.runReport = function( reportType ) {

		var totalBalance = 0;
		var accounts 	 = $filter( 'orderBy' )( AccountFactory.accounts, reportType.sortAlgorithm );

		factory.reportData = { accounts: [], months : [] };

		// Initialize the total balance and accounts array
		angular.forEach( accounts, function( item, index ) {

			totalBalance += item.balance;
			factory.reportData.accounts.push( item.name );

		});
		
		// hard coded extra-payment
		var extrapayment = 1000;
		
		// Execute the report.  As long as there's a balance, keep iterating.
		// Minimum payment and interest payment related code starts here.
		while ( totalBalance ) {
			// The current report month
			var reportMonth = {
				totalInterest : 0, // Interest for all accounts
				totalBalance  : 0, // Ending balance for all accounts
				notApplied    : 0, // Money not applied this month
				accounts	  : [] // Array of account actuals
			};

			var totalamountPaid = 0;
			var remainder 		= 0;

			// Loop through each account to calculate its maximum of interest and minimum payment for this month
			for ( var i = 0; i < accounts.length; i++ ) {
				var item = accounts[ i ];
				var previousBalance;

				// If this is the first month, the previous balance is the balance entered by the user.  
				// Otherwise get the ending balance from the previous month
				if ( factory.reportData.months.length ) {
					previousBalance = Number( factory.reportData.months[ factory.reportData.months.length - 1 ].accounts[ i ].endingBalance );
				} else {
					previousBalance = Number( item.balance );
				}
				
				var amountPaid = 0;
				
				// Calculate interest to be paid (here, the assumption is interest is added 1st day of each month)
				var interestPaid = ( ( Number( item.APR ) / 100 ) / 12 ) * previousBalance;
				
				// Calculate balance including interest to be paid
				previousBalance += interestPaid;
				
				// Determine the amount that will be paid this month comparing interest to be paid and minimum payment.
				// The idea is to make sure each account balance does not increase by paying at least interest 
				if ( previousBalance ) {
					amountPaid = ( Number( item.payment > interestPaid ) ) ? Number( item.payment ) : interestPaid;
				}

				// Determine the amount that will be paid this month comparing amountPaid calculated above and balance.  
				// If the amountPaid exceeds the balance, use the balance.
				if ( previousBalance ) {
					amountPaid = ( Number( item.payment ) > previousBalance ) ? previousBalance : Number( item.payment );
				}

				// Determine what the balance for this account will be after the payment is made
				var balanceAfterPayment = previousBalance - amountPaid;
				
				// Determine ending balance for this month  
				var endingBalance = balanceAfterPayment;
				
				// Add each account monthly amountPaid to total-amountPaid
				totalamountPaid += amountPaid;
				
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
			
			// Apply rest of extra-payment: the difference between extra-payment and total amountPaid for each account
			remainder = extrapayment - totalamountPaid;
			
			// Extra payment related code starts here.
			// Pay off accounts using extra-payment.  As long as there's a extra-payment, keep iterating.
			var index = 0;

			while( remainder > 0 ) {
				if( reportMonth.accounts[ index ].endingBalance > remainder ) {
					reportMonth.accounts[ index ].endingBalance -= remainder;
					remainder = 0;
				} else {
					reportMonth.accounts[ index ].endingBalance = 0;
					remainder -= reportMonth.accounts[ index ].endingBalance;
				}
				if( index === reportMonth.accounts.length - 1) { remainder = 0; }
				else { index++; }
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