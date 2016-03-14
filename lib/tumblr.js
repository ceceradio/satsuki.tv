angular.module('tumblr', [])
  .service('$tumblr',function($q, $http, $timeout) {
    return {
      posts: JSON.parse(localStorage.getItem('blog.posts')),
      getPosts: function() {
        var deferred = $q.defer();
        var self = this;
        // strangely enough, you can't notify before you return the promise.
        // Even though you can resolve or reject. Ha Ha Ha Ha
        $timeout(function() {
          deferred.notify(self.posts);
        }, 0);
        $http.jsonp('https://api.tumblr.com/v2/blog/satsukitv.tumblr.com/posts/text?callback=JSON_CALLBACK&reblog_info=true&notes_info=true&api_key=FdXg500s7QtYKmBdk1EuFp4wGSQWWOPHnTF9bHd6gP3vrFTmQc',{}).then(
          function success(xhr) {
            localStorage.setItem('blog.posts', JSON.stringify(xhr.data.response.posts));
            this.posts = xhr.data.response.posts;
            deferred.resolve(this.posts);
          },
          function error(xhr) {
            deferred.reject(xhr);
          }
        );
        return deferred.promise;
      },
      getPost: function(id) {
        function search(a, id) {
          if (!a) {
            return false;
          }
          for (var i in a) {
            if (a[i].id == id) {
              return a[i];
            }
          }
          return false;
        }
        var deferred = $q.defer();
        var cachedPost = search(this.posts, id);
        if (cachedPost) {
          deferred.resolve(cachedPost);
          return deferred.promise;
        }
        this.getPosts().then(
          function success(data) {
            deferred.resolve(search(this.posts, id));
          },
          function error(data) {
            deferred.reject(data);
          }
        );
        return deferred.promise;
      }
    };
  });
