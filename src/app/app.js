angular.module("yg", ["ngRoute", "tn.address"])
 .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<address-list></address-list>'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);