var app = angular.module('app', ['ngComponentRouter','app.home', 'app.app-nav', 'app.blog', 'app.projects']);
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
app.value('$routerRootComponent', 'app');
app.component('app', {
  templateUrl: 'components/app/app.html',
  $routeConfig: [
    { path: '/', component: 'home', name: 'Home' },
    { path: '/projects', component: 'projects', name: 'Projects' },
    { path: '/blog', component: 'blog', name: 'Blog' }
  ]
});
