var app = angular.module('mangareader', ['ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/:message",
      templateUrl: "js/views/home.html",
      controller: "homeController"
    }).state('series', {
    	url: "/series/:link/:title/:id",
    	templateUrl: "js/views/series.html",
    	controller: "seriesInfoController"
    }).state('chapter', {
      url: "/chapter/:name/:link/:chapter/:page",
      templateUrl: "js/views/chapter.html",
      controller: "chapterController"
    });
});