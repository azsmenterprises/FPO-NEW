var app1 = angular.module("myapp", []);

app1.controller("ctrl1", function ($scope,excelService, $http, $filter, $timeout) {

    $scope.cropCatArray = []
    $scope.sortFpo
    $scope.searchFpoName

    $scope.loadFposWithSort = function () {
        if ($scope.sortFpo == 'name') {
            $http.get("http://localhost:3000/fpoFilter/loadFposWithSort")
                .then(function (response) {
                    // $scope.allFpos = response.data;
                    $scope.numDifferentiation(response.data)
                });
        }
    }

    $scope.downloadFPOList = function () {
        console.log($scope.allFpos,"allFpos");
        excelService.exportToExcel($scope.allFpos, 'Fpo-List ');
        // excelService.writeExcel($scope.allFpos, 'Fpo-List');
    }

    $scope.searchFpoFromSearchBar = function () {
        if ($scope.searchFpoName) {
            $http.get("http://localhost:3000/fpoFilter/searchFpoFromSearchBar/" + $scope.searchFpoName)
                .then(function (response) {
                    // $scope.allFpos = response.data;
                    $scope.numDifferentiation(response.data)
                });
        }
    }

    $scope.loadDistrcits = function () {
        $http.get("http://localhost:3000/landRoute/getDistricts")
            .then(function (response) {
                $scope.DistrictList = response.data;
            });
    }
    $scope.loadDistrcits();

    $scope.loadBlocks = function () {
        if ($scope.District != null) {

            $http.get("http://localhost:3000/landRoute/getBlocksOfDistrict/" + JSON.parse($scope.District).districtCode)
                .then(function (response) {
                    $scope.BlockList = response.data;
                });
        }
    }

    $scope.loadCropCatagories = function () {
        $http.get("http://localhost:3000/fpoFilter/loadCropCatagories")
            .then(function (response) {
                $scope.cropCatagories = response.data;
            });
    }

    $scope.loadCropCatagories();


    $scope.loadFpos = function () {
        $http.get("http://localhost:3000/fpoFilter/loadFpos")
            .then(function (response) {
                $scope.allFpos = response.data;
                //console.log( $scope.allFpos);
            });
    }

    $scope.loadFpos();


    $scope.getCropCatOnCheck = function (cropCatName, myValue) {
        if (myValue == true) {
            $scope.cropCatArray.push(cropCatName)
        }
        if (myValue == false) {
            $scope.cropCatArray = $scope.cropCatArray.filter(a => a != cropCatName)
        }
    }

    $scope.searchFpo = function () {
        // cropCatArray:$scope.cropCatArray

        $scope.allFpos = []
        // if ($scope.Block) {
            console.log($scope.startTurnoverNo,4444444);
            console.log($scope.endTurnoverNo,4444444);
            if ($scope.District) {
                $scope.DistrictCode = JSON.parse($scope.District).districtCode ;
            }else{
                $scope.DistrictCode = '';
            }
            if ($scope.Block) {
                $scope.BlockCode = JSON.parse($scope.Block).blockCode ;
            }else{
                $scope.BlockCode = '';
            }

          //console.log($scope.cropCatArray,"JSON.parse($scope.Block).blockCode");
            $http.get("http://localhost:3000/fpoFilter/searchFpo?districtCode=" + $scope.DistrictCode + "&blockCode=" + $scope.BlockCode +"&cropcat="+$scope.cropCatArray +"&startTurnoverNo="+$scope.startTurnoverNo +"&endTurnoverNo="+$scope.endTurnoverNo)
                .then(function (response) {
                    $scope.allFpos = response.data;
                });
        // } else {
        //     //console.log($scope.Block, 4444444);
        //     $http.get("http://localhost:3000/fpoFilter/searchFpo?districtCode=" + JSON.parse($scope.District).districtCode)
        //         .then(function (response) {
        //             $scope.allFpos = response.data;
        //         });
        // }
    }

    $scope.redirectToFpoProfile = function (data) {
        window.location.href = 'http://localhost:3000/redirectToFpoProfile?fpoData=' + data.refNo;
        // $http.get("http://localhost:3000/redirectToFpoProfile?fpoData="+data.refNo)
        //     .then(function (response) {
        //         // if(response.data){
        //         //     window.location='/fpoProfile?fpoRefNo='+response.data.fpoRefNo
        //         // }
        //     });
    }


    $scope.redirectToFpoProfileNew = function (data) {
        window.location.href = 'http://localhost:3000/fpoProfileNew?fpoData=' + data.fpoId;
        // console.log(data,"kjkjhhhhhhhhhh");

    }

    // Below function is to convert turn over to lakh
    $scope.numDifferentiation = function (value) {
        for (let i = 0; i < value.length; i++) {
            var val = Math.abs(value[i].totalBusinessDone?.tbd1920)
            if (val >= 10000000) {
                value[i].totalBusinessDone.tbd1920 = (val / 10000000).toFixed(2) + ' Cr';
            } else if (val >= 100000) {
                value[i].totalBusinessDone.tbd1920 = (val / 100000).toFixed(2) + ' Lac';
            }
            if (i + 1 == value.length) {
                $scope.allFpos = value
            }
        }
    }

})