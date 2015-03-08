/**
 * @ngdoc object
 * @name DebtCalculator.Controllers:AccountListController
 * @description
 * Front-end controller for the list of accounts in the system
 */

var accountListController = function( $scope, AccountFactory ) {
	
	/**
     * @ngdoc property
     * @name accounts
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {array} The accounts in the system
     * 
     * @description
     * Reference to AccountFactory.accounts; all the accounts that have been entered into the system
     */
	$scope.accounts = AccountFactory.accounts;
	
	/**
     * @ngdoc property
     * @name blendedAPR
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {number} Blended APR
     * 
     * @description
     * An APR that reflects the annual interest paid on all accounts, based on the inputted balances and APRs
     */
    $scope.blendedAPR 	= 0;

    /**
     * @ngdoc property
     * @name totalBalance
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {number} The total balance
     * 
     * @description
     * The sum of all account balances that have been inputted by the user
     */
	$scope.totalBalance = 0;

	/**
     * @ngdoc property
     * @name totalMonthly
     * @propertyOf DebtCalculator.Controllers:AccountListController
     * @returns {number} The total monthly payment
     * 
     * @description
     * The sum of all account minimum payments that have been inputted by the user
     */
	$scope.totalMonthly = 0;

	/**
     * @ngdoc method
     * @name updateTotals
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @description
     * Calculates the summary values for all accounts; invoked when an account is created or updated
     */

	$scope.updateTotals = function() {
		// Reset the calculated values
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

     /**
     * @ngdoc method
     * @name deleteAccount
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @param {Object} account The account object to be deleted
     * @description
     * Deletes the specified account from AccountFactory.accounts
     */

	$scope.deleteAccount = function( account ) {
          if ( confirm( 'Are you sure you want to delete this account?') ) {
		   AccountFactory.deleteAccount ( account );
             $scope.updateTotals();
          }

	};

     /**
     * @ngdoc method
     * @name deleteAllAccounts
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @description
     * Removes all accounts from the system
     */
     $scope.clear = function() {
          if ( confirm( 'Are you sure you want to delete all your accounts?  This cannot be undone.') ) {
               AccountFactory.deleteAllAccounts();
               $scope.updateTotals();
          }
     };
	/**
     * @ngdoc method
     * @name addAccount
     * @methodOf DebtCalculator.Controllers:AccountListController
     * @description
     * Adds a new account to the accounts array
     */

	$scope.addAccount = function() {
		AccountFactory.addAccount();
	};

     // Initialize the account total values
     $scope.updateTotals();
	
}; 

angular.module( 'debt-calculator' )
	.controller( 'AccountListController', accountListController );
