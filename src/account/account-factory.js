/**
 * @ngdoc service
 * @name Accounts.factories:AccountFactory
 * @description
 * Singleton used to manage accounts in the system
 */

var accountFactory = function(){
	/**
     * @ngdoc property
     * @name accounts
     * @propertyOf Accounts.factories:AccountFactory
     * @description
     * Creates a new account object in the account array
     */
	var factory = { accounts: []};

	// Initialize the accounts array with test data
	factory.accounts = [
		{ name: 'A', balance: 2500, APR: 10, payment: 200 },
		{ name: 'B', balance: 2000, APR: 16, payment: 250 },
		{ name: 'C', balance: 3000, APR: 12, payment: 150 },
		{ name: 'D', balance: 1000, APR: 8, payment: 75 },
		{ name: 'E', balance: 5000, APR: 4, payment: 300 }
	];

	/**
     * @ngdoc method
     * @name addAccount
     * @methodOf Accounts.factories:AccountFactory
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
     * @methodOf Accounts.factories:AccountFactory
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

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );
