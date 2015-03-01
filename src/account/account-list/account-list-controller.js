/**
 * @ngdoc object
 * @name Accounts.controllers:AccountListController
 * @description
 * Front-end controller for the list of accounts in the system
 */

var accountListController = function( $scope, AccountFactory ) {
	
	$scope.accounts = AccountFactory.accounts;
	$scope.addNew 	= "Totals";

	$scope.blendedAPR = function () {
		
		var blendedAPR = 0;
		
		angular.forEach( $scope.accounts, function( account ){

			blendedAPR += account.APR * account.balance;
		
		});
			
		return blendedAPR;
	}; 


	$scope.totalBalance = function () {
		
		var totalBalance = 0;

		angular.forEach( $scope.accounts, function( item ){

	    	totalBalance += Number( item.balance );
		
		});

		return totalBalance;

	};

	$scope.deleteAccount = function( account ) {

		AccountFactory.deleteAccount ( account );
	
	};

	$scope.addAccount = function() {

		AccountFactory.addAccount();
	
	};

	$scope.totalMonthly = function () {
		
		var monthlyTotal = 0;

		angular.forEach( $scope.accounts, function( account ){
		
			monthlyTotal += account.payment;
		
		});
	 
	 	return monthlyTotal;

	};
	
}; 

angular.module( 'debt-calculator' )
	.controller( 'AccountListController', accountListController );
