/**
 * @ngdoc object
 * @name DebtCalculator.Controllers:NavController
 * @description
 * Front-end controller for the application navigation
 */

var navController = function( $scope, $location ) {

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

	/**
     * @ngdoc property
     * @name showNavigation
     * @propertyOf DebtCalculator.Controllers:NavController
     * @returns {boolean} Whether to show the system navigation
     * 
     * @description
     * Boolean expression for whether to show the system navigation; defaults to whether the initial page view is the splash view
     */
	$scope.showNavigation = !$scope.isCurrentLocation( '#/splash');
	
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
		{ label: 'Accounts',	location: '#/accounts',	 icon: "glyphicon-usd"},
		{ label: 'Reports',		location: '#/reports',	 icon: "glyphicon-stats"},
		{ label: 'How to Use',	location: '#/howtouse',	 icon: "glyphicon-question-sign"},
		{ label: 'About',		location: '#/about',	 icon: "glyphicon-info-sign"}
	];

	/* 
		When a new route is called, determine whether the navigation should be displayed 
		based on the new route 
	*/
	$scope.$on('$routeChangeStart', function(next, current) { 
		$scope.showNavigation = !$scope.isCurrentLocation( '#/splash');
	});

};

angular.module( 'debt-calculator' )
	.controller( 'NavController', navController );