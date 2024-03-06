var myapp2 = angular.module("myapp", []);

myapp2.controller("ctrl", function ($scope, $http) {
  $scope.performanceAuthority = "governance";
  $scope.selectyear = "2022-2023";
  $scope.selectTypes = "1year";
  $scope.selectSlots = "Oct-March";
  $scope.selectAgency = "ALL";

  $scope.visible = true;
  $scope.invisible = false;
  $scope.showTable = false;
  $scope.notFound = false;
  var customTicks = [0, 9, 18, 27];
  var higherValue = 27;

  $scope.showYear = function () {
    $scope.yearstatus = $scope.selectyear
    $scope.typesstatus = $scope.selectTypes
    $scope.slotstatus = $scope.selectSlots
    $scope.agencystatus = $scope.selectAgency

    $scope.setChartRange();
    $http.get('http://localhost:3000/adminUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' + $scope.selectAgency).then(function (response) {
      // $scope.getdashboarddataByYear = response.data;
      $scope.getdashboarddataByYear = response.data;
      $scope.getGuageDashBoardData(response.data);
      //console.log(response.data, "csdfvsdvd");
      if (response.data.length > 0) {
        $scope.showTypes();
        $scope.showTable = true;
        $scope.notFound = false;
      } else {
        $scope.showTable = false;
        $scope.notFound = true;
      }
    })
  }
  $scope.showTypes = function () {
    $scope.typesstatus = $scope.selectTypes;
    $scope.setChartRange();

    $http.get('http://localhost:3000/adminUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' + $scope.selectAgency).then(function (response) {
      // $scope.getdashboarddataByTypes = response.data;
      $scope.getdashboarddataByYear = response.data;
      //console.log(response.data,"response.data");
      $scope.getGuageDashBoardData(response.data);
      if (response.data.length > 0) {
        $scope.showSlots();
        $scope.showTable = true;
        $scope.notFound = false;
      } else {
        $scope.showTable = false;
        $scope.notFound = true;
      }

    })
  }
  $scope.showSlots = function () {
    $scope.slotstatus = $scope.selectSlots;
    $scope.setChartRange();
    $http.get('http://localhost:3000/adminUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' + $scope.selectAgency).then(function (response) {
      // $scope.getdashboarddataBySlots = response.data;
      $scope.getdashboarddataByYear = response.data;
      $scope.getGuageDashBoardData(response.data);
      if (response.data.length > 0) {

        $scope.showTable = true;
        $scope.notFound = false;

      } else {
        $scope.showTable = false;
        $scope.notFound = true;
      }
    })
  }

  $scope.showAgency = function () {
    $scope.agencystatus = $scope.selectAgency;
    $scope.setChartRange();

    $http.get('http://localhost:3000/adminUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' + $scope.selectAgency).then(function (response) {
      // $scope.getdashboarddataByAgency = response.data;
      $scope.getdashboarddataByYear = response.data;
      $scope.getGuageDashBoardData(response.data);
      if (response.data.length > 0) {
        $scope.showTable = true;
        $scope.notFound = false;

      } else {
        $scope.showTable = false;
        $scope.notFound = true;
      }

      if ($scope.selectAgency == "ALL" && $scope.performanceAuthority == "governance") {
        $scope.visible = true;
        $scope.invisible = false;
        $scope.showYear();

      } else if ($scope.selectAgency == "ALL" && $scope.performanceAuthority == "business") {

        $scope.visible = true;
        $scope.invisible = false;
        $scope.showYear();

      } else if ($scope.selectAgency == "ALL" && $scope.performanceAuthority == "finance") {
        $scope.visible = true;
        $scope.invisible = false;
        $scope.showYear();

      } else if ($scope.selectAgency == "FDRVC" || $scope.selectAgency == "NABARD" || $scope.selectAgency == "NAFED" || $scope.selectAgency == "NCDC" || $scope.selectAgency == "SFAC") {

        $scope.visible = false;
        $scope.invisible = true;
        $scope.showYear();
      }
    })
  }

  $scope.onChangeProgess = function () {
    $scope.setChartRange();
    $scope.getGuageDashBoardData($scope.getdashboarddataByYear);


  }
  $scope.setChartRange = function () {
    if ($scope.selectTypes == "3month") {
      if ($scope.performanceAuthority == "governance") {
        customTicks = [0, 3, 6, 9];
        higherValue = 9;
      } else if ($scope.performanceAuthority == "business") {
        customTicks = [0, 3, 6, 9];
        higherValue = 9;
      }
    }
    if ($scope.selectTypes == "11month") {
      if ($scope.performanceAuthority == "governance") {
        //console.log("called1");

        customTicks = [0, 7, 14, 21];
        higherValue = 21;
      } else if ($scope.performanceAuthority == "business") {
        //console.log("called2");

        customTicks = [0, 4, 8, 12];
        higherValue = 12;
      }

    }
    if ($scope.selectTypes == "1year") {
      if ($scope.performanceAuthority == "governance") {
        customTicks = [0, 9, 18, 27];
        higherValue = 27;
      } else if ($scope.performanceAuthority == "business") {
        customTicks = [0, 5, 10, 15];
        higherValue = 15;
      }
    }
    if ($scope.performanceAuthority == "finance") {
      customTicks = [0, 3, 6, 9];
      higherValue = 9;
      $scope.chartHeader = "Access To Finance";
    }
    if ($scope.performanceAuthority == "governance") {
      $scope.chartHeader = "Governance & Compliance";
    }
    if ($scope.performanceAuthority == "business") {
      $scope.chartHeader = "Business Activity";
    }

  }

  // $scope.getdashboardData = function () {
  //   //console.log($scope.selectyear, $scope.selectTypes, $scope.selectSlots, $scope.selectAgency, 888);
  //   $http.get('http://localhost:3000/adminUpdate/getdashboarddataYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' + $scope.selectAgency).then(function (response) {
  //     // $http.get('http://localhost:3000/adminUpdate/getdashboarddata').then(function (response) {
  //     $scope.getdashboarddata = response.data;
  //     // $scope.getGuageDashBoardData(response.data);
  //   })
  // }


  $scope.getGuageDashBoardData = function (result1) {
    // console.log(result1, 888888888);
    var result = JSON.parse(angular.toJson(result1));


    var totalFdrvc = 0
    var totalNabard = 0
    var totalNafed = 0
    var totalNcdc = 0
    var totalSfac = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i].iaName == "FDRVC") {
        var presentAvgHolderFdrvc = parseInt(result[i].presentstatusofAvgshareholdermobilized)
        var persentCeoFdrvc = parseInt(result[i].percentageOffpoappointedceo)
        var persentAccountantFdrvc = parseInt(result[i].percentageOffpoappointedaccountant)
        var persentAuditorFdrvc = parseInt(result[i].percentageOffpoappointedauditor)
        var persentCommencementofbusinessFdrvc = parseInt(result[i].percentageOffpoobtainedcommencementofbusiness)
        var persentGstlicenseFdrvc = parseInt(result[i].percentageOffpoobtainedgstlicense)
        var persentStatutoryauditFdrvc = parseInt(result[i].percentageOffpocompletedstatutoryaudit)
        var persentAgmFdrvc = parseInt(result[i].percentageOffpocompletedagm)
        var persentRocFdrvc = parseInt(result[i].percentageOffpofilledroc)

        var persentTurnoverFdrvc = parseInt(result[i].avgturnoverOf50)
        var persentMouregistrationFdrvc = parseInt(result[i].signedmouRegistration)
        var persentOnenumFdrvc = parseInt(result[i].registeredOnenum)
        var persentTradingenumFdrvc = parseInt(result[i].tradingthroughEnum)
        var persentBusinessplanFdrvc = parseInt(result[i].havingBusinessplan)

        var persentSharecapitalFdrvc = parseInt(result[i].averagesharecapitalAmount)
        var persentEquitygrantFdrvc = parseInt(result[i].equitygrantavailed)
        var persentBankloanFdrvc = parseInt(result[i].loanfrombank)


        if (presentAvgHolderFdrvc >= 300) {
          presentAvgHolderFdrvc = 3;
        } else if (presentAvgHolderFdrvc >= 100 && presentAvgHolderFdrvc <= 300) {
          presentAvgHolderFdrvc = 2;
        } else if (presentAvgHolderFdrvc <= 100) {
          presentAvgHolderFdrvc = 1;
        }

        if (persentCeoFdrvc >= 80 && persentCeoFdrvc <= 100) {
          persentCeoFdrvc = 3;
        } else if (persentCeoFdrvc >= 50 && persentCeoFdrvc < 80) {
          persentCeoFdrvc = 2;
        } else if (persentCeoFdrvc >= 0 && persentCeoFdrvc < 50) {
          persentCeoFdrvc = 1;
        }

        if (persentAccountantFdrvc >= 80 && persentAccountantFdrvc <= 100) {
          persentAccountantFdrvc = 3;
        } else if (persentAccountantFdrvc >= 50 && persentAccountantFdrvc < 80) {
          persentAccountantFdrvc = 2;
        } else if (persentAccountantFdrvc >= 0 && persentAccountantFdrvc < 50) {
          persentAccountantFdrvc = 1;
        }

        if (persentAuditorFdrvc >= 80 && persentAuditorFdrvc <= 100) {
          persentAuditorFdrvc = 3;
        } else if (persentAuditorFdrvc >= 50 && persentAuditorFdrvc < 80) {
          persentAuditorFdrvc = 2;
        } else if (persentAuditorFdrvc >= 0 && persentAuditorFdrvc < 50) {
          persentAuditorFdrvc = 1;
        }

        if (persentCommencementofbusinessFdrvc >= 80 && persentCommencementofbusinessFdrvc <= 100) {
          persentCommencementofbusinessFdrvc = 3;
        } else if (persentCommencementofbusinessFdrvc >= 50 && persentCommencementofbusinessFdrvc < 80) {
          persentCommencementofbusinessFdrvc = 2;
        } else if (persentCommencementofbusinessFdrvc >= 0 && persentCommencementofbusinessFdrvc < 50) {
          persentCommencementofbusinessFdrvc = 1;
        }

        if (persentGstlicenseFdrvc >= 80 && persentGstlicenseFdrvc <= 100) {
          persentGstlicenseFdrvc = 3;
        } else if (persentGstlicenseFdrvc >= 50 && persentGstlicenseFdrvc < 80) {
          persentGstlicenseFdrvc = 2;
        } else if (persentGstlicenseFdrvc >= 0 && persentGstlicenseFdrvc < 50) {
          persentGstlicenseFdrvc = 1;
        }

        if (persentStatutoryauditFdrvc >= 80 && persentStatutoryauditFdrvc <= 100) {
          persentStatutoryauditFdrvc = 3;
        } else if (persentStatutoryauditFdrvc >= 50 && persentStatutoryauditFdrvc < 80) {
          persentStatutoryauditFdrvc = 2;
        } else if (persentStatutoryauditFdrvc >= 0 && persentStatutoryauditFdrvc < 50) {
          persentStatutoryauditFdrvc = 1;
        }

        if (persentAgmFdrvc >= 80 && persentAgmFdrvc <= 100) {
          persentAgmFdrvc = 3;
        } else if (persentAgmFdrvc >= 50 && persentAgmFdrvc < 80) {
          persentAgmFdrvc = 2;
        } else if (persentAgmFdrvc >= 0 && persentAgmFdrvc < 50) {
          persentAgmFdrvc = 1;
        }

        if (persentRocFdrvc >= 80 && persentRocFdrvc <= 100) {
          persentRocFdrvc = 3;
        } else if (persentRocFdrvc >= 50 && persentRocFdrvc < 80) {
          persentRocFdrvc = 2;
        } else if (persentRocFdrvc >= 0 && persentRocFdrvc < 50) {
          persentRocFdrvc = 1;
        }

        if (persentTurnoverFdrvc >= 80 && persentTurnoverFdrvc <= 100) {
          persentTurnoverFdrvc = 3;
        } else if (persentTurnoverFdrvc >= 50 && persentTurnoverFdrvc < 80) {
          persentTurnoverFdrvc = 2;
        } else if (persentTurnoverFdrvc >= 0 && persentTurnoverFdrvc < 50) {
          persentTurnoverFdrvc = 1;
        }

        if (persentMouregistrationFdrvc >= 80 && persentMouregistrationFdrvc <= 100) {
          persentMouregistrationFdrvc = 3;
        } else if (persentMouregistrationFdrvc >= 50 && persentMouregistrationFdrvc < 80) {
          persentMouregistrationFdrvc = 2;
        } else if (persentMouregistrationFdrvc >= 0 && persentMouregistrationFdrvc < 50) {
          persentMouregistrationFdrvc = 1;
        }

        if (persentOnenumFdrvc >= 80 && persentOnenumFdrvc <= 100) {
          persentOnenumFdrvc = 3;
        } else if (persentOnenumFdrvc >= 50 && persentOnenumFdrvc < 80) {
          persentOnenumFdrvc = 2;
        } else if (persentOnenumFdrvc >= 0 && persentOnenumFdrvc < 50) {
          persentOnenumFdrvc = 1;
        }

        if (persentTradingenumFdrvc >= 80 && persentTradingenumFdrvc <= 100) {
          persentTradingenumFdrvc = 3;
        } else if (persentTradingenumFdrvc >= 50 && persentTradingenumFdrvc < 80) {
          persentTradingenumFdrvc = 2;
        } else if (persentTradingenumFdrvc >= 0 && persentTradingenumFdrvc < 50) {
          persentTradingenumFdrvc = 1;
        }

        if (persentBusinessplanFdrvc >= 80 && persentBusinessplanFdrvc <= 100) {
          persentBusinessplanFdrvc = 3;
        } else if (persentBusinessplanFdrvc >= 50 && persentBusinessplanFdrvc < 80) {
          persentBusinessplanFdrvc = 2;
        } else if (persentBusinessplanFdrvc >= 0 && persentBusinessplanFdrvc < 50) {
          persentBusinessplanFdrvc = 1;
        }

        if (persentSharecapitalFdrvc >= 500000) {
          persentSharecapitalFdrvc = 3;
        } else if (persentSharecapitalFdrvc >= 250000 && persentSharecapitalFdrvc < 500000) {
          persentSharecapitalFdrvc = 2;
        } else if (persentSharecapitalFdrvc < 250000) {
          persentSharecapitalFdrvc = 1;
        }

        if (persentEquitygrantFdrvc >= 80 && persentEquitygrantFdrvc <= 100) {
          persentEquitygrantFdrvc = 3;
        } else if (persentEquitygrantFdrvc >= 50 && persentEquitygrantFdrvc < 80) {
          persentEquitygrantFdrvc = 2;
        } else if (persentEquitygrantFdrvc >= 0 && persentEquitygrantFdrvc < 50) {
          persentEquitygrantFdrvc = 1;
        }

        if (persentBankloanFdrvc >= 80 && persentBankloanFdrvc <= 100) {
          persentBankloanFdrvc = 3;
        } else if (persentBankloanFdrvc >= 50 && persentBankloanFdrvc < 80) {
          persentBankloanFdrvc = 2;
        } else if (persentBankloanFdrvc >= 0 && persentBankloanFdrvc < 50) {
          persentBankloanFdrvc = 1;
        }

        if ($scope.selectTypes == '11month') {
          persentStatutoryauditFdrvc = 0;
          persentRocFdrvc = 0;
          persentTurnoverFdrvc = 0;
        }
        if ($scope.selectTypes == '3month') {
          persentAuditorFdrvc = 0;
          persentCommencementofbusinessFdrvc = 0;
          persentGstlicenseFdrvc = 0;
          persentStatutoryauditFdrvc = 0;
          persentRocFdrvc = 0;
          persentAgmFdrvc = 0;
          persentTurnoverFdrvc = 0;
          persentTradingenumFdrvc = 0;
        }

        //====================================
        if ($scope.performanceAuthority == "governance") {
          totalFdrvc = presentAvgHolderFdrvc + persentCeoFdrvc + persentAccountantFdrvc + persentAuditorFdrvc + persentCommencementofbusinessFdrvc + persentGstlicenseFdrvc + persentStatutoryauditFdrvc + persentRocFdrvc + persentAgmFdrvc
        }
        if ($scope.performanceAuthority == "business") {
          totalFdrvc = persentTurnoverFdrvc + persentMouregistrationFdrvc + persentOnenumFdrvc + persentTradingenumFdrvc + persentBusinessplanFdrvc
        }
        if ($scope.performanceAuthority == "finance") {
          totalFdrvc = persentSharecapitalFdrvc + persentEquitygrantFdrvc + persentBankloanFdrvc
        }
        //===============================

      } else if (result[i].iaName == "NABARD") {
        var presentAvgHolderNabard = parseInt(result[i].presentstatusofAvgshareholdermobilized)
        var persentCeoNabard = parseInt(result[i].percentageOffpoappointedceo)
        var persentAccountantNabard = parseInt(result[i].percentageOffpoappointedaccountant)
        var persentAuditorNabard = parseInt(result[i].percentageOffpoappointedauditor)
        var persentCommencementofbusinessNabard = parseInt(result[i].percentageOffpoobtainedcommencementofbusiness)
        var persentGstlicenseNabard = parseInt(result[i].percentageOffpoobtainedgstlicense)
        var persentStatutoryauditNabard = parseInt(result[i].percentageOffpocompletedstatutoryaudit)
        var persentAgmNabard = parseInt(result[i].percentageOffpocompletedagm)
        var persentRocNabard = parseInt(result[i].percentageOffpofilledroc)

        var persentTurnoverNabard = parseInt(result[i].avgturnoverOf50)
        var persentMouregistrationNabard = parseInt(result[i].signedmouRegistration)
        var persentOnenumNabard = parseInt(result[i].registeredOnenum)
        var persentTradingenumNabard = parseInt(result[i].tradingthroughEnum)
        var persentBusinessplanNabard = parseInt(result[i].havingBusinessplan)

        var persentSharecapitalNabard = parseInt(result[i].averagesharecapitalAmount)
        var persentEquitygrantNabard = parseInt(result[i].equitygrantavailed)
        var persentBankloanNabard = parseInt(result[i].loanfrombank)

        if (presentAvgHolderNabard >= 300) {
          presentAvgHolderNabard = 3;
        } else if (presentAvgHolderNabard >= 100 && presentAvgHolderNabard <= 300) {
          presentAvgHolderNabard = 2;
        } else if (presentAvgHolderNabard <= 100) {
          presentAvgHolderNabard = 1;
        }

        if (persentCeoNabard >= 80 && persentCeoNabard <= 100) {
          persentCeoNabard = 3;
        } else if (persentCeoNabard >= 50 && persentCeoNabard < 80) {
          persentCeoNabard = 2;
        } else if (persentCeoNabard >= 0 && persentCeoNabard < 50) {
          persentCeoNabard = 1;
        }

        if (persentAccountantNabard >= 80 && persentAccountantNabard <= 100) {
          persentAccountantNabard = 3;
        } else if (persentAccountantNabard >= 50 && persentAccountantNabard < 80) {
          persentAccountantNabard = 2;
        } else if (persentAccountantNabard >= 0 && persentAccountantNabard < 50) {
          persentAccountantNabard = 1;
        }

        if (persentAuditorNabard >= 80 && persentAuditorNabard <= 100) {
          persentAuditorNabard = 3;
        } else if (persentAuditorNabard >= 50 && persentAuditorNabard < 80) {
          persentCeoNabard = 2;
        } else if (persentAuditorNabard >= 0 && persentAuditorNabard < 50) {
          persentAuditorNabard = 1;
        }

        if (persentCommencementofbusinessNabard >= 80 && persentCommencementofbusinessNabard <= 100) {
          persentCommencementofbusinessNabard = 3;
        } else if (persentCommencementofbusinessNabard >= 50 && persentCommencementofbusinessNabard < 80) {
          persentCommencementofbusinessNabard = 2;
        } else if (persentCommencementofbusinessNabard >= 0 && persentCommencementofbusinessNabard < 50) {
          persentCommencementofbusinessNabard = 1;
        }

        if (persentGstlicenseNabard >= 80 && persentGstlicenseNabard <= 100) {
          persentGstlicenseNabard = 3;
        } else if (persentGstlicenseNabard >= 50 && persentGstlicenseNabard < 80) {
          persentGstlicenseNabard = 2;
        } else if (persentGstlicenseNabard >= 0 && persentGstlicenseNabard < 50) {
          persentGstlicenseNabard = 1;
        }

        if (persentStatutoryauditNabard >= 80 && persentStatutoryauditNabard <= 100) {
          persentStatutoryauditNabard = 3;
        } else if (persentStatutoryauditNabard >= 50 && persentStatutoryauditNabard < 80) {
          persentStatutoryauditNabard = 2;
        } else if (persentStatutoryauditNabard >= 0 && persentStatutoryauditNabard < 50) {
          persentStatutoryauditNabard = 1;
        }

        if (persentAgmNabard >= 80 && persentAgmNabard <= 100) {
          persentAgmNabard = 3;
        } else if (persentAgmNabard >= 50 && persentAgmNabard < 80) {
          persentAgmNabard = 2;
        } else if (persentAgmNabard >= 0 && persentAgmNabard < 50) {
          persentAgmNabard = 1;
        }

        if (persentRocNabard >= 80 && persentRocNabard <= 100) {
          persentRocNabard = 3;
        } else if (persentRocNabard >= 50 && persentRocNabard < 80) {
          persentRocNabard = 2;
        } else if (persentRocNabard >= 0 && persentRocNabard < 50) {
          persentRocNabard = 1;
        }

        if (persentTurnoverNabard >= 80 && persentTurnoverNabard <= 100) {
          persentTurnoverNabard = 3;
        } else if (persentTurnoverNabard >= 50 && persentTurnoverNabard < 80) {
          persentTurnoverNabard = 2;
        } else if (persentTurnoverNabard >= 0 && persentTurnoverNabard < 50) {
          persentTurnoverNabard = 1;
        }

        if (persentMouregistrationNabard >= 80 && persentMouregistrationNabard <= 100) {
          persentMouregistrationNabard = 3;
        } else if (persentMouregistrationNabard >= 50 && persentMouregistrationNabard < 80) {
          persentMouregistrationNabard = 2;
        } else if (persentMouregistrationNabard >= 0 && persentMouregistrationNabard < 50) {
          persentMouregistrationNabard = 1;
        }

        if (persentOnenumNabard >= 80 && persentOnenumNabard <= 100) {
          persentOnenumNabard = 3;
        } else if (persentOnenumNabard >= 50 && persentOnenumNabard < 80) {
          persentOnenumNabard = 2;
        } else if (persentOnenumNabard >= 0 && persentOnenumNabard < 50) {
          persentOnenumNabard = 1;
        }

        if (persentTradingenumNabard >= 80 && persentTradingenumNabard <= 100) {
          persentTradingenumNabard = 3;
        } else if (persentTradingenumNabard >= 50 && persentTradingenumNabard < 80) {
          persentTradingenumNabard = 2;
        } else if (persentTradingenumNabard >= 0 && persentTradingenumNabard < 50) {
          persentTradingenumNabard = 1;
        }

        if (persentBusinessplanNabard >= 80 && persentBusinessplanNabard <= 100) {
          persentBusinessplanNabard = 3;
        } else if (persentBusinessplanNabard >= 50 && persentBusinessplanNabard < 80) {
          persentBusinessplanNabard = 2;
        } else if (persentBusinessplanNabard >= 0 && persentBusinessplanNabard < 50) {
          persentBusinessplanNabard = 1;
        }

        if (persentSharecapitalNabard >= 500000) {
          persentSharecapitalNabard = 3;
        } else if (persentSharecapitalNabard >= 250000 && persentSharecapitalNabard < 500000) {
          persentSharecapitalNabard = 2;
        } else if (persentSharecapitalNabard < 250000) {
          persentSharecapitalNabard = 1;
        }

        if (persentEquitygrantNabard >= 80 && persentEquitygrantNabard <= 100) {
          persentEquitygrantNabard = 3;
        } else if (persentEquitygrantNabard >= 50 && persentEquitygrantNabard < 80) {
          persentEquitygrantNabard = 2;
        } else if (persentEquitygrantNabard >= 0 && persentEquitygrantNabard < 50) {
          persentEquitygrantNabard = 1;
        }

        if (persentBankloanNabard >= 80 && persentBankloanNabard <= 100) {
          persentBankloanNabard = 3;
        } else if (persentBankloanNabard >= 50 && persentBankloanNabard < 80) {
          persentBankloanNabard = 2;
        } else if (persentBankloanNabard >= 0 && persentBankloanNabard < 50) {
          persentBankloanNabard = 1;
        }

        if ($scope.selectTypes == '11month') {
          persentStatutoryauditNabard = 0;
          persentRocNabard = 0;
          persentTurnoverNabard = 0;
        }
        if ($scope.selectTypes == '3month') {
          persentAuditorNabard = 0;
          persentCommencementofbusinessNabard = 0;
          persentGstlicenseNabard = 0;
          persentStatutoryauditNabard = 0;
          persentRocNabard = 0;
          persentAgmNabard = 0;
          persentTurnoverNabard = 0;
          persentTradingenumNabard = 0;
        }
        if ($scope.performanceAuthority == "governance") {
          totalNabard = presentAvgHolderNabard + persentCeoNabard + persentAccountantNabard + persentAuditorNabard + persentCommencementofbusinessNabard + persentGstlicenseNabard + persentStatutoryauditNabard + persentRocNabard + persentAgmNabard;
        }
        if ($scope.performanceAuthority == "business") {
          totalNabard = persentTurnoverNabard + persentMouregistrationNabard + persentOnenumNabard + persentTradingenumNabard + persentBusinessplanNabard;
        }
        if ($scope.performanceAuthority == "finance") {
          totalNabard = persentSharecapitalNabard + persentEquitygrantNabard + persentBankloanNabard
        }

      } else if (result[i].iaName == "NAFED") {
        var presentAvgHolderNafed = parseInt(result[i].presentstatusofAvgshareholdermobilized)
        var persentCeoNafed = parseInt(result[i].percentageOffpoappointedceo)
        var persentAccountantNafed = parseInt(result[i].percentageOffpoappointedaccountant)
        var persentAuditorNafed = parseInt(result[i].percentageOffpoappointedauditor)
        var persentCommencementofbusinessNafed = parseInt(result[i].percentageOffpoobtainedcommencementofbusiness)
        var persentGstlicenseNafed = parseInt(result[i].percentageOffpoobtainedgstlicense)
        var persentStatutoryauditNafed = parseInt(result[i].percentageOffpocompletedstatutoryaudit)
        var persentAgmNafed = parseInt(result[i].percentageOffpocompletedagm)
        var persentRocNafed = parseInt(result[i].percentageOffpofilledroc)

        var persentTurnoverNafed = parseInt(result[i].avgturnoverOf50)
        var persentMouregistrationNafed = parseInt(result[i].signedmouRegistration)
        var persentOnenumNafed = parseInt(result[i].registeredOnenum)
        var persentTradingenumNafed = parseInt(result[i].tradingthroughEnum)
        var persentBusinessplanNafed = parseInt(result[i].havingBusinessplan)

        var persentSharecapitalNafed = parseInt(result[i].averagesharecapitalAmount)
        var persentEquitygrantNafed = parseInt(result[i].equitygrantavailed)
        var persentBankloanNafed = parseInt(result[i].loanfrombank)

        if (presentAvgHolderNafed >= 300) {
          presentAvgHolderNafed = 3;
        } else if (presentAvgHolderNafed >= 100 && presentAvgHolderNafed <= 300) {
          presentAvgHolderNafed = 2;
        } else if (presentAvgHolderNafed <= 100) {
          presentAvgHolderNafed = 1;
        }

        if (persentCeoNafed >= 80 && persentCeoNafed <= 100) {
          persentCeoNafed = 3;
        } else if (persentCeoNafed >= 50 && persentCeoNafed < 80) {
          persentCeoNafed = 2;
        } else if (persentCeoNafed >= 0 && persentCeoNafed < 50) {
          persentCeoNafed = 1;
        }

        if (persentAccountantNafed >= 80 && persentAccountantNafed <= 100) {
          persentAccountantNafed = 3;
        } else if (persentAccountantNafed >= 50 && persentAccountantNafed < 80) {
          persentAccountantNafed = 2;
        } else if (persentAccountantNafed >= 0 && persentAccountantNafed < 50) {
          persentAccountantNafed = 1;
        }

        if (persentAuditorNafed >= 80 && persentAuditorNafed <= 100) {
          persentAuditorNafed = 3;
        } else if (persentAuditorNafed >= 50 && persentAuditorNafed < 80) {
          persentCeoNafed = 2;
        } else if (persentAuditorNafed >= 0 && persentAuditorNafed < 50) {
          persentAuditorNafed = 1;
        }

        if (persentCommencementofbusinessNafed >= 80 && persentCommencementofbusinessNafed <= 100) {
          persentCommencementofbusinessNafed = 3;
        } else if (persentCommencementofbusinessNafed >= 50 && persentCommencementofbusinessNafed < 80) {
          persentCommencementofbusinessNafed = 2;
        } else if (persentCommencementofbusinessNafed >= 0 && persentCommencementofbusinessNafed < 50) {
          persentCommencementofbusinessNafed = 1;
        }

        if (persentGstlicenseNafed >= 80 && persentGstlicenseNafed <= 100) {
          persentGstlicenseNafed = 3;
        } else if (persentGstlicenseNafed >= 50 && persentGstlicenseNafed < 80) {
          persentGstlicenseNafed = 2;
        } else if (persentGstlicenseNafed >= 0 && persentGstlicenseNafed < 50) {
          persentGstlicenseNafed = 1;
        }

        if (persentStatutoryauditNafed >= 80 && persentStatutoryauditNafed <= 100) {
          persentStatutoryauditNafed = 3;
        } else if (persentStatutoryauditNafed >= 50 && persentStatutoryauditNafed < 80) {
          persentStatutoryauditNafed = 2;
        } else if (persentStatutoryauditNafed >= 0 && persentStatutoryauditNafed < 50) {
          persentStatutoryauditNafed = 1;
        }

        if (persentAgmNafed >= 80 && persentAgmNafed <= 100) {
          persentAgmNafed = 3;
        } else if (persentAgmNafed >= 50 && persentAgmNafed < 80) {
          persentAgmNafed = 2;
        } else if (persentAgmNafed >= 0 && persentAgmNafed < 50) {
          persentAgmNafed = 1;
        }

        if (persentRocNafed >= 80 && persentRocNafed <= 100) {
          persentRocNafed = 3;
        } else if (persentRocNafed >= 50 && persentRocNafed < 80) {
          persentRocNafed = 2;
        } else if (persentRocNafed >= 0 && persentRocNafed < 50) {
          persentRocNafed = 1;
        }

        if (persentTurnoverNafed >= 80 && persentTurnoverNafed <= 100) {
          persentTurnoverNafed = 3;
        } else if (persentTurnoverNafed >= 50 && persentTurnoverNafed < 80) {
          persentTurnoverNafed = 2;
        } else if (persentTurnoverNafed >= 0 && persentTurnoverNafed < 50) {
          persentTurnoverNafed = 1;
        }

        if (persentMouregistrationNafed >= 80 && persentMouregistrationNafed <= 100) {
          persentMouregistrationNafed = 3;
        } else if (persentMouregistrationNafed >= 50 && persentMouregistrationNafed < 80) {
          persentMouregistrationNafed = 2;
        } else if (persentMouregistrationNafed >= 0 && persentMouregistrationNafed < 50) {
          persentMouregistrationNafed = 1;
        }

        if (persentOnenumNafed >= 80 && persentOnenumNafed <= 100) {
          persentOnenumNafed = 3;
        } else if (persentOnenumNafed >= 50 && persentOnenumNafed < 80) {
          persentOnenumNafed = 2;
        } else if (persentOnenumNafed >= 0 && persentOnenumNafed < 50) {
          persentOnenumNafed = 1;
        }

        if (persentTradingenumNafed >= 80 && persentTradingenumNafed <= 100) {
          persentTradingenumNafed = 3;
        } else if (persentTradingenumNafed >= 50 && persentTradingenumNafed < 80) {
          persentTradingenumNafed = 2;
        } else if (persentTradingenumNafed >= 0 && persentTradingenumNafed < 50) {
          persentTradingenumNafed = 1;
        }

        if (persentBusinessplanNafed >= 80 && persentBusinessplanNafed <= 100) {
          persentBusinessplanNafed = 3;
        } else if (persentBusinessplanNafed >= 50 && persentBusinessplanNafed < 80) {
          persentBusinessplanNafed = 2;
        } else if (persentBusinessplanNafed >= 0 && persentBusinessplanNafed < 50) {
          persentBusinessplanNafed = 1;
        }

        if (persentSharecapitalNafed >= 500000) {
          persentSharecapitalNafed = 3;
        } else if (persentSharecapitalNafed >= 250000 && persentSharecapitalNafed < 500000) {
          persentSharecapitalNafed = 2;
        } else if (persentSharecapitalNafed < 250000) {
          persentSharecapitalNafed = 1;
        }

        if (persentEquitygrantNafed >= 80 && persentEquitygrantNafed <= 100) {
          persentEquitygrantNafed = 3;
        } else if (persentEquitygrantNafed >= 50 && persentEquitygrantNafed < 80) {
          persentEquitygrantNafed = 2;
        } else if (persentEquitygrantNafed >= 0 && persentEquitygrantNafed < 50) {
          persentEquitygrantNafed = 1;
        }

        if (persentBankloanNafed >= 80 && persentBankloanNafed <= 100) {
          persentBankloanNafed = 3;
        } else if (persentBankloanNafed >= 50 && persentBankloanNafed < 80) {
          persentBankloanNafed = 2;
        } else if (persentBankloanNafed >= 0 && persentBankloanNafed < 50) {
          persentBankloanNafed = 1;
        }

        if ($scope.selectTypes == '11month') {
          persentStatutoryauditNafed = 0;
          persentRocNafed = 0;
          persentTurnoverNafed = 0;
        }
        if ($scope.selectTypes == '3month') {
          persentAuditorNafed = 0;
          persentCommencementofbusinessNafed = 0;
          persentGstlicenseNafed = 0;
          persentStatutoryauditNafed = 0;
          persentRocNafed = 0;
          persentAgmNafed = 0;
          persentTurnoverNafed = 0;
          persentTradingenumNafed = 0;
        }

        if ($scope.performanceAuthority == "governance") {
          totalNafed = presentAvgHolderNafed + persentCeoNafed + persentAccountantNafed + persentAuditorNafed + persentCommencementofbusinessNafed + persentGstlicenseNafed + persentStatutoryauditNafed + persentRocNafed + persentAgmNafed;
        }
        if ($scope.performanceAuthority == "business") {
          totalNafed = persentTurnoverNafed + persentMouregistrationNafed + persentOnenumNafed + persentTradingenumNafed + persentBusinessplanNafed;
        }
        if ($scope.performanceAuthority == "finance") {
          totalNafed = persentSharecapitalNafed + persentEquitygrantNafed + persentBankloanNafed;
        }

      } else if (result[i].iaName == "NCDC") {
        var presentAvgHolderNcdc = parseInt(result[i].presentstatusofAvgshareholdermobilized)
        var persentCeoNcdc = parseInt(result[i].percentageOffpoappointedceo)
        var persentAccountantNcdc = parseInt(result[i].percentageOffpoappointedaccountant)
        var persentAuditorNcdc = parseInt(result[i].percentageOffpoappointedauditor)
        var persentCommencementofbusinessNcdc = parseInt(result[i].percentageOffpoobtainedcommencementofbusiness)
        var persentGstlicenseNcdc = parseInt(result[i].percentageOffpoobtainedgstlicense)
        var persentStatutoryauditNcdc = parseInt(result[i].percentageOffpocompletedstatutoryaudit)
        var persentAgmNcdc = parseInt(result[i].percentageOffpocompletedagm)
        var persentRocNcdc = parseInt(result[i].percentageOffpofilledroc)

        var persentTurnoverNcdc = parseInt(result[i].avgturnoverOf50)
        var persentMouregistrationNcdc = parseInt(result[i].signedmouRegistration)
        var persentOnenumNcdc = parseInt(result[i].registeredOnenum)
        var persentTradingenumNcdc = parseInt(result[i].tradingthroughEnum)
        var persentBusinessplanNcdc = parseInt(result[i].havingBusinessplan)

        var persentSharecapitalNcdc = parseInt(result[i].averagesharecapitalAmount)
        var persentEquitygrantNcdc = parseInt(result[i].equitygrantavailed)
        var persentBankloanNcdc = parseInt(result[i].loanfrombank)

        if (presentAvgHolderNcdc >= 300) {
          presentAvgHolderNcdc = 3;
        } else if (presentAvgHolderNcdc >= 100 && presentAvgHolderNcdc <= 300) {
          presentAvgHolderNcdc = 2;
        } else if (presentAvgHolderNcdc <= 100) {
          presentAvgHolderNcdc = 1;
        }

        if (persentCeoNcdc >= 80 && persentCeoNcdc <= 100) {
          persentCeoNcdc = 3;
        } else if (persentCeoNcdc >= 50 && persentCeoNcdc < 80) {
          persentCeoNcdc = 2;
        } else if (persentCeoNcdc >= 0 && persentCeoNcdc < 50) {
          persentCeoNcdc = 1;
        }

        if (persentAccountantNcdc >= 80 && persentAccountantNcdc <= 100) {
          persentAccountantNcdc = 3;
        } else if (persentAccountantNcdc >= 50 && persentAccountantNcdc < 80) {
          persentAccountantNcdc = 2;
        } else if (persentAccountantNcdc >= 0 && persentAccountantNcdc < 50) {
          persentAccountantNcdc = 1;
        }

        if (persentAuditorNcdc >= 80 && persentAuditorNcdc <= 100) {
          persentAuditorNcdc = 3;
        } else if (persentAuditorNcdc >= 50 && persentAuditorNcdc < 80) {
          persentCeoNcdc = 2;
        } else if (persentAuditorNcdc >= 0 && persentAuditorNcdc < 50) {
          persentAuditorNcdc = 1;
        }

        if (persentCommencementofbusinessNcdc >= 80 && persentCommencementofbusinessNcdc <= 100) {
          persentCommencementofbusinessNcdc = 3;
        } else if (persentCommencementofbusinessNcdc >= 50 && persentCommencementofbusinessNcdc < 80) {
          persentCommencementofbusinessNcdc = 2;
        } else if (persentCommencementofbusinessNcdc >= 0 && persentCommencementofbusinessNcdc < 50) {
          persentCommencementofbusinessNcdc = 1;
        }

        if (persentGstlicenseNcdc >= 80 && persentGstlicenseNcdc <= 100) {
          persentGstlicenseNcdc = 3;
        } else if (persentGstlicenseNcdc >= 50 && persentGstlicenseNcdc < 80) {
          persentGstlicenseNcdc = 2;
        } else if (persentGstlicenseNcdc >= 0 && persentGstlicenseNcdc < 50) {
          persentGstlicenseNcdc = 1;
        }

        if (persentStatutoryauditNcdc >= 80 && persentStatutoryauditNcdc <= 100) {
          persentStatutoryauditNcdc = 3;
        } else if (persentStatutoryauditNcdc >= 50 && persentStatutoryauditNcdc < 80) {
          persentStatutoryauditNcdc = 2;
        } else if (persentStatutoryauditNcdc >= 0 && persentStatutoryauditNcdc < 50) {
          persentStatutoryauditNcdc = 1;
        }

        if (persentAgmNcdc >= 80 && persentAgmNcdc <= 100) {
          persentAgmNcdc = 3;
        } else if (persentAgmNcdc >= 50 && persentAgmNcdc < 80) {
          persentAgmNcdc = 2;
        } else if (persentAgmNcdc >= 0 && persentAgmNcdc < 50) {
          persentAgmNcdc = 1;
        }

        if (persentRocNcdc >= 80 && persentRocNcdc <= 100) {
          persentRocNcdc = 3;
        } else if (persentRocNcdc >= 50 && persentRocNcdc < 80) {
          persentRocNcdc = 2;
        } else if (persentRocNcdc >= 0 && persentRocNcdc < 50) {
          persentRocNcdc = 1;
        }

        if (persentTurnoverNcdc >= 80 && persentTurnoverNcdc <= 100) {
          persentTurnoverNcdc = 3;
        } else if (persentTurnoverNcdc >= 50 && persentTurnoverNcdc < 80) {
          persentTurnoverNcdc = 2;
        } else if (persentTurnoverNcdc >= 0 && persentTurnoverNcdc < 50) {
          persentTurnoverNcdc = 1;
        }

        if (persentMouregistrationNcdc >= 80 && persentMouregistrationNcdc <= 100) {
          persentMouregistrationNcdc = 3;
        } else if (persentMouregistrationNcdc >= 50 && persentMouregistrationNcdc < 80) {
          persentMouregistrationNcdc = 2;
        } else if (persentMouregistrationNcdc >= 0 && persentMouregistrationNcdc < 50) {
          persentMouregistrationNcdc = 1;
        }

        if (persentOnenumNcdc >= 80 && persentOnenumNcdc <= 100) {
          persentOnenumNcdc = 3;
        } else if (persentOnenumNcdc >= 50 && persentOnenumNcdc < 80) {
          persentOnenumNcdc = 2;
        } else if (persentOnenumNcdc >= 0 && persentOnenumNcdc < 50) {
          persentOnenumNcdc = 1;
        }

        if (persentTradingenumNcdc >= 80 && persentTradingenumNcdc <= 100) {
          persentTradingenumNcdc = 3;
        } else if (persentTradingenumNcdc >= 50 && persentTradingenumNcdc < 80) {
          persentTradingenumNcdc = 2;
        } else if (persentTradingenumNcdc >= 0 && persentTradingenumNcdc < 50) {
          persentTradingenumNcdc = 1;
        }

        if (persentBusinessplanNcdc >= 80 && persentBusinessplanNcdc <= 100) {
          persentBusinessplanNcdc = 3;
        } else if (persentBusinessplanNcdc >= 50 && persentBusinessplanNcdc < 80) {
          persentBusinessplanNcdc = 2;
        } else if (persentBusinessplanNcdc >= 0 && persentBusinessplanNcdc < 50) {
          persentBusinessplanNcdc = 1;
        }

        if (persentSharecapitalNcdc >= 500000) {
          persentSharecapitalNcdc = 3;
        } else if (persentSharecapitalNcdc >= 250000 && persentSharecapitalNcdc < 500000) {
          persentSharecapitalNcdc = 2;
        } else if (persentSharecapitalNcdc < 250000) {
          persentSharecapitalNcdc = 1;
        }

        if (persentEquitygrantNcdc >= 80 && persentEquitygrantNcdc <= 100) {
          persentEquitygrantNcdc = 3;
        } else if (persentEquitygrantNcdc >= 50 && persentEquitygrantNcdc < 80) {
          persentEquitygrantNcdc = 2;
        } else if (persentEquitygrantNcdc >= 0 && persentEquitygrantNcdc < 50) {
          persentEquitygrantNcdc = 1;
        }

        if (persentBankloanNcdc >= 80 && persentBankloanNcdc <= 100) {
          persentBankloanNcdc = 3;
        } else if (persentBankloanNcdc >= 50 && persentBankloanNcdc < 80) {
          persentBankloanNcdc = 2;
        } else if (persentBankloanNcdc >= 0 && persentBankloanNcdc < 50) {
          persentBankloanNcdc = 1;
        }

        if ($scope.selectTypes == '11month') {
          persentStatutoryauditNcdc = 0;
          persentRocNcdc = 0;
          persentTurnoverNcdc = 0;
        }
        if ($scope.selectTypes == '3month') {
          persentAuditorNcdc = 0;
          persentCommencementofbusinessNcdc = 0;
          persentGstlicenseNcdc = 0;
          persentStatutoryauditNcdc = 0;
          persentRocNcdc = 0;
          persentAgmNcdc = 0;
          persentTurnoverNcdc = 0;
          persentTradingenumNcdc = 0;
        }
        if ($scope.performanceAuthority == "governance") {
          totalNcdc = presentAvgHolderNcdc + persentCeoNcdc + persentAccountantNcdc + persentAuditorNcdc + persentCommencementofbusinessNcdc + persentGstlicenseNcdc + persentStatutoryauditNcdc + persentRocNcdc + persentAgmNcdc;
        }
        if ($scope.performanceAuthority == "business") {
          totalNcdc = persentTurnoverNcdc + persentMouregistrationNcdc + persentOnenumNcdc + persentTradingenumNcdc + persentBusinessplanNcdc;
        }
        if ($scope.performanceAuthority == "finance") {
          totalNcdc = persentSharecapitalNcdc + persentEquitygrantNcdc + persentBankloanNcdc;
        }

      } else if (result[i].iaName == "SFAC") {
        var presentAvgHolderSfac = parseInt(result[i].presentstatusofAvgshareholdermobilized)
        var persentCeoSfac = parseInt(result[i].percentageOffpoappointedceo)
        var persentAccountantSfac = parseInt(result[i].percentageOffpoappointedaccountant)
        var persentAuditorSfac = parseInt(result[i].percentageOffpoappointedauditor)
        var persentCommencementofbusinessSfac = parseInt(result[i].percentageOffpoobtainedcommencementofbusiness)
        var persentGstlicenseSfac = parseInt(result[i].percentageOffpoobtainedgstlicense)
        var persentStatutoryauditSfac = parseInt(result[i].percentageOffpocompletedstatutoryaudit)
        var persentAgmSfac = parseInt(result[i].percentageOffpocompletedagm)
        var persentRocSfac = parseInt(result[i].percentageOffpofilledroc)

        var persentTurnoverSfac = parseInt(result[i].avgturnoverOf50)
        var persentMouregistrationSfac = parseInt(result[i].signedmouRegistration)
        var persentOnenumSfac = parseInt(result[i].registeredOnenum)
        var persentTradingenumSfac = parseInt(result[i].tradingthroughEnum)
        var persentBusinessplanSfac = parseInt(result[i].havingBusinessplan)

        var persentSharecapitalSfac = parseInt(result[i].averagesharecapitalAmount)
        var persentEquitygrantSfac = parseInt(result[i].equitygrantavailed)
        var persentBankloanSfac = parseInt(result[i].loanfrombank)

        if (presentAvgHolderSfac >= 300) {
          presentAvgHolderSfac = 3;
        } else if (presentAvgHolderSfac >= 100 && presentAvgHolderSfac <= 300) {
          presentAvgHolderSfac = 2;
        } else if (presentAvgHolderSfac <= 100) {
          presentAvgHolderSfac = 1;
        }

        if (persentCeoSfac >= 80 && persentCeoSfac <= 100) {
          persentCeoSfac = 3;
        } else if (persentCeoSfac >= 50 && persentCeoSfac < 80) {
          persentCeoSfac = 2;
        } else if (persentCeoSfac >= 0 && persentCeoSfac < 50) {
          persentCeoSfac = 1;
        }

        if (persentAccountantSfac >= 80 && persentAccountantSfac <= 100) {
          persentAccountantSfac = 3;
        } else if (persentAccountantSfac >= 50 && persentAccountantSfac < 80) {
          persentAccountantSfac = 2;
        } else if (persentAccountantSfac >= 0 && persentAccountantSfac < 50) {
          persentAccountantSfac = 1;
        }

        if (persentAuditorSfac >= 80 && persentAuditorSfac <= 100) {
          persentAuditorSfac = 3;
        } else if (persentAuditorSfac >= 50 && persentAuditorSfac < 80) {
          persentCeoSfac = 2;
        } else if (persentAuditorSfac >= 0 && persentAuditorSfac < 50) {
          persentAuditorSfac = 1;
        }

        if (persentCommencementofbusinessSfac >= 80 && persentCommencementofbusinessSfac <= 100) {
          persentCommencementofbusinessSfac = 3;
        } else if (persentCommencementofbusinessSfac >= 50 && persentCommencementofbusinessSfac < 80) {
          persentCommencementofbusinessSfac = 2;
        } else if (persentCommencementofbusinessSfac >= 0 && persentCommencementofbusinessSfac < 50) {
          persentCommencementofbusinessSfac = 1;
        }

        if (persentGstlicenseSfac >= 80 && persentGstlicenseSfac <= 100) {
          persentGstlicenseSfac = 3;
        } else if (persentGstlicenseSfac >= 50 && persentGstlicenseSfac < 80) {
          persentGstlicenseSfac = 2;
        } else if (persentGstlicenseSfac >= 0 && persentGstlicenseSfac < 50) {
          persentGstlicenseSfac = 1;
        }

        if (persentStatutoryauditSfac >= 80 && persentStatutoryauditSfac <= 100) {
          persentStatutoryauditSfac = 3;
        } else if (persentStatutoryauditSfac >= 50 && persentStatutoryauditSfac < 80) {
          persentStatutoryauditSfac = 2;
        } else if (persentStatutoryauditSfac >= 0 && persentStatutoryauditSfac < 50) {
          persentStatutoryauditSfac = 1;
        }

        if (persentAgmSfac >= 80 && persentAgmSfac <= 100) {
          persentAgmSfac = 3;
        } else if (persentAgmSfac >= 50 && persentAgmSfac < 80) {
          persentAgmSfac = 2;
        } else if (persentAgmSfac >= 0 && persentAgmSfac < 50) {
          persentAgmSfac = 1;
        }

        if (persentRocSfac >= 80 && persentRocSfac <= 100) {
          persentRocSfac = 3;
        } else if (persentRocSfac >= 50 && persentRocSfac < 80) {
          persentRocSfac = 2;
        } else if (persentRocSfac >= 0 && persentRocSfac < 50) {
          persentRocSfac = 1;
        }

        if (persentTurnoverSfac >= 80 && persentTurnoverSfac <= 100) {
          persentTurnoverSfac = 3;
        } else if (persentTurnoverSfac >= 50 && persentTurnoverSfac < 80) {
          persentTurnoverSfac = 2;
        } else if (persentTurnoverSfac >= 0 && persentTurnoverSfac < 50) {
          persentTurnoverSfac = 1;
        }

        if (persentMouregistrationSfac >= 80 && persentMouregistrationSfac <= 100) {
          persentMouregistrationSfac = 3;
        } else if (persentMouregistrationSfac >= 50 && persentMouregistrationSfac < 80) {
          persentMouregistrationSfac = 2;
        } else if (persentMouregistrationSfac >= 0 && persentMouregistrationSfac < 50) {
          persentMouregistrationSfac = 1;
        }

        if (persentOnenumSfac >= 80 && persentOnenumSfac <= 100) {
          persentOnenumSfac = 3;
        } else if (persentOnenumSfac >= 50 && persentOnenumSfac < 80) {
          persentOnenumSfac = 2;
        } else if (persentOnenumSfac >= 0 && persentOnenumSfac < 50) {
          persentOnenumSfac = 1;
        }

        if (persentTradingenumSfac >= 80 && persentTradingenumSfac <= 100) {
          persentTradingenumSfac = 3;
        } else if (persentTradingenumSfac >= 50 && persentTradingenumSfac < 80) {
          persentTradingenumSfac = 2;
        } else if (persentTradingenumSfac >= 0 && persentTradingenumSfac < 50) {
          persentTradingenumSfac = 1;
        }

        if (persentBusinessplanSfac >= 80 && persentBusinessplanSfac <= 100) {
          persentBusinessplanSfac = 3;
        } else if (persentBusinessplanSfac >= 50 && persentBusinessplanSfac < 80) {
          persentBusinessplanSfac = 2;
        } else if (persentBusinessplanSfac >= 0 && persentBusinessplanSfac < 50) {
          persentBusinessplanSfac = 1;
        }

        if (persentSharecapitalSfac >= 500000) {
          persentSharecapitalSfac = 3;
        } else if (persentSharecapitalSfac >= 250000 && persentSharecapitalSfac < 500000) {
          persentSharecapitalSfac = 2;
        } else if (persentSharecapitalSfac < 250000) {
          persentSharecapitalSfac = 1;
        }

        if (persentEquitygrantSfac >= 80 && persentEquitygrantSfac <= 100) {
          persentEquitygrantSfac = 3;
        } else if (persentEquitygrantSfac >= 50 && persentEquitygrantSfac < 80) {
          persentEquitygrantSfac = 2;
        } else if (persentEquitygrantSfac >= 0 && persentEquitygrantSfac < 50) {
          persentEquitygrantSfac = 1;
        }

        if (persentBankloanSfac >= 80 && persentBankloanSfac <= 100) {
          persentBankloanSfac = 3;
        } else if (persentBankloanSfac >= 50 && persentBankloanSfac < 80) {
          persentBankloanSfac = 2;
        } else if (persentBankloanSfac >= 0 && persentBankloanSfac < 50) {
          persentBankloanSfac = 1;
        }

        if ($scope.selectTypes == '11month') {
          persentStatutoryauditSfac = 0;
          persentRocSfac = 0;
          persentTurnoverSfac = 0;
        }
        if ($scope.selectTypes == '3month') {
          persentAuditorSfac = 0;
          persentCommencementofbusinessSfac = 0;
          persentGstlicenseSfac = 0;
          persentStatutoryauditSfac = 0;
          persentRocSfac = 0;
          persentAgmSfac = 0;
          persentTurnoverSfac = 0;
          persentTradingenumSfac = 0;
        }
        if ($scope.performanceAuthority == "governance") {
          totalSfac = presentAvgHolderSfac + persentCeoSfac + persentAccountantSfac + persentAuditorSfac + persentCommencementofbusinessSfac + persentGstlicenseSfac + persentStatutoryauditSfac + persentRocSfac + persentAgmSfac;
        }
        if ($scope.performanceAuthority == "business") {
          totalSfac = persentTurnoverSfac + persentMouregistrationSfac + persentOnenumSfac + persentTradingenumSfac + persentBusinessplanSfac;
        }
        if ($scope.performanceAuthority == "finance") {
          totalSfac = persentSharecapitalSfac + persentEquitygrantSfac + persentBankloanSfac;
        }

      }
    }

    $(function () {
      class GaugeChart {
        constructor(element, params) {
          this._element = element;
          this._initialValue = params.initialValue;
          this._higherValue = params.higherValue;
          this._title = params.title;
          this._subtitle = params.subtitle;
        }

        _buildConfig() {
          let element = this._element;

          return {
            value: this._initialValue,
            valueIndicator: {
              color: '#fff'
            },

            geometry: {
              startAngle: 180,
              endAngle: 360
            },

            scale: {
              startValue: 0,
              endValue: this._higherValue,
              customTicks: customTicks,
              tick: {
                length: 8
              },

              label: {
                font: {
                  color: '#87959f',
                  size: 9,
                  family: '"Open Sans", sans-serif'
                }
              }
            },

            title: {
              verticalAlignment: 'bottom',
              text: this._title,
              font: {
                family: '"Open Sans", sans-serif',
                color: '#fff',
                size: 10
              },

              subtitle: {
                text: this._subtitle,
                font: {
                  family: '"Open Sans", sans-serif',
                  color: '#fff',
                  weight: 700,
                  size: 28
                }
              }
            },

            onInitialized: function () {
              let currentGauge = $(element);
              let circle = currentGauge.find('.dxg-spindle-hole').clone();
              let border = currentGauge.find('.dxg-spindle-border').clone();

              currentGauge.find('.dxg-title text').first().attr('y', 48);
              currentGauge.find('.dxg-title text').last().attr('y', 28);
              currentGauge.find('.dxg-value-indicator').append(border, circle);
            }
          };
        }

        init() {
          $(this._element).dxCircularGauge(this._buildConfig());
        }
      }

      $(document).ready(function () {

        $('.gauge').each(function (index, item) {
          let params = {
            initialValue: totalFdrvc,
            higherValue: higherValue,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };

          let gauge = new GaugeChart(item, params);
          gauge.init();
        });

        $('#random').click(function () {

          $('.gauge').each(function (index, item) {
            let gauge = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge.value(randomNum);
          });
        });
      });
    });
    $(function () {

      class GaugeChart {
        constructor(element, params) {
          this._element = element;
          this._initialValue = params.initialValue;
          this._higherValue = params.higherValue;
          this._title = params.title;
          this._subtitle = params.subtitle;
        }

        _buildConfig() {
          let element = this._element;

          return {
            value: this._initialValue,
            valueIndicator: {
              color: '#fff'
            },

            geometry: {
              startAngle: 180,
              endAngle: 360
            },

            scale: {
              startValue: 0,
              endValue: this._higherValue,
              customTicks: customTicks,
              tick: {
                length: 8
              },

              label: {
                font: {
                  color: '#87959f',
                  size: 9,
                  family: '"Open Sans", sans-serif'
                }
              }
            },

            title: {
              verticalAlignment: 'bottom',
              text: this._title,
              font: {
                family: '"Open Sans", sans-serif',
                color: '#fff',
                size: 10
              },

              subtitle: {
                text: this._subtitle,
                font: {
                  family: '"Open Sans", sans-serif',
                  color: '#fff',
                  weight: 700,
                  size: 28
                }
              }
            },

            onInitialized: function () {
              let currentGauge = $(element);
              let circle = currentGauge.find('.dxg-spindle-hole').clone();
              let border = currentGauge.find('.dxg-spindle-border').clone();

              currentGauge.find('.dxg-title text').first().attr('y', 48);
              currentGauge.find('.dxg-title text').last().attr('y', 28);
              currentGauge.find('.dxg-value-indicator').append(border, circle);
            }
          };
        }

        init() {
          $(this._element).dxCircularGauge(this._buildConfig());
        }
      }

      $(document).ready(function () {

        $('.gauge1').each(function (index, item) {
          let params = {
            initialValue: totalNabard,
            higherValue: higherValue,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };

          let gauge1 = new GaugeChart(item, params);
          gauge1.init();
        });

        $('#random').click(function () {

          $('.gauge1').each(function (index, item) {
            let gauge1 = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge1._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge1.value(randomNum);
          });
        });
      });
    });

    $(function () {
      class GaugeChart {
        constructor(element, params) {
          this._element = element;
          this._initialValue = params.initialValue;
          this._higherValue = params.higherValue;
          this._title = params.title;
          this._subtitle = params.subtitle;
        }

        _buildConfig() {
          let element = this._element;

          return {
            value: this._initialValue,
            valueIndicator: {
              color: '#fff'
            },

            geometry: {
              startAngle: 180,
              endAngle: 360
            },

            scale: {
              startValue: 0,
              endValue: this._higherValue,
              customTicks: customTicks,
              tick: {
                length: 8
              },

              label: {
                font: {
                  color: '#87959f',
                  size: 9,
                  family: '"Open Sans", sans-serif'
                }
              }
            },

            title: {
              verticalAlignment: 'bottom',
              text: this._title,
              font: {
                family: '"Open Sans", sans-serif',
                color: '#fff',
                size: 10
              },

              subtitle: {
                text: this._subtitle,
                font: {
                  family: '"Open Sans", sans-serif',
                  color: '#fff',
                  weight: 700,
                  size: 28
                }
              }
            },

            onInitialized: function () {
              let currentGauge = $(element);
              let circle = currentGauge.find('.dxg-spindle-hole').clone();
              let border = currentGauge.find('.dxg-spindle-border').clone();

              currentGauge.find('.dxg-title text').first().attr('y', 48);
              currentGauge.find('.dxg-title text').last().attr('y', 28);
              currentGauge.find('.dxg-value-indicator').append(border, circle);
            }
          };
        }

        init() {
          $(this._element).dxCircularGauge(this._buildConfig());
        }
      }


      $(document).ready(function () {

        $('.gauge2').each(function (index, item) {
          let params = {
            initialValue: totalNafed,
            higherValue: higherValue,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };

          let gauge2 = new GaugeChart(item, params);
          gauge2.init();
        });

        $('#random').click(function () {

          $('.gauge2').each(function (index, item) {
            let gauge2 = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge2._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge2.value(randomNum);
          });
        });
      });
    });

    $(function () {

      class GaugeChart {
        constructor(element, params) {
          this._element = element;
          this._initialValue = params.initialValue;
          this._higherValue = params.higherValue;
          this._title = params.title;
          this._subtitle = params.subtitle;
        }

        _buildConfig() {
          let element = this._element;

          return {
            value: this._initialValue,
            valueIndicator: {
              color: '#fff'
            },

            geometry: {
              startAngle: 180,
              endAngle: 360
            },

            scale: {
              startValue: 0,
              endValue: this._higherValue,
              customTicks: customTicks,
              tick: {
                length: 8
              },

              label: {
                font: {
                  color: '#87959f',
                  size: 9,
                  family: '"Open Sans", sans-serif'
                }
              }
            },

            title: {
              verticalAlignment: 'bottom',
              text: this._title,
              font: {
                family: '"Open Sans", sans-serif',
                color: '#fff',
                size: 10
              },

              subtitle: {
                text: this._subtitle,
                font: {
                  family: '"Open Sans", sans-serif',
                  color: '#fff',
                  weight: 700,
                  size: 28
                }
              }
            },

            onInitialized: function () {
              let currentGauge = $(element);
              let circle = currentGauge.find('.dxg-spindle-hole').clone();
              let border = currentGauge.find('.dxg-spindle-border').clone();

              currentGauge.find('.dxg-title text').first().attr('y', 48);
              currentGauge.find('.dxg-title text').last().attr('y', 28);
              currentGauge.find('.dxg-value-indicator').append(border, circle);
            }
          };
        }

        init() {
          $(this._element).dxCircularGauge(this._buildConfig());
        }
      }

      $(document).ready(function () {

        $('.gauge3').each(function (index, item) {
          let params = {
            initialValue: totalNcdc,
            higherValue: higherValue,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };

          let gauge3 = new GaugeChart(item, params);
          gauge3.init();
        });

        $('#random').click(function () {

          $('.gauge3').each(function (index, item) {
            let gauge3 = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge3._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge3.value(randomNum);
          });
        });
      });
    });

    $(function () {
      class GaugeChart {
        constructor(element, params) {
          this._element = element;
          this._initialValue = params.initialValue;
          this._higherValue = params.higherValue;
          this._title = params.title;
          this._subtitle = params.subtitle;
        }

        _buildConfig() {
          let element = this._element;

          return {
            value: this._initialValue,
            valueIndicator: {
              color: '#fff'
            },

            geometry: {
              startAngle: 180,
              endAngle: 360
            },

            scale: {
              startValue: 0,
              endValue: this._higherValue,
              customTicks: customTicks,
              tick: {
                length: 8
              },

              label: {
                font: {
                  color: '#87959f',
                  size: 9,
                  family: '"Open Sans", sans-serif'
                }
              }
            },

            title: {
              verticalAlignment: 'bottom',
              text: this._title,
              font: {
                family: '"Open Sans", sans-serif',
                color: '#fff',
                size: 10
              },

              subtitle: {
                text: this._subtitle,
                font: {
                  family: '"Open Sans", sans-serif',
                  color: '#fff',
                  weight: 700,
                  size: 28
                }
              }
            },

            onInitialized: function () {
              let currentGauge = $(element);
              let circle = currentGauge.find('.dxg-spindle-hole').clone();
              let border = currentGauge.find('.dxg-spindle-border').clone();

              currentGauge.find('.dxg-title text').first().attr('y', 48);
              currentGauge.find('.dxg-title text').last().attr('y', 28);
              currentGauge.find('.dxg-value-indicator').append(border, circle);
            }
          };
        }

        init() {
          $(this._element).dxCircularGauge(this._buildConfig());
        }
      }

      $(document).ready(function () {

        $('.gauge4').each(function (index, item) {
          let params = {
            initialValue: totalSfac,
            higherValue: higherValue,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };

          let gauge4 = new GaugeChart(item, params);
          gauge4.init();
        });

        $('#random').click(function () {

          $('.gauge4').each(function (index, item) {
            let gauge4 = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge4._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge4.value(randomNum);
          });
        });
      });
    });

  }
  // $scope.getdashboardData();
  $scope.showYear();
})