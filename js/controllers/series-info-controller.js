app.controller('seriesInfoController', function ($scope, $state, $stateParams, manga) {
	console.log("seriesInfoController Initialized");
	$scope.app.loading = true;
	$scope.manga = {};
	manga.getSeries($stateParams.title, function (manga) {
		$scope.app.loading = false;
		$scope.manga = manga;
	});
});