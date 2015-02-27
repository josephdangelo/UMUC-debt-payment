/**
 * @ngdoc object
 * @name Accounts.controllers:AccountEntryController
 * @description
 * Front-end controller for editing an account
 */

var accountEntryController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountEntryController', accountEntryController );