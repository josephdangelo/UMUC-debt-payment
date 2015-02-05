
var aboutController = function( $scope, AccountFactory ) {
	$scope.about = AccountFactory.about;
};

angular.module( 'debt-calculator' )
	.controller( 'AboutController', aboutController );