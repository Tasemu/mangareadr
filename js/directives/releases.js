app.factory('manga', function ($http) {
	return {
		getNewManga: function () {
			$http.get("https://www.kimonolabs.com/api/35b44djg?apikey=8LwWD2Pfiy973UkykfYWeZHGkhlZUweB").
			success(function (data) {
				return data;
			}).
			error(function () {
				console.log("Error getting new manga");
			});
		}
	};
});