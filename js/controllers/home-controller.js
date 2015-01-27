app.controller('homeController', function ($scope, manga) {
	console.log('homeController Initialized');
	manga.getNewManga(function (manga) {
		$scope.newManga = manga;
		$scope.app.loading = false;
	});
});