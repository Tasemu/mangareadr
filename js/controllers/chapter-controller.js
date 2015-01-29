app.controller('chapterController', function ($scope, $state, $stateParams, manga) {
	console.log('chapterController Initialized');
	$scope.app.selectedChapter = $stateParams.chapter;
	$scope.app.state = 'chapter';
	$scope.page = {};
	$scope.pageInfo = {};
	$scope.page.link = $stateParams.link;
	$scope.pageInfo.next = parseInt($stateParams.chapter) + 1;
	$scope.app.loading = true;
	$scope.nextChapter = $.grep($scope.app.selectedSeriesChapters, function(e){ return e.chapter == $scope.pageInfo.next; });

	// $scope.loadNext = function () {
	// 	var nextChapter = $.grep($scope.app.selectedSeriesChapters, function(e){ return e.chapter == $scope.pageInfo.next; });
	// 	$scope.app.loading = true;
	// 	manga.getChapter(nextChapter[0].link, $stateParams.page, function (img) {
	// 		$scope.page = img;
	// 		$scope.app.loading = false;
	// 		$scope.app.selectedChapter = nextChapter[0].chapter;
	// 		$scope.pageInfo.next++;
	// 	});
	// }

	manga.getChapter($stateParams.link, $stateParams.page, function (img) {
		$scope.page = img;
		$scope.app.loading = false;
	});
});