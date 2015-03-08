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
var accountFactory = function(){
	/**
     * @ngdoc property
     * @name accounts
     * @propertyOf DebtCalculator.Factories:AccountFactory
     * @returns {array} The accounts in the system
     * 
     * @description
     * Contains all the accounts that have been entered in the system
     */
	var factory = { accounts: []};

	// Initialize the accounts array with test data
	factory.accounts = [
		{ name: 'Credit Card #1', balance: 2500, APR: 10, payment: 200 },
		{ name: 'Credit Card #2', balance: 4500, APR: 6.5, payment: 250 },
		{ name: 'Credit Card #3', balance: 10000, APR: 6.5, payment: 250 },
		{ name: 'Car', balance: 13000, APR: 2.9, payment: 150 },
		{ name: 'Student Loan', balance: 5000, APR: 7.5, payment: 300 }
	];

	/**
     * @ngdoc method
     * @name addAccount
     * @methodOf DebtCalculator.Factories:AccountFactory
     * @description
     * Creates a new account object in the account array
     */

	factory.addAccount = function() {
		// Create a new account object
		var newAccount = { name : "", balance : "", APR : "", payment : "" };

		// Add it to the account array
		factory.accounts.push( newAccount );
	
	};

	/**
     * @ngdoc method
     * @name deleteAccount
     * @methodOf DebtCalculator.Factories:AccountFactory
     * @param {Object} account - The account object to be deleted
     * @description
     * Removes the specified account from the account array
     */

	factory.deleteAccount = function ( account ) {
		// Iterate through the accounts
		angular.forEach( factory.accounts, function( item, index ) {
			// If the current account in the loop is the context account, remove it
			if ( angular.equals( account, item ) ) {
			
				factory.accounts.splice( index, 1 );
			
			}
		});
	};

	/**
     * @ngdoc method
     * @name deleteAllAccounts
     * @methodOf DebtCalculator.Factories:AccountFactory
     * @description
     * Removes all accounts from the account array
     */
	factory.deleteAllAccounts = function() {
		// Iterate through the accounts and delete them
		for ( var i = factory.accounts.length - 1; i >= 0; i-- ) {
			factory.accounts.splice( i, 1 );
		}
	};

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );

var accountListController = function( $scope, AccountFactory ) {
	
	/**
     * @ngdoc property
     * @name accounts
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {array} The accounts in the system
     * 
     * @description
     * Reference to AccountFactory.accounts; all the accounts that have been entered into the system
     */
	$scope.accounts = AccountFactory.accounts;
	
	/**
     * @ngdoc property
     * @name blendedAPR
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {number} Blended APR
     * 
     * @description
     * An APR that reflects the annual interest paid on all accounts, based on the inputted balances and APRs
     */
    $scope.blendedAPR 	= 0;

    /**
     * @ngdoc property
     * @name totalBalance
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {number} The total balance
     * 
     * @description
     * The sum of all account balances that have been inputted by the user
     */
	$scope.totalBalance = 0;

	/**
     * @ngdoc property
     * @name totalMonthly
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {number} The total monthly payment
     * 
     * @description
     * The sum of all account minimum payments that have been inputted by the user
     */
	$scope.totalMonthly = 0;

	/**
     * @ngdoc method
     * @name updateTotals
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @description
     * Calculates the summary values for all accounts; invoked when an account is created or updated
     */

	$scope.updateTotals = function() {
		// Reset the calculated values
		$scope.blendedAPR 	= 0;
		$scope.totalBalance = 0;
		$scope.totalMonthly = 0;

		// Iterate through the accounts and calculate these values
		angular.forEach( $scope.accounts, function( account ){

			$scope.blendedAPR 	+= account.APR * account.balance;
			$scope.totalBalance += Number( account.balance );
			$scope.totalMonthly += account.payment;

		});
	};

     /**
     * @ngdoc method
     * @name deleteAccount
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @param {Object} account The account object to be deleted
     * @description
     * Deletes the specified account from AccountFactory.accounts
     */

	$scope.deleteAccount = function( account ) {
          if ( confirm( 'Are you sure you want to delete this account?') ) {
		   AccountFactory.deleteAccount ( account );
             $scope.updateTotals();
          }

	};

     /**
     * @ngdoc method
     * @name deleteAllAccounts
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @description
     * Removes all accounts from the system
     */
     $scope.clear = function() {
          if ( confirm( 'Are you sure you want to delete all your accounts?  This cannot be undone.') ) {
               AccountFactory.deleteAllAccounts();
               $scope.updateTotals();
          }
     };
	/**
     * @ngdoc method
     * @name addAccount
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @description
     * Adds a new account to the accounts array
     */

	$scope.addAccount = function() {
		AccountFactory.addAccount();
	};

     // Initialize the account total values
     $scope.updateTotals();
	
}; 

angular.module( 'debt-calculator' )
	.controller( 'AccountListController', accountListController );

