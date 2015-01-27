app.factory('manga', function ($http) {
	return {
		getNewManga: function (cb) {
			$http.get("http://localhost:3000/mangas").
			success(function (data) {
				cb(data);
			}).
			error(function () {
				console.log("Error getting new manga");
			});
		},
		getSeries: function (name, cb) {

			var formattedName = name.toLowerCase().replace('-', ' ').replace('\'', ' ').replace(':', '').replace('!', '').split(' ').join('_');

			$http.get('http://mangafox.me/manga/' + formattedName + '/').
			success(function (data) {
				var manga = {};
				manga.chapters = [];
				manga.title = $(data).find('#title h1').text();
				manga.image = $(data).find('#series_info > .cover img').attr('src');
				manga.description = $(data).find('#title p.summary').text();
				manga.slug = formattedName;
				async.each($(data).find('ul.chlist'), function (element, callback) {

					$(element).find('li').each(function () {
						var chapter = $(this).find('h3 > a, h4 > a');						
						manga.chapters.push({
							title: chapter.text(),
							link: chapter.attr('href'),
							chapter: chapter.text().split(' ').pop()
						});
					});

					callback();

				}, function () {					
					cb(manga);
				});
			}).
			error(function () {
				console.log("Error getting series info");
			});
		},
		getChapter: function (link, page, cb) {

			var removeLastPart = function(url) {
			    var lastSlashIndex = url.lastIndexOf("/");
			    if (lastSlashIndex > url.indexOf("/") + 1) { // if not in http://
			        return url.substr(0, lastSlashIndex); // cut it off
			    } else {
			        return url;
			    }
			}

			$http.get(link).
			success(function (data) {				
				var num = parseInt($(data).find('.r.m .l').first().text().split(' ').pop());
				total = num + 1;				

				var pages = [];
				var query = removeLastPart(link);

				for (var i = page; i < total; i++) {
					var full = query + "/" + i + ".html";
					$http.get(full).
					success(function (data) {						
						pages.push($(data).find('img#image').attr('src'));
						if (i == total) {							
							cb(pages);
						}
					}).
					error(function () {
						console.log("Error getting chapter");
					});
				}

			}).
			error(function () {
				console.log("Error getting page number");
			});

			// var full = query + "/" + page + ".html"

			// $http.get(full).
			// success(function (data) {
			// 	var page = $(data).find('img#image').attr('src');
			// 	cb(page);
			// }).
			// error(function () {
			// 	console.log("Error getting chapter");
			// });
		}
	};
});