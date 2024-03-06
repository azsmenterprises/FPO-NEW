var myapp2 = angular.module("myapp", []);

myapp2.controller("ctrl", function ($scope, $http, $filter, $timeout) {

    $scope.id = id
    $scope.showPdf = false

    $scope.getSchemeDetails = function () {
        $http.get('http://localhost:3000/landRoute/schemeDetails/' + id).then(function (response) {
            $scope.schemeDetails = response.data
            $scope.showPdf = true
            $scope.pdfPath="schemeDocsUploaded/"+$scope.schemeDetails.pdfFileUrl
        })
    }

    $scope.getSchemeDetails()

})