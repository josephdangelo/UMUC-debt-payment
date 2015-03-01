var navController = function( $scope, $location ) {
// Returns whether the provided path is the current route in the application
	$scope.isCurrentLocation = function( path ){
		
		return '#' + $location.path() == path;
	};
	$scope.showNavigation = !$scope.isCurrentLocation( '#/splash');
	$scope.navItems = [
		{ label: 'Accounts', location: '#/accounts'},
		{ label: 'Reports', location: '#/reports'},
		{ label: 'How to Use', location: '#/howtouse'},
		{ label: 'About', location: '#/about'},
		{ label: 'System Documentation', location: '/docs'}
	];
	$scope.$on('$routeChangeStart', function(next, current) { 
	$scope.showNavigation = !$scope.isCurrentLocation( '#/splash');
	});
	
};

angular.module( 'debt-calculator' )
	.controller( 'NavController', navController );