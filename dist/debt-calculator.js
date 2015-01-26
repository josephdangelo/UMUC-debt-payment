angular.module('debt-calculator',[]);
var accountEntryController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountEntryController', accountEntryController );
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 4000, APR: 3.4 }];

	return factory;
};

angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );