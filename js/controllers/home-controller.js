app.controller('homeController', function ($scope, $state, manga) {
	console.log('homeController Initialized');
	$scope.app.selectedSeries = null;
	$scope.app.selectedChapter = null;
	$scope.app.state = 'home';
	var page = 1;
	var busy = false;

	manga.getNewManga(page, function (manga) {
		$scope.newManga = manga;
		$scope.app.loading = false;
		page++;
	});

    $scope.loadMore = function() {
        if ($scope.newManga && $scope.newManga.length != 0 && !busy) {
        	busy = true;
        	manga.getNewManga(page, function (manga) {
        		$scope.newManga.push.apply($scope.newManga, manga);
        		busy = false;
        		page++;
        	});
        }
    };

    $scope.$on('search-reset', function () {
    	page = 1;
    	busy = false;
    	manga.getNewManga(page, function (manga) {
			$scope.newManga = manga;
			$scope.app.loading = false;
			page++;
		});
    });

    $scope.$on('search-started', function(event, args) {
    	busy = true;
	    console.log('search received');
	    $scope.newManga = args.results;
	});
});