/*
	report-factory.js

	Purpose: Model for the generated report in the system
*/
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
