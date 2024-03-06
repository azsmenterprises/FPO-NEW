var myapp3 = angular.module("myapp", []);

myapp3.controller("ctrl", function ($scope, $http) {
  $scope.performanceAuthority = "governance";
  $scope.selectyear = "2021-2022";
  $scope.selectTypes = "1year";
  $scope.selectSlots = "Oct-March";
  $scope.selectCbbo = "";
  $scope.cbboName;
  var customTicks = [0, 9, 18, 27];
  var higherValue = 27;
  var customTicks1 = [0, 5, 10, 15];
  var higherValue1 = 15;
  var customTicks2 = [0, 3, 6, 9];
  var higherValue2 = 9;

  $scope.getCbbo = function () {
    $http.get('http://localhost:3000/cbboUpdate/getCbboList').then(function (response) {
      $scope.getCbbo = response.data;
      console.log($scope.getCbbo, '$scope.getCbbo ');
      $scope.cbboName = $scope.getCbbo[1].cbboName;
      console.log($scope.cbboName, '$$scope.cbboName.$scope.cbboName ');
    })
  }
  $scope.getCbbo();
  $scope.showYear = function () {
    $http.get('http://localhost:3000/cbboUpdate/getCbboTargetList?selectyear=' + $scope.selectyear + '&selectTypes=' + $scope.selectTypes + '&selectSlots=' + $scope.selectSlots).then(function (response) {
      // $scope.getCbboTargetList = response.data;
      // $scope.getCbboTargetList = [];
      if (response.data.length > 0) {
        $scope.getCbboTargetList = response.data[0];
        $scope.notFound = false;
        $scope.showYear();

      }else{
        $scope.notFound = true;

      }
      console.log( $scope.getCbboTargetList,' $scope.getCbboTargetList $scope.getCbboTargetList');
    })
  }
  $scope.getCbboAchievement = function () {
    $http.get('http://localhost:3000/cbboUpdate/getCbboAchievementListhhh?selectCbbo=' + $scope.selectCbbo).then(function (response) {
      console.log(response.data, 'response.data');
      if (response.data && response.data.length > 0) {
        $scope.getCbboAchievementList = response.data;
        var shareHoler = [];
        var shareCapital = [];
        var yes1 = 0;
        var no1 = 0;
        var yes2 = 0;
        var no2 = 0;
        var yes3 = 0;
        var no3 = 0;
        var yes4 = 0;
        var no4 = 0;
        var yes5 = 0;
        var no5 = 0;
        var yes6 = 0;
        var no6 = 0;
        var yes7 = 0;
        var no7 = 0;
        var yes8 = 0;
        var no8 = 0;
        var yes9 = 0;
        var no9 = 0;
        var yes10 = 0;
        var no10 = 0;
        var year1 = 0;
        var year2 = 0;
        var year3 = 0;
        var yes11 = 0;
        var no11 = 0;
        var yes12 = 0;
        var no12 = 0;
        var yes13 = 0;
        var no13 = 0;
        var yes14 = 0;
        var no14 = 0;
        var totalValue1 = 0
        var totalValue2 = 0
        var totalValue3 = 0
        for (let i = 0; i < $scope.getCbboAchievementList.length; i++) {
          shareHoler.push(parseInt($scope.getCbboAchievementList[i]?.NoOfFarmerMobilizedAsShareholders))
          shareCapital.push(parseInt($scope.getCbboAchievementList[i]?.ShareCapitalMobilizedInInr))
          if ($scope.getCbboAchievementList[i]?.commencementOfBusinessfieldWithMca == 'yes') {
            yes1 = ++yes1;
          } else {
            no1 = ++no1;
          }
          if ($scope.getCbboAchievementList[i]?.CeoAppointed == 'yes') {
            yes2 = ++yes2;
          } else {
            no2 = ++no2;
          }
          if ($scope.getCbboAchievementList[i]?.AccountedAppointed == 'yes') {
            yes3 = ++yes3;
          } else {
            no3 = ++no3;
          }
          if ($scope.getCbboAchievementList[i]?.AuditorAppointed == 'yes') {
            yes4 = ++yes4;
          } else {
            no4 = ++no4;
          }
          if ($scope.getCbboAchievementList[i]?.GstLicenceApplied == 'yes') {
            yes5 = ++yes5;
          } else {
            no5 = ++no5;
          }
          if ($scope.getCbboAchievementList[i]?.statutoryAudit == 'yes') {
            yes6 = ++yes6;
          } else {
            no6 = ++no6;
          }
          if ($scope.getCbboAchievementList[i]?.AgmConducted == 'yes') {
            yes7 = ++yes7;
          } else {
            no7 = ++no7;
          }
          if ($scope.getCbboAchievementList[i]?.fpoFilledroc == 'yes') {
            yes8 = ++yes8;
          } else {
            no8 = ++no8;
          }
          if ($scope.getCbboAchievementList[i]?.receivedloanFrombank == 'Yes') {
            yes9 = ++yes9;
          } else {
            no9 = ++no9;
          }
          if ($scope.getCbboAchievementList[i]?.EquityGrantAvailed == 'yes') {
            yes10 = ++yes10;
          } else {
            no10 = ++no10;
          }
          if ($scope.getCbboAchievementList[i]?.BusinessPlanFormulated == '3-5year') {
            year1 = ++year1;
          } else if ($scope.getCbboAchievementList[i]?.BusinessPlanFormulated == '1-3year') {
            year2 = ++year2;
          } else {
            year3 = ++year3
          }
          if ($scope.getCbboAchievementList[i]?.fpotradingThroughenum == 'Yes') {
            yes11 = ++yes11;
          } else {
            no11 = ++no11;
          }
          if ($scope.getCbboAchievementList[i]?.RegistrationOnEnam == 'Yes') {
            yes12 = ++yes12;
          } else {
            no12 = ++no12;
          }
          if (parseInt($scope.getCbboAchievementList[i]?.AnnualBusinessTurnoverinInr) >= 5000000) {
            yes13 = ++yes13;
          } else {
            no13 = ++no13;
          }
          if ($scope.getCbboAchievementList[i]?.NoOfMouSignedVendorRegistration == 0) {
            no14 = ++no14
          } else {
            yes14 = ++yes14
          }
        }
        $scope.percentageofcommencementbusiness = (yes1 / (yes1 + no1) * 100).toFixed(2);
        console.log($scope.percentageofcommencementbusiness,'$scope.percentageofcommencementbusiness');
        $scope.percentageofceoappointed = (yes2 / (yes2 + no2) * 100).toFixed(2);
        $scope.percentageofaccountantappointed = (yes3 / (yes3 + no3) * 100).toFixed(2);
        $scope.percentageofauditorappointed = (yes4 / (yes4 + no4) * 100).toFixed(2);
        $scope.percentageofgstlicense = (yes5 / (yes5 + no5) * 100).toFixed(2);
        $scope.percentageofstatutoryaudit = (yes6 / (yes6 + no6) * 100).toFixed(2);
        $scope.percentageofagmconducted = (yes7 / (yes7 + no7) * 100).toFixed(2);
        $scope.percentageofrocfilled = (yes8 / (yes8 + no8) * 100).toFixed(2);
        $scope.percentageofreceivedloan = (yes9 / (yes9 + no9) * 100).toFixed(2);
        $scope.percentageofequitygrant = (yes10 / (yes10 + no10) * 100).toFixed(2);
        $scope.percentageofbusinessplan = (year1 / (year1 + year2 + year3) * 100).toFixed(2);
        $scope.percentageoftradingthroughenum = (yes11 / (yes11 + no11) * 100).toFixed(2);
        $scope.percentageofregisteronenum = (yes12 / (yes12 + no12) * 100).toFixed(2);
        $scope.percentageofannualturnover = (yes13 / (yes13 + no13) * 100).toFixed(2);
        $scope.percentageofmouregistration = (yes14 / (yes14 + no14) * 100).toFixed(2);
        $scope.averageShareHoler = shareHoler.reduce((a, b) => a + b, 0) / shareHoler.length;
        var avgholder = averageShareHoler.toFixed(2)
        $scope.averageShareCapital = shareCapital.reduce((a, b) => a + b, 0) / shareCapital.length;
        var avgcapital = averageShareCapital.toFixed(2)

        if (avgholder >= 300) {
          avgholder = 3;
        } else if (avgholder >= 100 && avgholder <= 300) {
          avgholder = 2;
        } else if (avgholder <= 100) {
          avgholder = 1;
        }
        if ($scope.percentageofceoappointed >= 80 && $scope.percentageofceoappointed <= 100) {
          var ceoappointed = 3;
        } else if ($scope.percentageofceoappointed >= 50 && $scope.percentageofceoappointed < 80) {
          ceoappointed  = 2;
        } else if ($scope.percentageofceoappointed >= 0 && $scope.percentageofceoappointed < 50) {
          ceoappointed  = 1;
        }
        if ($scope.percentageofaccountantappointed >= 80 && $scope.percentageofaccountantappointed <= 100) {
          var accountantappointed = 3;
        } else if ($scope.percentageofaccountantappointed >= 50 && $scope.percentageofaccountantappointed < 80) {
          accountantappointed= 2;
        } else if ($scope.percentageofaccountantappointed >= 0 && $scope.percentageofaccountantappointed < 50) {
          accountantappointed = 1;
        }
        if ($scope.percentageofauditorappointed >= 80 && $scope.percentageofauditorappointed <= 100) {
          var auditorappointed = 3;
        } else if ($scope.percentageofauditorappointed >= 50 && $scope.percentageofauditorappointed < 80) {
          auditorappointed = 2;
        } else if ($scope.percentageofauditorappointed >= 0 && $scope.percentageofauditorappointed < 50) {
          auditorappointed = 1;
        }
        if ($scope.percentageofcommencementbusiness >= 80 && $scope.percentageofcommencementbusiness <= 100) {
          var commencementbusiness = 3;
        } else if ($scope.percentageofcommencementbusiness >= 50 && $scope.percentageofcommencementbusiness < 80) {
          commencementbusiness  = 2;
        } else if ($scope.percentageofcommencementbusiness >= 0 && $scope.percentageofcommencementbusiness < 50) {
          commencementbusiness  = 1;
        }
        if ($scope.percentageofgstlicense >= 80 && $scope.percentageofgstlicense <= 100) {
          var gstlicense = 3;
        } else if ($scope.percentageofgstlicense >= 50 && $scope.percentageofgstlicense < 80) {
          gstlicense = 2;
        } else if ($scope.percentageofgstlicense >= 0 && $scope.percentageofgstlicense < 50) {
          gstlicense = 1;
        }
        if ($scope.percentageofstatutoryaudit >= 80 && $scope.percentageofstatutoryaudit <= 100) {
          var statutoryaudit = 3;
        } else if ($scope.percentageofstatutoryaudit >= 50 && $scope.percentageofstatutoryaudit < 80) {
          statutoryaudit = 2;
        } else if ($scope.percentageofstatutoryaudit >= 0 && $scope.percentageofstatutoryaudit < 50) {
          statutoryaudit = 1;
        }
        if ($scope.percentageofagmconducted >= 80 && $scope.percentageofagmconducted <= 100) {
          var agmconducted = 3;
        } else if ($scope.percentageofagmconducted >= 50 && $scope.percentageofagmconducted < 80) {
          agmconducted = 2;
        } else if ($scope.percentageofagmconducted >= 0 && $scope.percentageofagmconducted < 50) {
          agmconducted = 1;
        }
        if ($scope.percentageofrocfilled >= 80 && $scope.percentageofrocfilled <= 100) {
          var rocfilled = 3;
        } else if ($scope.percentageofrocfilled >= 50 && $scope.percentageofrocfilled < 80) {
          rocfilled = 2;
        } else if ($scope.percentageofrocfilled >= 0 && $scope.percentageofrocfilled < 50) {
          rocfilled = 1;
        }
        if ($scope.percentageofannualturnover >= 80 && $scope.percentageofannualturnover <= 100) {
          var annualturnover = 3;
        } else if ($scope.percentageofannualturnover >= 50 && $scope.percentageofannualturnover < 80) {
          annualturnover = 2;
        } else if ($scope.percentageofannualturnover >= 0 && $scope.percentageofannualturnover < 50) {
          annualturnover = 1;
        }
        if ($scope.percentageofmouregistration >= 80 && $scope.percentageofmouregistration <= 100) {
          var mouregistration = 3;
        } else if ($scope.percentageofmouregistration >= 50 && $scope.percentageofmouregistration < 80) {
          mouregistration = 2;
        } else if ($scope.percentageofmouregistration >= 0 && $scope.percentageofmouregistration < 50) {
          mouregistration = 1;
        }
        if ($scope.percentageofregisteronenum >= 80 && $scope.percentageofregisteronenum <= 100) {
          var registeronenum = 3;
        } else if ($scope.percentageofregisteronenum >= 50 && $scope.percentageofregisteronenum < 80) {
          registeronenum = 2;
        } else if ($scope.percentageofregisteronenum >= 0 && $scope.percentageofregisteronenum < 50) {
          registeronenum = 1;
        }
        if ($scope.percentageoftradingthroughenum >= 80 && $scope.percentageoftradingthroughenum <= 100) {
          var tradingthroughenum = 3;
        } else if ($scope.percentageoftradingthroughenum >= 50 && $scope.percentageoftradingthroughenum < 80) {
          tradingthroughenum = 2;
        } else if ($scope.percentageoftradingthroughenum >= 0 && $scope.percentageoftradingthroughenum < 50) {
          tradingthroughenum = 1;
        }
        if ($scope.percentageofbusinessplan >= 80 && $scope.percentageofbusinessplan <= 100) {
          var businessplan = 3;
        } else if ($scope.percentageofbusinessplan >= 50 && $scope.percentageofbusinessplan < 80) {
          businessplan = 2;
        } else if ($scope.percentageofbusinessplan >= 0 && $scope.percentageofbusinessplan < 50) {
          businessplan = 1;
        }
        if (avgcapital >= 500000) {
          avgcapital = 3;
        } else if (avgcapital >= 250000 && avgcapital < 500000) {
          avgcapital = 2;
        } else if (avgcapital < 250000) {
          avgcapital = 1;
        }
        if ($scope.percentageofequitygrant >= 80 && $scope.percentageofequitygrant <= 100) {
          var equitygrant = 3;
        } else if ($scope.percentageofequitygrant >= 50 && $scope.percentageofequitygrant < 80) {
          equitygrant = 2;
        } else if ($scope.percentageofequitygrant >= 0 && $scope.percentageofequitygrant < 50) {
          equitygrant = 1;
        }
        if ($scope.percentageofreceivedloan >= 80 && $scope.percentageofreceivedloan <= 100) {
          var receivedloan = 3;
        } else if ($scope.percentageofreceivedloan >= 50 && $scope.percentageofreceivedloan < 80) {
          receivedloan = 2;
        } else if ($scope.percentageofreceivedloan >= 0 && $scope.percentageofreceivedloan < 50) {
          receivedloan = 1;
        }
        if ($scope.selectTypes == '11month') {
          statutoryaudit = 0;
          rocfilled = 0;
          annualturnover = 0;
        }
        if ($scope.selectTypes == '3month') {
          auditorappointed = 0;
          commencementbusiness = 0;
          gstlicense = 0;
          statutoryaudit = 0;
          rocfilled = 0;
          agmconducted = 0;
          annualturnover = 0;
          tradingthroughenum = 0;
        }
        totalValue1 = avgholder + ceoappointed + accountantappointed + auditorappointed + commencementbusiness + gstlicense + statutoryaudit + rocfilled + agmconducted
        totalValue2 = annualturnover + mouregistration + registeronenum + tradingthroughenum + businessplan
        totalValue3 = avgcapital + equitygrant + receivedloan  
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
              initialValue: totalValue1,
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
              initialValue: totalValue2,
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
              initialValue: totalValue3,
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
    })
  }
  $scope.getCbboAchievement();

})