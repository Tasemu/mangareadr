app.controller('seriesInfoController', function ($scope, $state, $stateParams, manga) {
	console.log("seriesInfoController Initialized");
	$scope.app.loading = true;
	$scope.app.selectedChapter = null;
	$scope.app.selectedSeries = $stateParams.title;
	$scope.app.selectedSeriesLink = $stateParams.link;
	$scope.app.state = 'series';
	$scope.manga = {};

	manga.addView($stateParams.id);

	manga.getSeries($stateParams.link, function (manga) {
		$scope.app.loading = false;
		$scope.manga = manga;
		$scope.app.selectedSeriesChapters = manga.chapters;
	});
});