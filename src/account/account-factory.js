/*
	account-factory.js

	Purpose: Model for the accounts in the system
*/
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 2000, APR: 20, payment: 100 },
				{ name: 'Citi Credit Card', balance: 3000, APR: 16, payment: 100 },
				{ name: 'American Airlines Credit Card', balance: 4000, APR: 12, payment: 100 },
				{ name: 'Ford Explorer Auto Loan', balance: 20000, APR: 7, payment: 400 },
				{ name: 'Mortgage', balance: 200000, APR: 3, payment: 1200 }];

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
