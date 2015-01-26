var accountEntryController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountEntryController', accountEntryController );