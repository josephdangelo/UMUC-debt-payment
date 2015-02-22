var accountListController = function( $scope, AccountFactory ) {
	$scope.accounts = AccountFactory.accounts;

	$scope.addNew = "Totals";

	$scope.blendedAPR = function () {
		var answer0 = 0;
		for(var i=0, len=$scope.accounts.length; i < len; ++i)

		{
	    	answer0 += (Number($scope.accounts[i].APR)* Number($scope.accounts[i].balance));
		}
	 $scope.totalHouse0 = answer0 ;

	// $scope.totalHouse0 = answer0 / $scope.accounts.length;
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

		$scope.newAccount = AccountFactory.getNewAccount();
	};

	$scope.editAccount = function( account ) {
		var selectedAccount = account;
		$scope.newAccount = selectedAccount;

		//$scope.deleteAccount(account);
	};

	$scope.deleteAccount = function( account ) {
		AccountFactory.deleteAccount ( account );
	};

	$scope.addAccount = function() {
		AccountFactory.addAccount();
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
