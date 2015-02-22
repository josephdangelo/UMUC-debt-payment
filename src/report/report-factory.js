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
		
		// hard coded extra-payment
		var extrapayment = 1000;

		// Execute the report.  As long as there's a balance, keep iterating.
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