var navController = function( $scope, $location ) {

	/**
     * @ngdoc method
     * @name isCurrentLocation
     * @methodOf DebtCalculator.Controllers:NavController
     * @returns {boolean} result
     * @description
     * Returns whether the provided path is the current route in the application
     */
	
	$scope.isCurrentLocation = function( path ){
		return '#' + $location.path() == path;
	};

	/**
     * @ngdoc property
     * @name showNavigation
     * @propertyOf DebtCalculator.Controllers:NavController
     * @returns {boolean} Whether to show the system navigation
     * 
     * @description
     * Boolean expression for whether to show the system navigation; defaults to whether the initial page view is the splash view
     */
	$scope.showNavigation = !$scope.isCurrentLocation( '#/splash');
	
	/**
     * @ngdoc property
     * @name navItems
     * @propertyOf DebtCalculator.Controllers:NavController
     * @returns {array} The navigation items in the system
     * 
     * @description
     * Contains all the navigation elements that will be rendered in the application header
     */
	$scope.navItems = [
		{ label: 'Accounts',	location: '#/accounts',	 icon: "glyphicon-usd"},
		{ label: 'Reports',		location: '#/reports',	 icon: "glyphicon-stats"},
		{ label: 'How to Use',	location: '#/howtouse',	 icon: "glyphicon-question-sign"},
		{ label: 'About',		location: '#/about',	 icon: "glyphicon-info-sign"}
	];

	/* 
		When a new route is called, determine whether the navigation should be displayed 
		based on the new route 
	*/
	$scope.$on('$routeChangeStart', function(next, current) { 
		$scope.showNavigation = !$scope.isCurrentLocation( '#/splash');
	});

};

angular.module( 'debt-calculator' )
	.controller( 'NavController', navController );
