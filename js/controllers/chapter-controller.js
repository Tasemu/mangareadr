app.controller('chapterController', function ($scope, $state, $stateParams, manga) {
	console.log('chapterController Initialized');
	$scope.app.selectedChapter = $stateParams.chapter;
	$scope.app.state = 'chapter';
	$scope.page = {};
	$scope.page.link = $stateParams.link;
	$scope.page.next = parseInt($stateParams.page) + 1;
	$scope.app.loading = true;
	manga.getChapter($stateParams.link, $stateParams.page, function (img) {
		$scope.page.image = img;
		$scope.app.loading = false;
	});
});