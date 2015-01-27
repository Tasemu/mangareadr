app.controller('chapterController', function ($scope, $state, $stateParams, manga) {
	console.log('chapterController Initialized');
	$scope.page = {};
	$scope.page.link = $stateParams.link;
	$scope.page.next = parseInt($stateParams.page) + 1;

	console.log($scope.page.next);

	$scope.app.loading = true;
	manga.getChapter($stateParams.link, $stateParams.page, function (img) {
		$scope.page.image = img;
		$scope.app.loading = false;
	});
});