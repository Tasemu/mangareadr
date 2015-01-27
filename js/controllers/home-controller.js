app.controller('homeController', function ($scope, manga) {
	console.log('homeController Initialized');
	$scope.app.selectedSeries = null;
	$scope.app.selectedChapter = null;
	$scope.app.state = 'home';
	var counter = 0;

	manga.getNewManga(function (manga) {
		$scope.newManga = manga;
		$scope.visibleManga = [];
		$scope.app.loading = false;
		$scope.loadMore();
	});

    $scope.loadMore = function() {
        if ($scope.newManga && $scope.newManga.length != 0) {
        	for (var i = 0; i < 8; i++) {
	            if (counter < $scope.newManga.length) {
	            	$scope.visibleManga.push($scope.newManga[counter]);
	            	counter++;
	            }
	        }
        }
    };
});