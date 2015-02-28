/**
 * @ngdoc service
 * @name Accounts.factories:AccountFactory
 * @description
 * Provides
 */
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
