app.factory('manga', function ($http) {
	return {
		getNewManga: function (page, cb) {
			$http.get("http://localhost:3000/mangas?page=" + page).
			success(function (data) {
				cb(data);
			}).
			error(function () {
				console.log("Error getting new manga");
			});
		},
		getSeries: function (link, cb) {			

			$http.get(link).
			success(function (data) {
				var manga = {};
				manga.chapters = [];
				manga.title = $(data).find('#title h1').text();
				manga.image = $(data).find('#series_info > .cover img').attr('src');
				manga.description = $(data).find('#title p.summary').text();
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
				var total = num;				

				var pages = [];
				var query = removeLastPart(link);

				for (var i = page; i <= total; i++) {
				    var full = query + "/" + i + ".html";
				    (function(idx, full, total){
				       $http.get(full).
				           success(function (data) {                       
				               pages[idx] = {image: $(data).find('img#image').attr('src'), page: idx};
				               console.log();
				               //assuming j is a counter for knowing when pages are loaded
				               if (idx == total) {  
				               	   console.log('calling cb');                         
				                   cb(pages);
				               }
				           }).
				           error(function () {
				              console.log("Error getting chapter");
				           });
				    })(i, full, total);
				}

				// for (var i = page; i < total; i++) {
				// 	var full = query + "/" + i + ".html";
				// 	$http.get(full).
				// 	success(function (data) {						
				// 		pages.push({image: $(data).find('img#image').attr('src'), page: j});
				// 		j++;
				// 		if (i == total) {							
				// 			cb(pages);
				// 		}
				// 	}).
				// 	error(function () {
				// 		console.log("Error getting chapter");
				// 	});
				// }

			}).
			error(function () {
				console.log("Error getting page number");
			});
		},
		searchManga: function (query, cb) {
			$http.get("http://localhost:3000/mangas/search?query=" + query).
			success(function (data) {
				cb(data);
			}).
			error(function () {
				console.log("Error getting searched manga");
			});
		},
		addView: function (id) {
			$http.get("http://localhost:3000/manga/viewed?id=" + id).
			success(function (data) {
				console.log("View added successfully");
			}).
			error(function () {
				console.log("Error adding view to manga");
			});
		}
	};
});