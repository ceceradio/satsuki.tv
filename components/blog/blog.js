angular.module('app.blog', ['ngSanitize'])
  .component('blog', {
    controller: function($scope, $http) {
      var posts = localStorage.getItem('blog.posts');
      $scope.data = { posts: false, redirect_url: window.location.href, currentPost: false };
      $http.jsonp('https://api.tumblr.com/v2/blog/satsukitv.tumblr.com/posts/text?callback=JSON_CALLBACK&reblog_info=true&notes_info=true&api_key=FdXg500s7QtYKmBdk1EuFp4wGSQWWOPHnTF9bHd6gP3vrFTmQc',{}).then(
        function success(xhr) {
          localStorage.setItem('blog.posts',xhr.data.response.posts);
          $scope.data.posts = xhr.data.response.posts;
        },
        function error(xhr) {
          console.log(data)
        }
      );
      $scope.getPostBody = function(post) {
        if (post.hasOwnProperty('body_abstract')) {
          if ($scope.data.currentPost != post)
            return post.body_abstract;
          else
            return post.body;
        }
        return post.body;
      }
    },
    templateUrl: 'components/blog/blog.html'
  });