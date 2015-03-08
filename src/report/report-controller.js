/**
 * @ngdoc object
 * @name DebtCalculator.Controllers:ReportController
 * @description
 * Front-end controller for the reports page in the system
 */

var reportController = function( $scope, $location, $anchorScroll, $timeout, ReportFactory ) {
	$scope.activeTab = 1;
	/**
     * @ngdoc property
     * @name reportData
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {array} The generated report information 
     * 
     * @description
     * A reference to ReportFactory.reportData; contains generated report information
     */
	$scope.reportData 			= ReportFactory.reportData;

	/**
     * @ngdoc property
     * @name extraPayment
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {number} The extra payment
     * 
     * @description
     * The amount of extra payment that will be provided by the user on a monthly basis for use in the report generation
     */
	$scope.extraPayment 		= 500;

	/**
     * @ngdoc property
     * @name reportTypes
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {array} The report types
     * 
     * @description
     * A reference to ReportFactory.reportTypes; contains the valid report types in the system
     */
	$scope.reportTypes 			= ReportFactory.reportTypes;

	/**
     * @ngdoc property
     * @name selectedReportType
     * @propertyOf DebtCalculator.Controllers:ReportController
     * @returns {object} The selected report type
     * 
     * @description
     * The currently selected report type in the user interface; defaults to the first report type
     */
	$scope.selectedReportType 	= ReportFactory.reportTypes[ 0 ];

	/**
     * @ngdoc method
     * @name runReport
     * @methodOf DebtCalculator.Factories:ReportFactory
     * @param {Object} reportType - The reportType object to run the report against
     * @description
     * Executes the report based on the given parameters and sets the factory.reportData property with the results
     */
	$scope.runReport = function() {
		var chartSeries 	= [];
		var chartCategories = [];

		// Execute the report in the factory
		ReportFactory.runReport( $scope.selectedReportType, $scope.extraPayment );

		$scope.reportData 	= ReportFactory.reportData;
		chartSeries 		= ReportFactory.chartSeries;
		chartCategories 	= ReportFactory.chartCategories;

		Highcharts.setOptions({
            lang: {
               thousandsSep: ','
            }
        });

		// Initialize the Highchart graph
		$('#report-container').highcharts({
	        title: {
	            text: 'Projected Balances',
	            x: -20 //center
	        },
	        xAxis: {
	            categories: chartCategories
	        },
	        yAxis: {
	            title: {
	                text: 'Balance (USD)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valuePrefix: '$',
	            pointFormat: '{series.name}: <b>${point.y:,.2f}</b><br/>'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: chartSeries
	    });
	};
};

angular.module( 'debt-calculator' )
	.controller( 'ReportController', reportController );