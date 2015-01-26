var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 4000, APR: 3.4 }];

	return factory;
};

angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );