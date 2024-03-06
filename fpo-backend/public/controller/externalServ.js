var app1 = angular.module("myapp1", []);

// $scope.FpoDistrcits = function () {
//     $http.get("http://localhost:3000/api/getDistricts")
//         .then(function (response) {
//             $scope.FpoDistrictList = response.data;
//             //console.log($scope.FpoDistrictList,"ctrlr");
//         });
// }

$scope.registerFpo = function () {
    $http.post("http://localhost:3000/api/registerFpo")
        .then(function (response) {
            //console.log(response,"response");
            
        });
}