angular.module('app.blogPost', ['ngComponentRouter','ngSanitize','tumblr'])
  .component('blogPost', {
    controller: function blogPostController($scope, $tumblr) {
      $scope.data = { post: false, redirect_url: window.location.href};
      this.$routerOnActivate = function(next, previous) {
        var id = next.params.id;
        $tumblr.getPost(id).then(
          function success(data) {
            $scope.data.post = data;
          },
          function error(data) {
            console.log(data);
          }
        );
      };
    },
    templateUrl: 'components/blogPost/blogPost.html'
  });