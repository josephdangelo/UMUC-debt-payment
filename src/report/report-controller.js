/**
 * @ngdoc object
 * @name DebtCalculator.Controllers:ReportController
 * @description
 * Front-end controller for the reports page in the system
 */

var reportController = function( $scope, ReportFactory ) {
	$scope.reportData 			= ReportFactory.reportData;
	$scope.extraPayment 		= "";
	$scope.reportTypes 			= ReportFactory.reportTypes;
	$scope.selectedReportType 	= {};
	
	$scope.runReport = function() {
		var chartSeries 	= [];
		var chartCategories = [];

		// Execute the report in the factory
		ReportFactory.runReport( $scope.selectedReportType );

		$scope.reportData = ReportFactory.reportData;

		// Populate the series array with the account information
		angular.forEach( ReportFactory.reportData.accounts, function( account, index ) {
			chartSeries.push({
				name: account,
				data: []
			});
		});

		// For each report month, add the balance to the respective series 
		angular.forEach( ReportFactory.reportData.months, function( month, monthNDX ) {
			chartCategories.push( monthNDX );

			angular.forEach( month.accounts, function( account, accountNDX ) {
				chartSeries[ accountNDX ].data.push( account.endingBalance );
			});
		});

		Highcharts.setOptions({
            lang: {
               thousandsSep: ','
            }
        });

		// Initialize the Highchart graph
		$('#container').highcharts({
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