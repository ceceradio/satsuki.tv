var app = angular.module('app', ['ngComponentRouter','app.home', 'app.app-nav', 'app.blog', 'app.blogPost', 'app.projects']);
app.value('$routerRootComponent', 'app');
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
app.component('app', {
  templateUrl: 'components/app/app.html',
  $routeConfig: [
    { path: '/', component: 'home', name: 'Home', useAsDefault: true },
    { path: '/projects', component: 'projects', name: 'Projects' },
    { path: '/blog/:id', component: 'blogPost', name: 'BlogPost' },
    { path: '/blog', component: 'blog', name: 'Blog' }
  ]
});
