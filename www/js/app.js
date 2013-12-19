(function(angular) {
    "use strict";
    
    var app = angular.module("MyApp", ["ngRoute", "ngTouch"]);
    
    app.config(["$routeProvider", function myAppConfig($routeProvider) {
        
        var routes = {
            "/home": {
                controller: "HomeCtrl",
                templateUrl: "partials/content1.html"
            }
        };
        
        $routeProvider.otherwise({
            redirectTo: "/home"
        });
        
        for (var key in routes) {
            $routeProvider.when(key, routes[key]);
        }
        
        console.log("### App is configured");
    }]);
    
    app.run(["$rootScope", "$log", "$http", function myAppRun($rootScope, $log, $http) {

        // Fixing cross-domain problems
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common["X-Requested-With"];
        delete $http.defaults.headers.post['content-type'];
        
        console.log("### App is running");
    
    }]);
    
})(window.angular);