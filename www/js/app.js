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
    
    app.run(["$rootScope", "$log", "$http", "$timeout", function myAppRun($rootScope, $log, $http, $timeout) {

        // Fixing cross-domain problems
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common["X-Requested-With"];
        delete $http.defaults.headers.post['content-type'];
        
        // Handle route change
        $rootScope.$on("$routeChangeStart", function onRouteChangeStart(event, next, current) {
            $rootScope.templateUrl = next.templateUrl;    
        });
        
        $rootScope.$on("$routeChangeSuccess", function onRouteChangeSuccess() {
            // Fire resize event... but first wait for layout to update
            $timeout(function(){
                window.app.fireEvent("updateSize");
            });
        });
        
        setTimeout(function(){
            window.myScroll.refresh();
        });
        
        console.log("### App is running");
    }]);
    
    app.directive("input", ["$timeout", "$rootScope", function($timeout, $rootScope){
        return {
            restrict: "E",
            scope: {
                input: "="
            },
            link: function(scope, element, attrs, ctrl) {
                if (attrs.id === undefined)
                    return;
                
                element.on("mousedown", function(){
                    console.log("Mouse down");    
                });
                
                element.on("focus", function(){
                    console.log("Focus element...");
                    
                    setTimeout(function(){
                        window.myScroll.refresh();
                        window.myScroll.scrollToElement("#" + attrs.id, 300);
                        setTimeout(function(){
                            window.myScroll.refresh();
                            $rootScope.$broadcast("LAYOUT.REFRESH");
                        },350);
                    },200);
                });
                
                element.on("blur", function(){
                    console.log("Blur element...");
                    setTimeout(function(){
                        window.myScroll.refresh();
                        $rootScope.$broadcast("LAYOUT.REFRESH");
                    },200);
                });
            }
        };
    }]);
    
    app.directive("body", ["$rootScope", function($rootScope){
        return {
            restrict: "E",
            scope: {
                body: "="
            },
            link: function(scope, element, attrs, ctrl) {
                $rootScope.$on("LAYOUT.REFRESH", function(){
                    console.log("Refreshing layout...");
                    window.document.documentElement.style.paddingRight = "1px";
                    setTimeout(function(){
                       window.document.documentElement.style.paddingRight = ""; 
                    });
                });
            }
        };
    }]);
    
})(window.angular);