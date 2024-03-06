var myapp2 = angular.module("myapp", []);

myapp2.controller("ctrl", function ($scope, $http, $filter, $timeout) {

    $scope.id = id
    $scope.landingpagetopdatadata

    $scope.getlandingpagetopmenuData = function () {
        $http.get("http://localhost:3000/landRoute/getlandingpagetopmenuData/" + $scope.id)
            .then(function (response) {
                // ////////console.log(111,response.data);
                $scope.landingpagetopdatadata = response.data;
                document.getElementById("test123").innerHTML = response.data.description;
            });
    }
    $scope.getlandingpagetopmenuData();

    

})