/*
	app.js

	Purpose: Defines the angular application and its dependencies
*/

angular.module('debt-calculator',['mgcrea.ngStrap', 'ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/accounts', {
				templateUrl: 'account/account-list/account-list.html',
				controller: 'AccountListController'
			})
			.when('/reports', {
				templateUrl: 'report/report.html',
				controller: 'ReportController'
			})
			.when('/about', {
				templateUrl: 'about/about.html',
				controller: 'AboutController'
			})
			.when('/howtouse', {
				templateUrl: 'howtouse/howtouse.html',
				controller: 'HowToUseController'
			})
			.otherwise({ redirectTo: '/accounts' });
		});
var accountEntryController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;
};

angular.module( 'debt-calculator' )
	.controller( 'AccountEntryController', accountEntryController );
/*
	account-factory.js

	Purpose: Model for the accounts in the system
*/
var accountFactory = function(){
	var factory = {};

	factory.accounts = [{ name: 'Bank of America Credit Card', balance: 2000, APR: 20, payment: 100 },
				{ name: 'Citi Credit Card', balance: 3000, APR: 16, payment: 100 },
				{ name: 'American Airlines Credit Card', balance: 4000, APR: 12, payment: 100 },
				{ name: 'Ford Explorer Auto Loan', balance: 20000, APR: 7, payment: 400 },
				{ name: 'Mortgage', balance: 200000, APR: 3, payment: 1200 }];

	factory.create = function( account ) {
		factory.accounts.push( account );
	};

	factory.getNewAccount = function() {
		return angular.copy( {
			name	: "",
			balance : "",
			APR 	: "",
			payment : ""
		});
	};

	factory.deleteAccount = function ( account ) {
		angular.forEach( factory.accounts, function( item, index ) {
			if ( angular.equals( account, item ) ) {
				factory.accounts.splice( index, 1 );
			}
		});
	};

	factory.editAccount = function ( account ) {
		angular.forEach( factory.accounts, function( item, index) {
			if ( angular.equals( account, item ) ) {
				var editAccount = {
					index : index,
					name : "newName",
					APR : "newAPR",
					balance : "newBalance"
				};
				
			//	factory.accounts.splice( index, 1 ); 
				factory.accounts.push(updatedAccount);
			}
		});

	};

	return factory;
};

// Register the factory with angular
angular.module( 'debt-calculator' )
	.factory( 'AccountFactory', accountFactory );

var accountListController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;

	//$scope.totalHouse = 45;
	//works and display 45 on list page
	$scope.addNew = "Totals";

	$scope.newAccount = AccountFactory.getNewAccount();

	$scope.blendedAPR = function () {
		answer0 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	answer0 += Number($scope.accounts[i].APR);
		}

	 $scope.totalHouse0 = answer0 / $scope.accounts.length;
	return $scope.totalHouse0;
	}; //end addNew function


	$scope.totalBalance = function () {
		$scope.answer1 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	$scope.answer1 += Number($scope.accounts[i].balance);
		}

		 $scope.totalHouse1 = $scope.answer1;
		 return $scope.totalHouse1 ;

	}; //end addNew function

	$scope.reset = function() {

		$scope.newAccount = "";
	};

	$scope.create = function() {
		AccountFactory.create( $scope.newAccount );

		$scope.newAccount = AccountFactory.getNewAccount();
	};

	$scope.editAccount = function( account ) {
		var selectedAccount = account;
		console.log(selectedAccount);
	//	AccountFactory.editAccount ( account );
	};

	$scope.deleteAccount = function( account ) {
		AccountFactory.deleteAccount ( account );
	};

	$scope.totalMonthly = function () {
		$scope.answer2 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	$scope.answer2 += Number($scope.accounts[i].payment);
		}

	 $scope.totalHouse2 = $scope.answer2;
	 return $scope.totalHouse2 ;

	}; //end addNew function


}; //end controller accountListController

angular.module( 'debt-calculator' )
	.controller( 'AccountListController', accountListController );

var navController = function( $scope, $location ) {
	// Returns whether the provided path is the current route in the application
	$scope.isCurrentLocation = function( path ){
		return $location.path() == path;
	};
};

angular.module( 'debt-calculator' )
	.controller( 'NavController', navController );

var HowToUseController = function( $scope, AccountFactory ) {
	$scope.howtouse = AccountFactory.howtouse;
};

angular.module( 'debt-calculator' )
	.controller( 'HowToUseController', HowToUseController );
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