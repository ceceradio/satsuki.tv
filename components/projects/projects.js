angular.module('app.projects', [])
  .component('projects', {
    controller: function($scope) {
      var projects = [
        {
          name: "Answer a Thing",
          url: "https://aat.devfluid.com",
          repository: "https://github.com/satsukitv/answer-a-thing",
          description: "A creative online game where players earn points by drawing or writing the best answer to someone's question, and by guessing whose answer will chosen as the best! A fun and open-ended game that's great for breaking the ice or having fun with old friends!",
          image: false
        },
        {
          name: "genders.json",
          url: false,
          repository: "https://github.com/satsukitv/genders",
          description: "A json file with an incomplete list of genders that is useful to developers creating social platforms or personal information forms.",
          image: false
        },
        {
          name: "Pepito's Friend",
          url: "http://twitter.com/pepitosfriend",
          repository: "https://github.com/satsukitv/pepitos-friend",
          description: "A twitter robot cat who is friends with @PepitoTheCat. Responds to Pepito's coming and going tweets, and tweets about his activities throughout the day.",
          image: "/static/img/pepitosfriend.png"
        },
        {
          name: "Twitter Block Chain",
          url: "https://chrome.google.com/webstore/detail/twitter-block-chain/dkkfampndkdnjffkleokegfnibnnjfah?hl=en",
          urlLabel: "Google Web Store",
          repository: "https://github.com/satsukitv/twitter-block-chain",
          description: "This browser extension helps users who are likely to be, or currently are being dog-piled. By navigating to a user's followers (or following) page and activating the plugin, you can block all users on that page.",
          image: "/static/img/twitterblockchain.png"
        },
      ];
      $scope.projects = projects;
      $scope.getImage = function(image) {
        if (image) {
          return image;
        }
        return "/static/img/satsuki.png";
      }
      $scope.getUrl = function(project) {
        if (project.url) {
          return project.url;
        }
        if (project.repository) {
          return project.repository;
        }
        return "";
      }
      $scope.getUrlLabel = function(project) {
        if (project.hasOwnProperty('urlLabel') && project.urlLabel) {
          return project.urlLabel;
        }
        if (!project.hasOwnProperty('url') || !project.url) {
          return "";
        }
        return project.url.replace("http://","").replace("https://","");
      }
      $scope.getRepositoryLabel = function(url) {
        if (!url) {
          return "";
        }
        var idx = url.indexOf("github.com/");
        if (idx > -1){
          idx = url.indexOf("github.com/")+"github.com/".length;
          return url.substring(idx, url.length);
        }
        return url;
      }
    },
    templateUrl: 'components/projects/projects.html?@@buildtime'
  });