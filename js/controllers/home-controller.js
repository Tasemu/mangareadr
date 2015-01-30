app.controller('homeController', function ($scope, $state, manga, $stateParams) {
	console.log('homeController Initialized');
	$scope.app.selectedSeries = null;
	$scope.app.selectedChapter = null;
	$scope.app.state = 'home';
	$scope.message = null;
	var page = 1;
	var busy = false;

	if ($stateParams.message) {
		$scope.message = $stateParams.message;
	}

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

    $scope.removeMessage = function () {
    	$scope.message = null;
    }

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