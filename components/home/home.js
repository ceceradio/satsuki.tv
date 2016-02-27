angular.module('app.home', [])
  .component('home', {
    bindings: {
      name: '='
    },
    controller: function() {
      var tweets = ['691643768236277762','702244202684530689', '695346659891359745'];
      this.$onInit = function() {
        twttr.widgets.createTweet(
          tweets.splice(Math.floor(Math.random()*tweets.length),1)[0],
          document.getElementById('tweet1'),
          {}
        );
        twttr.widgets.createTweet(
          tweets.splice(Math.floor(Math.random()*tweets.length),1)[0],
          document.getElementById('tweet2'),
          {}
        );
      }
    },
    templateUrl: 'components/home/home.html'
  });