app.controller('seriesInfoController', function ($scope, $state, $stateParams, manga) {
	console.log("seriesInfoController Initialized");
	$scope.app.loading = true;
	$scope.app.selectedChapter = null;
	$scope.app.selectedSeries = $stateParams.title;
	$scope.app.state = 'series';
	$scope.manga = {};
	manga.getSeries($stateParams.title, function (manga) {
		$scope.app.loading = false;
		$scope.manga = manga;
	});
});