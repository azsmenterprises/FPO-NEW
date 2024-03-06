var app1 = angular.module("myapp", []);

app1.controller("Ctrl1", function ($scope, $http, $filter, $timeout) {
    $scope.traderRefNo = traderRefNo;
  
    $scope.loadTraderProfile = function () {
        ////////console.log("hoooooo");
        $http.get("http://localhost:3000/traderProfile/loadtraderprofile/" + $scope.traderRefNo)
            .then(function (response) {
                $scope.allTraderProfile = response.data
                ////////console.log(response.data);
            });
    }
    $scope.loadTraderProfile();

})