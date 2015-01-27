app.controller('appController', function ($scope, $rootScope, $state) {
	console.log('appController Initialized');
	$scope.app = {};
	$scope.app.loading = true;
	$scope.app.breadcrumbs = [];
});