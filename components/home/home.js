angular.module('app.home', ['twttr'])
  .component('home', {
    controller: function($scope, $twttr) {
      var tweets = ['691643768236277762','702244202684530689', '695346659891359745', '668271435979321344', '631736185363267584', '619308905747714048'];
      $scope.tweetLoaded = false;
      this.$onInit = function() {
        $twttr.widgets.createTweet(
          tweets.splice(Math.floor(Math.random()*tweets.length),1)[0],
          document.getElementById('tweet1'),
          {}
        ).then(function() {
          $scope.tweetLoaded = true;
          $scope.$apply();
        });
      }
    },
    templateUrl: 'components/home/home.html?@@buildtime'
  });