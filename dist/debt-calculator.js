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

	factory.accounts = [{ name: 'A', balance: 2500, APR: 10, payment: 0 },
				{ name: 'B', balance: 2000, APR: 16, payment: 0 },
				{ name: 'C', balance: 3000, APR: 12, payment: 0 },
				{ name: 'D', balance: 1000, APR: 8, payment: 0 },
				{ name: 'E', balance: 5000, APR: 4, payment: 0 }];

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
var reportController = function( $scope, ReportFactory ) {
	$scope.reportData = ReportFactory.reportData;
	$scope.extraPayment = "";
	
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
		
		// calculation method related code starts here.	
		// calculation method choice
		// 0: High APR first; 1: Low Balance First; and 2: Weighted
		// hard coded calculation
		var calculationmethod = 2;
		// sorting code based on calculation method choice
		var tempapr, tempname, tempbalance, temppayment, check;
		if ( calculationmethod === 0 ) {
			// High APR first
			check = true;
			for ( var k = 1; k < AccountFactory.accounts.length && check; k++ ) {
				// array may be sorted and check not needed
				check = false;
				// perform k-th pass
				for ( var j = 0; j < AccountFactory.accounts.length - k; j++ ) {
					if ( AccountFactory.accounts[j].APR < AccountFactory.accounts[j+1].APR ) {
						// swapping j-th and j+1-th account information
						// assign j-th account to temp account
						tempapr = AccountFactory.accounts[j].APR;
						tempname = AccountFactory.accounts[j].name;
						tempbalance = AccountFactory.accounts[j].balance;
						temppayment = AccountFactory.accounts[j].payment;
						// assign j+1-th account to j-th account
						AccountFactory.accounts[j].APR = AccountFactory.accounts[j+1].APR;
						AccountFactory.accounts[j].name = AccountFactory.accounts[j+1].name;
						AccountFactory.accounts[j].balance = AccountFactory.accounts[j+1].balance;
						AccountFactory.accounts[j].payment = AccountFactory.accounts[j+1].payment;
						// assign temp account to j+1-th account
						AccountFactory.accounts[j+1].APR = tempapr;
						AccountFactory.accounts[j+1].name = tempname;
						AccountFactory.accounts[j+1].balance = tempbalance;
						AccountFactory.accounts[j+1].payment = temppayment;
						check = true;
					}
				}
			}
		} else if ( calculationmethod === 1 ) {
			// Low balance first
			check = true;
			for ( var p = 1; p < AccountFactory.accounts.length && check; p++ ) {
				// array may be sorted and check not needed
				check = false;
				// perform k-th pass
				for ( var q = 0; q < AccountFactory.accounts.length - p; q++ ) {
					if ( AccountFactory.accounts[q].balance > AccountFactory.accounts[q+1].balance ) {
						// swapping j-th and j+1-th account information
						// assign j-th account to temp account
						tempapr = AccountFactory.accounts[q].APR;
						tempname = AccountFactory.accounts[q].name;
						tempbalance = AccountFactory.accounts[q].balance;
						temppayment = AccountFactory.accounts[q].payment;
						// assign j+1-th account to j-th account
						AccountFactory.accounts[q].APR = AccountFactory.accounts[q+1].APR;
						AccountFactory.accounts[q].name = AccountFactory.accounts[q+1].name;
						AccountFactory.accounts[q].balance = AccountFactory.accounts[q+1].balance;
						AccountFactory.accounts[q].payment = AccountFactory.accounts[q+1].payment;
						// assign temp account to j+1-th account
						AccountFactory.accounts[q+1].APR = tempapr;
						AccountFactory.accounts[q+1].name = tempname;
						AccountFactory.accounts[q+1].balance = tempbalance;
						AccountFactory.accounts[q+1].payment = temppayment;
						check = true;
					}
				}
			}
		} else if ( calculationmethod === 2 ) {
			// Low balance first
			check = true;
			for ( var x = 1; x < AccountFactory.accounts.length && check; x++ ) {
				// array may be sorted and check not needed
				check = false;
				// perform k-th pass
				for ( var y = 0; y < AccountFactory.accounts.length - x; y++ ) {
					if ( ( AccountFactory.accounts[y].payment / AccountFactory.accounts[y].balance ) < ( AccountFactory.accounts[y+1].payment / AccountFactory.accounts[y+1].balance ))  {
						// swapping j-th and j+1-th account information
						// assign j-th account to temp account
						tempapr = AccountFactory.accounts[y].APR;
						tempname = AccountFactory.accounts[y].name;
						tempbalance = AccountFactory.accounts[y].balance;
						temppayment = AccountFactory.accounts[y].payment;
						// assign j+1-th account to j-th account
						AccountFactory.accounts[y].APR = AccountFactory.accounts[y+1].APR;
						AccountFactory.accounts[y].name = AccountFactory.accounts[y+1].name;
						AccountFactory.accounts[y].balance = AccountFactory.accounts[y+1].balance;
						AccountFactory.accounts[y].payment = AccountFactory.accounts[y+1].payment;
						// assign temp account to j+1-th account
						AccountFactory.accounts[y+1].APR = tempapr;
						AccountFactory.accounts[y+1].name = tempname;
						AccountFactory.accounts[y+1].balance = tempbalance;
						AccountFactory.accounts[y+1].payment = temppayment;
						check = true;
					}
				}
			}
		}

		// Initialize the total balance and accounts array
		angular.forEach( AccountFactory.accounts, function( item, index ) {
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
			var remainder = 0;

			// Loop through each account to calculate its maximum of interest and minimum payment for this month
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
				
				// Calculate interest to be paid (here, the assumption is interest is added 1st day of each month)
				var interestPaid = ( ( item.APR / 100 ) / 12 ) * previousBalance;
				
				// Calculate balance including interest to be paid
				previousBalance += interestPaid;
				
				// Determine the amount that will be paid this month comparing interest to be paid and minimum payment.
				// The idea is to make sure each account balance does not increase by paying at least interest 
				if ( previousBalance ) {
					amountPaid = ( item.payment > interestPaid ) ? item.payment : interestPaid;
				}

				// Determine the amount that will be paid this month comparing amountPaid calculated above and balance.  
				// If the amountPaid exceeds the balance, use the balance.
				if ( previousBalance ) {
					amountPaid = ( item.payment > previousBalance ) ? previousBalance : item.payment;
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