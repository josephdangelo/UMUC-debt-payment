var reportController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
	
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

	// calculation
// data fields
// data fields for output
$scope.themonth = [0];
$scope.b0 = [$scope.accounts[0].balance];
$scope.b1 = [$scope.accounts[1].balance];
$scope.b2 = [$scope.accounts[2].balance];
$scope.b3 = [$scope.accounts[3].balance];
$scope.b4 = [$scope.accounts[4].balance];
$scope.totalinterest = [0];
$scope.notapplied = [0];
/* $scope.thebalance = [[$scope.accounts[0].balance],[$scope.accounts[1].balance],
[$scope.accounts[2].balance],[$scope.accounts[3].balance],[$scope.accounts[4].balance]]; */
// data field for calculation
$scope.month_no = 0;
var index;
$scope.theaccount = 0;
$scope.bal = [$scope.accounts[0].balance, $scope.accounts[1].balance, 
$scope.accounts[2].balance, $scope.accounts[3].balance, $scope.accounts[4].balance];
$scope.mandatory_payment = 0;
$scope.remainder = 0;
$scope.extra = 3000; // need to use input from users
// testing purpose (delete when calculation is verified)
/* for(var i=0; i<100; i++){
	$scope.themonth[$scope.themonth.length] = $scope.themonth[$scope.themonth.length-1]+1;
	$scope.b0[$scope.b0.length] = $scope.b0[$scope.b0.length-1]-10;
	$scope.b1[$scope.b1.length] = $scope.b1[$scope.b1.length-1]-10;
	$scope.b2[$scope.b2.length] = $scope.b2[$scope.b2.length-1]-10;
	$scope.b3[$scope.b3.length] = $scope.b3[$scope.b3.length-1]-10;
	$scope.b4[$scope.b4.length] = $scope.b4[$scope.b4.length-1]-10;
} */
/* for(var i=0; i<100; i++){
	$scope.themonth[$scope.themonth.length] = $scope.themonth[$scope.themonth.length-1]+1;
	for(var j=0; j<$scope.thebalance.length; j++){
		$scope.thebalance[j,i] = $scope.thebalance[j,$scope.thebalance]
	}
} */
$scope.thereport = "apr " + $scope.accounts[0].APR;
// monthly calculation
while($scope.month_no < 200){
	// start with month 1
	$scope.month_no++;
	$scope.themonth[$scope.month_no] = $scope.month_no;
	// initialize monthly mandatory payment of max(interest, monthly payment)
	$scope.mandatory_payment = 0;
	// for now, only calculate interest instead of using minimum monthly payment
	for(index=0; index<$scope.accounts.length; index++){
		$scope.mandatory_payment += $scope.bal[index] * $scope.accounts[index].APR /1200;
	}
	$scope.totalinterest[$scope.month_no] = $scope.mandatory_payment;
	// calculate remainder for paying the chosen account
	$scope.remainder = $scope.extra - $scope.mandatory_payment;
	// check if the chosen account have enough balance to paid off
	// and update the account balances
	if($scope.bal[$scope.theaccount] > $scope.remainder){
		$scope.bal[$scope.theaccount] -= $scope.remainder;
		$scope.remainder = 0;
		// assign monthly account balances to account balance arrays
		if($scope.theaccount === 0){
			$scope.b0[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 1){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 2){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 3){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 4){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.bal[$scope.theaccount];
		}
	} else {
		$scope.remainder -= $scope.bal[$scope.theaccount];
		$scope.bal[$scope.theaccount] = 0;
		$scope.notapplied[$scope.month_no] = $scope.remainder;
		// assign monthly account balances to account balance arrays
		if($scope.theaccount === 0){
			$scope.b0[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 1){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 2){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 3){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.bal[$scope.theaccount];
			$scope.b4[$scope.month_no] = $scope.b4[$scope.month_no-1];
		} else if($scope.theaccount === 4){
			$scope.b0[$scope.month_no] = $scope.b0[$scope.month_no-1];
			$scope.b1[$scope.month_no] = $scope.b1[$scope.month_no-1];
			$scope.b2[$scope.month_no] = $scope.b2[$scope.month_no-1];
			$scope.b3[$scope.month_no] = $scope.b3[$scope.month_no-1];
			$scope.b4[$scope.month_no] = $scope.bal[$scope.theaccount];
		}
		$scope.theaccount++;
	}
	if($scope.theaccount == $scope.accounts.length) { break;}
}
};

angular.module( 'debt-calculator' )
	.controller( 'ReportController', reportController );