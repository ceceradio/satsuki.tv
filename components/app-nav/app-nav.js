angular.module('app.app-nav', [])
  .component('appNav', {
    bindings: {
    },
    controller: function($scope, $location) {
      $scope.isActive = function(partial) {

        return ($location.url() == "/"+partial);
      }
    },
    templateUrl: 'components/app-nav/app-nav.html'
  });
  