var reportController = function( $scope ) {
	$('#container').highcharts({
		        title: {
		            text: 'Projected Balances',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: ['Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015',
		                'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', 'Nov 2015', 'Dec 2015']
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
		            valuePrefix: '$'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Bank of America Credit Card',
		            data: [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0]
		        }, {
		            name: 'Sally Mae Student Loan',
		            data: [2000, 1500, 1000, 500, 0]
		        }, {
		            name: 'USAA Auto Loan',
		            data: [5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 0]
		        }, {
		            name: 'Navy Federal Personal Loan',
		            data: [2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400, 200, 0]
		        }]
		    });
};

angular.module( 'debt-calculator' )
	.controller( 'ReportController', reportController );