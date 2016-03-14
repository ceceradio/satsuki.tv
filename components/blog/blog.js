angular.module('app.blog', ['ngSanitize','tumblr'])
  .component('blog', {
    controller: function($scope, $tumblr) {
      $scope.data = { posts: [], redirect_url: window.location.href };
      $tumblr.getPosts().then(
        function success(data) {
          $scope.data.posts = data;
        },
        function error(data) {
          console.log(data);
        },
        function progress(data) {
          $scope.data.posts = data;
        }
      );
      $scope.getPostBody = function(post) {
        if (post.hasOwnProperty('body_abstract')) {
          return post.body_abstract;
        }
        return post.body;
      }
    },
    templateUrl: 'components/blog/blog.html?@@buildtime'
  });