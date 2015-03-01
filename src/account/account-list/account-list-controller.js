/**
 * @ngdoc object
 * @name Accounts.controllers:AccountListController
 * @description
 * Front-end controller for the list of accounts in the system
 */

var accountListController = function( $scope, AccountFactory ) {
	
	$scope.accounts = AccountFactory.accounts;
	
	$scope.blendedAPR 	= 0;
	$scope.totalBalance = 0;
	$scope.totalMonthly = 0;

	/**
     * @ngdoc method
     * @name updateTotals
     * @methodOf Accounts.controllers:AccountListController
     * @description
     * Calculates the summary values for all accounts; invoked when an account is created or updated
     */

	$scope.updateTotals = function() {
		$scope.blendedAPR 	= 0;
		$scope.totalBalance = 0;
		$scope.totalMonthly = 0;

		// Iterate through the accounts and calculate these values
		angular.forEach( $scope.accounts, function( account ){

			$scope.blendedAPR 	+= account.APR * account.balance;
			$scope.totalBalance += Number( account.balance );
			$scope.totalMonthly += account.payment;

		});
	};

	// Initialize the account total values
	$scope.updateTotals();

	/**
     * @ngdoc method
     * @name deleteAccount
     * @methodOf Accounts.controllers:AccountListController
     * @param {Object} account - The account object to be deleted
     * @description
     * Deletes the specified account from AccountFactory.accounts
     */

	$scope.deleteAccount = function( account ) {
		AccountFactory.deleteAccount ( account );
	};

	/**
     * @ngdoc method
     * @name addAccount
     * @methodOf Accounts.controllers:AccountListController
     * @description
     * Adds a new account to the accounts array
     */

	$scope.addAccount = function() {
		AccountFactory.addAccount();
	};
	
}; 

angular.module( 'debt-calculator' )
	.controller( 'AccountListController', accountListController );
