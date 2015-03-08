/**
 * @ngdoc service
 * @name DebtCalculator.Factories:AccountFactory
 * @description
 * Singleton used to manage accounts in the system
 */

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
