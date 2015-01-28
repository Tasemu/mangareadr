app.controller('appController', function ($scope, $rootScope, $state, manga) {
	console.log('appController Initialized');
	$scope.app = {};
	$scope.app.loading = true;
	$scope.app.breadcrumbs = [];
	$scope.app.query = '';

	$scope.search = function () {
		console.log("searching: " + $scope.app.query);
		$scope.app.loading = true;
		if ($scope.app.query == '') {
			$rootScope.$broadcast('search-reset');
			$scope.app.loading = false;
		} else {
			manga.searchManga($scope.app.query, function (data) {
				$rootScope.$broadcast('search-started', {results: data});
				$scope.app.loading = false;
			});
		}
	}
});