/*
	account-factory.js

	Purpose: Model for the accounts in the system
*/
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 4000, APR: 3.4, payment: 175 }];

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );