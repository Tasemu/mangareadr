var app = angular.module('mangareader', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "js/views/home.html",
      controller: "homeController"
    }).state('series', {
    	url: "/series/:title",
    	templateUrl: "js/views/series.html",
    	controller: "seriesInfoController"
    }).state('chapter', {
      url: "/chapter/:link/:page",
      templateUrl: "js/views/chapter.html",
      controller: "chapterController"
    });
});