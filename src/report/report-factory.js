/**
 * @ngdoc service
 * @name Reports.factories:ReportFactory
 * @description
 * Provides
 */

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
