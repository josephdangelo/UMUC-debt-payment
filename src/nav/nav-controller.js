/**
 * @ngdoc object
 * @name DebtCalculator.Controllers:NavController
 * @description
 * Front-end controller for the application navigation
 */

var navController = function( $scope, $location ) {

	$scope.showNavigation = false;
	/**
     * @ngdoc property
     * @name navItems
     * @propertyOf DebtCalculator.Controllers:NavController
     * @returns {array} The navigation items in the system
     * 
     * @description
     * Contains all the navigation elements that will be rendered in the application header
     */

	$scope.navItems = [
		{ label: 'Accounts', location: '#/accounts'},
		{ label: 'Reports', location: '#/reports'},
		{ label: 'How to Use', location: '#/howtouse'},
		{ label: 'About', location: '#/about'},
		{ label: 'System Documentation', location: '/docs'}
	];

	$scope.$on('$routeChangeStart', function(next, current) { 
		$scope.showNavigation = $scope.isCurrentLocation( '/accounts');
	});

	/**
     * @ngdoc method
     * @name isCurrentLocation
     * @methodOf DebtCalculator.Controllers:NavController
     * @returns {boolean} result
     * @description
     * Returns whether the provided path is the current route in the application
     */
	
	$scope.isCurrentLocation = function( path ){
		return '#' + $location.path() == path;
	};
};

angular.module( 'debt-calculator' )
	.controller( 'NavController', navController );