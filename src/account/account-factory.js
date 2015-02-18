/*
	account-factory.js

	Purpose: Model for the accounts in the system
*/
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 4000, APR: 3.4, payment: 175 },
						{ name: 'Citi Credit Card', balance: 2000, APR: 7.4, payment: 75 }];

	factory.create = function( account ) {
		factory.accounts.push( account );
	};

	factory.getNewAccount = function() {
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
			}
		});
	};

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