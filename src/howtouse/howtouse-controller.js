
var HowToUseController = function( $scope, AccountFactory ) {
	$scope.howtouse = AccountFactory.howtouse;
};

angular.module( 'debt-calculator' )
	.controller( 'HowToUseController', HowToUseController );