var app1 = angular.module("myapp1", []);

app1.controller("ctrl1", function ($scope,   $http, $filter, $timeout) {
    $scope.allTrader
    $scope.sortTrader
    $scope.searchtraderName
  //  $scope.paginatedList;
   // $scope.pageSize = 20
    //$scope.currentPage = 1
      
    $scope.searchTrader = function () {      
        $scope.allTrader=[]  
        $http.get("http://localhost:3000/trader/searchTrader?state="+$scope.State+"&districtName="+$scope.District+"&Crop_Name="+$scope.Crop_Name)
            .then(function (response) {
                 $scope.allTrader = response.data;
                
               // $scope.numDifferentiation(response.data)
               
            });
    }

    $scope.loadTrader = function () {
        $http.get("http://localhost:3000/trader/loadtrader")
            .then(function (response) {    
                $scope.allTrader = response.data 
               
            
            });
    }
    
    $scope.loadTrader();
   $scope.nextPage = function (page) {
       $scope.currentPage = page
       $scope.paginatedList = $scope.allTrader.slice(($scope.currentPage - 1) * $scope.pageSize, $scope.currentPage * $scope.pageSize)
    }
    $scope.redirectToTraderProfile=function(x){
        window.location.href = 'http://localhost:3000/redirectToTraderProfile?traderRefNo='+x.refNo; }

    $scope.loadTraderWithSort = function () {
        ////////console.log("hii23");
        if($scope.sortTrader =='name'){
        $http.get("http://localhost:3000/trader/loadtraderwithsort")
            .then(function (response) {
                ////////console.log(response);
                $scope.numDifferentiation(response.data)
                ////////console.log(response.data);
            });
        }
    }
    
    $scope.downloadTraderList = function () {
        console.log($scope.allTrader,"allTrader");
        excelService.exportToExcel($scope.allTrader, 'Trader-List ');
    }
    
    $scope.searchTraderFromSearchBar=function(){
        ////////console.log("hiiiiiiii");
        if($scope.searchtraderName){
            $http.get("http://localhost:3000/trader/searchTraderFromSearchBar/"+$scope.searchtraderName)
            .then(function (response) {
                ////////console.log(response);
                $scope.numDifferentiation(response.data);
            });
        }
    }
    
   


    $scope.loadAvailableDistrcits = function () {
        
        if($scope.State!=null){
            $scope.searchTrader()
            $http.get("http://localhost:3000/trader/getTraderDistricts?state="+$scope.State)
            .then(function (response) {
                $scope.DistrictList = response.data;
            });   }  }
   

    $scope.loadAvailableState = function () {
        $scope.searchTrader()
        $http.get("http://localhost:3000/trader/getTraderState")
            .then(function (response) {
                $scope.StateList = response.data;
                ////////console.log(response.data);
            });
    }
    $scope.loadAvailableState();


   
    $scope.loadBlocks = function () {
        if ($scope.District != null) {

            $http.get("http://localhost:3000/landRoute/getBlocksOfDistrict/" + JSON.parse($scope.District).districtCode)
                .then(function (response) {
                    $scope.BlockList = response.data;
                });
        }
    }
  
    $scope.loadAvailableCrop = function () {
        $scope.searchTrader()
        $http.get("http://localhost:3000/trader/getTraderCrop?state="+$scope.State+"&districtName="+$scope.District)
            .then(function (response) {
                $scope.CropList = response.data;
            });
    }
    $scope.loadAvailableCrop();

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