var reportController = function( $scope, $location, $anchorScroll, $timeout, ReportFactory ) {
	$scope.activeTab = 1;
	/**
     * @ngdoc property
     * @name reportData
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {array} The generated report information 
     * 
     * @description
     * A reference to ReportFactory.reportData; contains generated report information
     */
	$scope.reportData 			= ReportFactory.reportData;

	/**
     * @ngdoc property
     * @name extraPayment
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {number} The extra payment
     * 
     * @description
     * The amount of extra payment that will be provided by the user on a monthly basis for use in the report generation
     */
	$scope.extraPayment 		= 500;

	/**
     * @ngdoc property
     * @name reportTypes
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {array} The report types
     * 
     * @description
     * A reference to ReportFactory.reportTypes; contains the valid report types in the system
     */
	$scope.reportTypes 			= ReportFactory.reportTypes;

	/**
     * @ngdoc property
     * @name selectedReportType
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {object} The selected report type
     * 
     * @description
     * The currently selected report type in the user interface; defaults to the first report type
     */
	$scope.selectedReportType 	= ReportFactory.reportTypes[ 0 ];

	/**
     * @ngdoc method
     * @name runReport
     * @methodOf DebtCalculator.Factories:ReportFactory
     * @param {Object} reportType - The reportType object to run the report against
     * @description
     * Executes the report based on the given parameters and sets the factory.reportData property with the results
     */
	$scope.runReport = function() {
		var chartSeries 	= [];
		var chartCategories = [];

		// Execute the report in the factory
		ReportFactory.runReport( $scope.selectedReportType, $scope.extraPayment );

		$scope.reportData 	= ReportFactory.reportData;
		chartSeries 		= ReportFactory.chartSeries;
		chartCategories 	= ReportFactory.chartCategories;

		Highcharts.setOptions({
            lang: {
               thousandsSep: ','
            }
        });

		// Initialize the Highchart graph
		$('#report-container').highcharts({
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
	
	/**
     * @ngdoc property
     * @name reportData
     * @propertyOf DebtCalculator.Factories:ReportFactory
     * @returns {array} The generated report information after runReport() is executed
     * 
     * @description
     * Contains all the information generated after runReport() is executed
     */
	factory.reportData  = { accounts: [], months : [], interestPaid : 0 };

	/**
     * @ngdoc property
     * @name reportTypes
     * @propertyOf DebtCalculator.Factories:ReportFactory
     * @returns {array} The valid reportTypes
     * 
     * @description
     * The valid report types to execute a report against
     */

    factory.reportTypes = [
		{ name: "Highest APR First", reverse: true, sortAlgorithm: 'APR' },
		{ name: "Lowest Balance First", reverse: false, sortAlgorithm: 'balance' },
		{ name: "Weighted Algorithm", reverse: true, sortAlgorithm: function( account ) {
			return account.payment / account.balance;
		}}
	];

	/**
     * @ngdoc property
     * @name reportTypes
     * @propertyOf DebtCalculator.Factories:ReportFactory
     * @returns {array} The months to be used in the chart
     * 
     * @description
     * The months generated by the report, which will be used on the X-axis of the report
     */
	factory.chartCategories = [];

	/**
     * @ngdoc property
     * @name chartSeries
     * @propertyOf DebtCalculator.Factories:ReportFactory
     * @returns {array} The series to be used in the chart
     * 
     * @description
     * The unique data series and their respective data, which will be used to generate the chart
     */
	factory.chartSeries 	= [];

	/**
     * @ngdoc method
     * @name calculateTotalBalance
     * @methodOf DebtCalculator.Factories:ReportFactory
     * @param {array} accounts The accounts to sum
     * @description
     * Returns the sum of the current balances of the accounts specified
     */
	factory.calculateTotalBalance = function( accounts ) {
		var totalBalance = 0;
		// Initialize the total balance and accounts array
		angular.forEach( accounts, function( item, index ) {

			totalBalance += item.balance;
			factory.reportData.accounts.push( item.name );

		});

		return totalBalance;
	};

	/**
     * @ngdoc method
     * @name runReport
     * @methodOf DebtCalculator.Factories:ReportFactory
     * @param {Object} reportType The reportType object to run the report against
     * @description
     * Executes the report based on the given parameters and sets the factory.reportData property with the results
     */
	
	factory.runReport = function( reportType, extrapayment ) {
		var accounts 	 	= $filter( 'orderBy' )( angular.copy( AccountFactory.accounts ), reportType.sortAlgorithm, reportType.reverse );

		var totalBalance 	= factory.calculateTotalBalance( accounts );
		
		factory.reportData 	= { accounts: [], months : [], interestPaid : 0 };
		factory.chartSeries = [];
		factory.chartCategories = [];
		// Initialize the accounts array
		angular.forEach( accounts, function( item, index ) {
			factory.reportData.accounts.push( item.name );
		});
		
		// Execute the report.  As long as there's a balance, keep iterating.
		// Minimum payment and interest payment related code starts here.
		while ( totalBalance ) {
			// The current report month
			var reportMonth = {
				totalInterest : 0, // Interest for all accounts
				totalBalance  : 0, // Ending balance for all accounts
				accounts	  : [], // Array of account actuals
				name  		  : moment().add( factory.reportData.months.length + 1, 'months' ).format( "MMM 'YY" )
			};

			var totalamountPaid = 0;
			var remainder 		= parseFloat( angular.copy( extrapayment ) );

			// Loop through each account to calculate its maximum of interest and minimum payment for this month
			for ( var i = 0; i < accounts.length; i++ ) {
				var item 			= accounts[ i ];
				var previousBalance = 0;
				var remainderPaid 	= 0;
				var amountPaid 		= 0;

				// If this is the first month, the previous balance is the balance entered by the user.  
				// Otherwise get the ending balance from the previous month
				if ( factory.reportData.months.length ) {
					previousBalance = factory.reportData.months[ factory.reportData.months.length - 1 ].accounts[ i ].endingBalance;
				} else {
					previousBalance = item.balance;
				}
				
				// Determine the amount that will be paid this month comparing amountPaid calculated above and balance.  
				// If the amountPaid exceeds the balance, use the balance.
				if ( previousBalance ) {
					amountPaid = ( item.payment > previousBalance ) ? previousBalance : item.payment;
					
					if ( ( remainder > 0 ) && ( amountPaid < previousBalance ) ) {

						if ( ( amountPaid + parseFloat( remainder ) ) > previousBalance ) {
							remainderPaid = previousBalance - amountPaid;
						} else {
							remainderPaid = angular.copy( remainder );
						}
					}
					
					remainder  = remainder - remainderPaid;
					amountPaid = amountPaid + remainderPaid;
				}

				// Determine what the balance for this account will be after the payment is made
				var balanceAfterPayment = previousBalance - amountPaid;
				
				// Calculate interest to be paid (here, the assumption is interest is added at the end of each month)
				var interestPaid = ( ( item.APR / 100 ) / 12 ) * balanceAfterPayment;
				
				// Calculate balance including interest to be paid
				balanceAfterPayment += interestPaid;
				
				// Add each account monthly amountPaid to total-amountPaid
				totalamountPaid += amountPaid;
				
				// Add the month object to the account array with its respective values
				reportMonth.accounts.push({
					name 			: item.name,
					endingBalance 	: balanceAfterPayment,
					interestPaid 	: interestPaid,
					amountPaid      : amountPaid,
					remainderPaid   : remainderPaid
				});

				factory.reportData.interestPaid += interestPaid;

				// Update the running interest and balance totals
				reportMonth.totalInterest += interestPaid;
				reportMonth.totalBalance += balanceAfterPayment;

				/*
					If the amount paid for this account is less than the monthly payment, apply it to the remainder.
					This will happen if the account is paid off this month or was already paid off
				*/
				//remainder = parseFloat( remainder ) + ( parseFloat( item.payment ) - parseFloat( amountPaid ) );
			}
			
			totalBalance = reportMonth.totalBalance;

			factory.reportData.months.push(reportMonth);
		}

		// Populate the series array with the account information
		angular.forEach( factory.reportData.accounts, function( account, index ) {
			factory.chartSeries.push({
				name: account,
				data: []
			});
		});

		// For each report month, add the balance to the respective series 
		angular.forEach( factory.reportData.months, function( month, monthNDX ) {
			factory.chartCategories.push( month.name );

			angular.forEach( month.accounts, function( account, accountNDX ) {
				factory.chartSeries[ accountNDX ].data.push( account.endingBalance );
			});
		});
		
	};

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'ReportFactory', reportFactory );

})();