app.controller('chapterController', function ($scope, $state, $stateParams, manga) {
	console.log('chapterController Initialized');

	if (!$stateParams.link || !$stateParams.name) {
		$state.go('home', {message: "Last Chapter Reached"});
	}

	$scope.app.selectedChapter = $stateParams.chapter;
	$scope.app.state = 'chapter';
	$scope.page = {};
	$scope.pageInfo = {};
	$scope.page.link = $stateParams.link;
	$scope.pageInfo.next = parseInt($stateParams.chapter) + 1;
	$scope.app.loading = true;
	$scope.nextChapter = $.grep($scope.app.selectedSeriesChapters, function(e){ return e.chapter == $scope.pageInfo.next; });

	manga.getChapter($stateParams.link, $stateParams.page, function (img) {
		$scope.page = img;
		$scope.app.loading = false;
	});
});