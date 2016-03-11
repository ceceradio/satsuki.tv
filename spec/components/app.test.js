'use strict';

angular.module('twttr', [])
  .service('$twttr',function() {
    return {
      widgets: {
        createTweet: jasmine.createSpy('createTweet').and.returnValue({
          then: jasmine.createSpy('then')
        })  
      }
    };
  });

 
describe('AppComponent', function(){
  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('app'));
  beforeEach(module('templates'));
  var element;
  var scope;

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<app></app>');
    element = $compile(element)(scope);
    scope.outside = '1.5';
    scope.$apply();
  }));

  it('should have an ngOutlet', function() {
    var outlet = element.find('ng-outlet');
    expect(outlet).toBeTruthy();
  });
});