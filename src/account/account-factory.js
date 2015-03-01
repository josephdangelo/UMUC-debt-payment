/**
 * @ngdoc service
 * @name Accounts.factories:AccountFactory
 * @description
 * Provides
 */

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
