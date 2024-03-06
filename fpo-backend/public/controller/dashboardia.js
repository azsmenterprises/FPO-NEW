var myapp2 = angular.module("myapp", []);

myapp2.controller("ctrl", function ($scope, $http) {
  $scope.performanceAuthority = "governance";
  $scope.selectyear = "2022-2023";
  $scope.selectTypes = "1year";
  $scope.selectSlots = "Oct-March";
  

  var customTicks = [0, 9, 18, 27];
  var higherValue = 27;
  var customTicks1 = [0, 5, 10, 15];
  var higherValue1 = 15;
  var customTicks2 = [0, 3, 6, 9];
  var higherValue2 = 9;



  $scope.getRefNo = function () {
      $http.get('http://localhost:3000/iaUpdate/getRefNo').then(function (response) {
      $scope.getRefNoofIa = response.data;
    })
  }
  $scope.getRefNo();
  $scope.showYear = function () {
    $scope.yearstatus = $scope.selectyear
    $scope.typesstatus = $scope.selectTypes
    $scope.slotstatus = $scope.selectSlots
    $scope.agencystatus =  $scope.getRefNoofIa
    
    $scope.setChartRange();
    $http.get('http://localhost:3000/iaUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' +  $scope.getRefNoofIa).then(function (response) {
      $scope.getdashboarddataByYear = response.data;
      $scope.getGuageDashBoardData(response.data);
      if (response.data.length > 0) {
        $scope.reload();

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

    $http.get('http://localhost:3000/iaUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' +  $scope.getRefNoofIa).then(function (response) {
      $scope.getdashboarddataByYear = response.data;
      $scope.getGuageDashBoardData(response.data);
      if (response.data.length > 0) {
        $scope.reload();

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
    $http.get('http://localhost:3000/iaUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' +  $scope.getRefNoofIa).then(function (response) {
      $scope.getdashboarddataByYear = response.data;
      if (response.data.length > 0) {

        $scope.showTable = true;
        $scope.notFound = false;

      } else {
        $scope.showTable = false;
        $scope.notFound = true;
      }
      $scope.getGuageDashBoardData($scope.getdashboarddataByYear);
      $scope.reload();


    })
  }

  $scope.reload = function () {
    $scope.setChartRange();
    $http.get('http://localhost:3000/iaUpdate/getdashboarddataByYear?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots + '&selectAgency=' +  $scope.getRefNoofIa).then(function (response) {
      $scope.byreload = response.data;
      if (response.data.length > 0) {

        $scope.showTable = true;
        $scope.notFound = false;

      } else {
        $scope.showTable = false;
        $scope.notFound = true;
      }
    // console.log($scope.getdashboarddataByYear,"reload");
      $scope.getGuageDashBoardData($scope.byreload);

    })
  }


  $scope.onChangeProgess = function (){
    $scope.setChartRange ();
    $scope.getGuageDashBoardData($scope.getdashboarddataByYear);


  }
  $scope.setChartRange = function () {
    if ($scope.selectTypes == "3month") {
      if ($scope.performanceAuthority == "governance") {
        customTicks = [0, 3, 6, 9];
        higherValue = 9;
      } else if ($scope.performanceAuthority == "business") {
        customTicks1 = [0, 3, 6, 9];
        higherValue1 = 9;
      }
    } 
    if ($scope.selectTypes == "11month") {
      if ($scope.performanceAuthority == "governance") {

        customTicks = [0, 7, 14, 21];
        higherValue = 21;
      } else if ($scope.performanceAuthority == "business") {

        customTicks1 = [0, 4, 8, 12]; 
        higherValue1 = 12;
      }

    }
     if ($scope.selectTypes == "1year") {
      if ($scope.performanceAuthority == "governance") {
        customTicks = [0, 9, 18, 27];
        higherValue = 27;
      } else if ($scope.performanceAuthority == "business") {
        customTicks1 = [0, 5, 10, 15];
        higherValue1 = 15;
      }
    }
    if ($scope.performanceAuthority == "finance") {
      customTicks2 = [0, 3, 6, 9];
      higherValue2 = 9;
    }

  }

  $scope.getdashboardData = function () {
      $http.get('http://localhost:3000/iaUpdate/getdashboardByIa').then(function (response) {
      $scope.getdashboarddata = response.data;
      $scope.getGuageDashBoardData(response.data);
    })
  }
  $scope.getdashboardData();

  


  $scope.getGuageDashBoardData = function (result1) {
    var result = JSON.parse(angular.toJson(result1));

    var totalFdrvc = 0
    var total1Fdrvc = 0
    var total2Fdrvc = 0
   
    for (let i = 0; i < result.length; i++) {
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
          persentCeoFdrvc = 2;
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

        totalFdrvc = presentAvgHolderFdrvc + persentCeoFdrvc + persentAccountantFdrvc + persentAuditorFdrvc + persentCommencementofbusinessFdrvc + persentGstlicenseFdrvc + persentStatutoryauditFdrvc + persentRocFdrvc + persentAgmFdrvc
        total1Fdrvc = persentTurnoverFdrvc + persentMouregistrationFdrvc + persentOnenumFdrvc + persentTradingenumFdrvc + persentBusinessplanFdrvc
        total2Fdrvc = persentSharecapitalFdrvc + persentEquitygrantFdrvc + persentBankloanFdrvc
     
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
              customTicks: customTicks1,
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

        $('.gauge5').each(function (index, item) {
          let params = {
            initialValue: total1Fdrvc,
            higherValue: higherValue1,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };


          let gauge5 = new GaugeChart(item, params);
          gauge5.init();
        });

        $('#random').click(function () {

          $('.gauge5').each(function (index, item) {
            let gauge5 = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge5._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge5.value(randomNum);
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
              customTicks: customTicks2,
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

        $('.gauge10').each(function (index, item) {
          let params = {
            initialValue: total2Fdrvc,
            higherValue: higherValue2,
            title: `Temperature ${index + 1}`,
            subtitle: '780 ºC'
          };


          let gauge10 = new GaugeChart(item, params);
          gauge10.init();
        });

        $('#random').click(function () {

          $('.gauge10').each(function (index, item) {
            let gauge10 = $(item).dxCircularGauge('instance');
            let randomNum = Math.round(Math.random() * 1560);
            let gaugeElement = $(gauge10._$element[0]);

            gaugeElement.find('.dxg-title text').last().html(`${randomNum} ºC`);
            gauge10.value(randomNum);
          });
        });
      });

    });
  }

  $scope.showYear();

})