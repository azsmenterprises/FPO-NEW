var app1 = angular.module("myapp", []);

app1.controller("ctrl1", function ($scope, $http,excelService, $filter, $timeout) {
    $scope.allTrader
    $scope.sortTrader
    $scope.searchtraderName

    $scope.searchTrader = function () {      
        $scope.allTrader=[]  
        $http.get("https://fpoodisha.nic.in/trader/searchTrader?state="+$scope.State+"&districtName="+$scope.District+"&Crop_Name="+$scope.Crop_Name)
            .then(function (response) {
                 $scope.allTrader = response.data;
               // $scope.numDifferentiation(response.data)
            });
    }

    $scope.loadTrader = function () {
        $http.get("https://fpoodisha.nic.in/trader/loadtrader")
            .then(function (response) {
                // $scope.allFpos = response.data;
                $scope.allTrader = response.data
            });
    }

    $scope.loadTrader();
    $scope.redirectToTraderProfile = function (x) {
        window.location.href = 'https://fpoodisha.nic.in/redirectToTraderProfile?traderRefNo=' + x.refNo;

    }

    $scope.loadTraderWithSort = function () {
        console.log("hii23");
        if ($scope.sortTrader == 'name') {
            $http.get("https://fpoodisha.nic.in/trader/loadtraderwithsort")
                .then(function (response) {
                    console.log(response);
                    $scope.numDifferentiation(response.data)
                    console.log(response.data);
                });
        }
    }

    $scope.searchTraderFromSearchBar = function () {
       
        if ($scope.searchtraderName) {
            $http.get("https://fpoodisha.nic.in/trader/searchTraderFromSearchBar/" + $scope.searchtraderName)
                .then(function (response) {
                    console.log(response);
                    $scope.numDifferentiation(response.data);
                });
        }
    }

    $scope.downloadTraderList = function () {
        console.log($scope.allTrader,"allTrader");
        excelService.exportToExcel($scope.allTrader, 'trader-List ');
        // excelService.writeExcel($scope.allFpos, 'Fpo-List');
    }

    $scope.loadDistrcits = function () {
        $http.get("https://fpoodisha.nic.in/landRoute/getDistricts")
            .then(function (response) {
                $scope.DistrictList = response.data;
            });
    }
    $scope.loadDistrcits();

    $scope.loadAvailableDistrcits = function () {
        console.log($scope.State);
        if ($scope.State != null) {
            $scope.searchTrader()
            $http.get("https://fpoodisha.nic.in/trader/getTraderDistricts?state=" + $scope.State)
                .then(function (response) {
                    $scope.DistrictList = response.data;
                });
        }
    }

    $scope.loadAvailableState = function () {
        $scope.searchTrader()
        $http.get("https://fpoodisha.nic.in/trader/getTraderState")
            .then(function (response) {
                $scope.StateList = response.data;
                console.log(response.data);
            });
    }
    $scope.loadAvailableState();


    $scope.loadAvailableCrop = function () {
        $scope.searchTrader()
        $http.get("https://fpoodisha.nic.in/trader/getTraderCrop?state="+$scope.State+"&districtName="+$scope.District)
            .then(function (response) {
                $scope.CropList = response.data;
            });
    }
    $scope.loadAvailableCrop();

    $scope.loadBlocks = function () {
        if ($scope.District != null) {

            $http.get("https://fpoodisha.nic.in/landRoute/getBlocksOfDistrict/" + JSON.parse($scope.District).districtCode)
                .then(function (response) {
                    $scope.BlockList = response.data;
                });
        }
    }

    // $scope.searchTrader = function () {
    //     $http.get("https://fpoodisha.nic.in/trader/searchTrader/" + )
    //         .then(function (response) {
    //             // $scope.allFpos = response.data;
    //             $scope.numDifferentiation(response.data)
    //         });
    // }

    

    $scope.numDifferentiation = function (value) {
        for (let i = 0; i < value.length; i++) {
            var val = Math.abs(value[i].totalBusinessDone?.tbd1920)
            if (val >= 10000000) {
                value[i].totalBusinessDone.tbd1920 = (val / 10000000).toFixed(2) + ' Cr';
            } else if (val >= 100000) {
                value[i].totalBusinessDone.tbd1920 = (val / 100000).toFixed(2) + ' Lac';
            }
            if (i + 1 == value.length) {
                $scope.allTrader = value
            }
        }
    }

})
