(function(angular) {
    
    var app = angular.module("MyApp");
    
    app.controller("HomeCtrl", ["$scope", function($scope) {
        console.log("HomeCtrl");
    }]);
    
})(window.angular);