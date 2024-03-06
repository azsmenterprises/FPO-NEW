var app1 = angular.module("myapp", []);

app1.controller("ctrl", function ($scope, $http, $filter, $timeout) {
    $scope.userId = userId;
    $scope.mobNo
    $scope.success = false
    $scope.otpSent = false
    $scope.otp
    $scope.name
    $scope.catagory
    otpError = false
    $scope.messageText
    $scope.fpoId
    $scope.typeCat
    $scope.year = new Date().getFullYear();
    $scope.month= new Date().getMonth();

$scope.year=$scope.month>=3? ($scope.year+1).toString().substring(2,4) :($scope.year).toString().substring(2,4);
//console.log($scope.year,"year");
    $scope.getFpoData = async function () {
        $scope.loader = document.getElementById("loaderDiv");
        $scope.loader.style.display = "block";

      await  $http.get('http://localhost:3000/fpoProfile/fpoDetails/' + $scope.userId).then(function (response) {
            $scope.loader.style.display = "none";
            $scope.fpoProfileData = response.data;
            // //console.log( $scope.fpoProfileData,"profile data");
             $scope.fpoId=$scope.fpoProfileData.fpoId

            //   //console.log( $scope.fpoProfileData.fpoId,"details");
            //   //console.log( $scope.fpoProfileData.InfrastructureDetail,"InfrastructureDetail");

            $scope.countRun()
            $scope.formatForSlider()
        })
    }
    $scope.getFpoData()

    $scope.numberWithCommas = function (x,y,z) { 
        x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        z.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return(x,y,z)

      }
    $scope.getProfileLikes = async function () {
        let fpoId= await $scope.getFpoData()
        //console.log( $scope.fpoId,"controller");
       
        $http.get('http://localhost:3000/fpoProfile/getProfileLikes/' + $scope.fpoId).then(function (response) {
           
            $scope.Likes = response.data;
        })
    }
    $scope.getProfileLikes()

    $scope.getChartData = async function () {
        let fpoId= await $scope.getFpoData()
        //console.log( $scope.fpoId,"controller");
        $http.get('http://localhost:3000/fpoProfile/getChartData/' + $scope.fpoId).then(function (response) {
           
            $scope.chartData = response.data;
             //console.log(response.data,"chartData");
           
        })
    }
    $scope.getChartData()

    $scope.getChartSaleData = async function () {
        let fpoId= await $scope.getFpoData()
        //console.log( $scope.fpoId,"controller");
        $http.get('http://localhost:3000/fpoProfile/getChartSaleData/' + $scope.fpoId).then(function (response) {
           
            $scope.chartData = response.data;
             //console.log(response.data,"getChartSaleData");
           
        })
    }
    $scope.getChartSaleData()





    // ======================================Slider Start=============================================
    $scope.sliderData
    $scope.sliderData1
    $scope.formatForSlider = function () {
        var perChunk = 4 // items per chunk    
        var inputArray = $scope.fpoProfileData.cropProducedAggreData

        var result = inputArray.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)
            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)
            return resultArray
        }, [])
        $scope.sliderData = result
        $scope.sliderData1 = result.slice(1)
    }

    // ======================================Slider end=============================================

    $scope.showPopover = function() {
        $scope.popoverIsVisible = true; 
       
      };
      
      $scope.hidePopover = function () {
        $scope.popoverIsVisible = false;
       
      };

      $scope.showPopover1 = function() {
        $scope.popoverIsVisible1 = true; 
       
      };
      
      $scope.hidePopover1 = function () {
        $scope.popoverIsVisible1 = false;
       
      };
      $scope.showPopover2 = function() {
        $scope.popoverIsVisible2 = true; 
       
      };
      
      $scope.hidePopover2 = function () {
        $scope.popoverIsVisible2 = false;
       
      };

    $scope.verifyMobileNO = function () {
        //console.log("in controller");
        $http.get('http://localhost:3000/fpoProfile/varifyMobileNO/' + $scope.mobNo).then(function (response) {
            if (response) {
                $scope.otpSent = true
            }
        })
    }

    $scope.facebook = function () {
        let x='http://localhost:3000/redirectToFpoProfile?fpoData='+userId
        // $http.post('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse'+x)
        window.location.href='http://www.facebook.com/dialog/send?link='+encodeURI(x)

    }

    // https://twitter.com/intent/tweet
    $scope.twitter=function(){
        window.location.href='https://twitter.com/intent/tweet'
    }

    $scope.mobNoForWhatsap
    $scope.whatsapp=function(){
        let x='http://localhost:3000/redirectToFpoProfile?fpoData='+userId
        // window.location.href='https://api.whatsapp.com/send?phone='+91+$scope.mobNoForWhatsap
        window.location.href='https://wa.me/'+91+$scope.mobNoForWhatsap+'?text='+encodeURI(x)
    }

    $scope.varifyOtpAndSendData = function (x) {
        //console.log(x);
        let data = {
            type: x,
            fpoName: $scope.fpoProfileData.fpoName,
            fpoId: $scope.fpoProfileData.fpoId,
            name: $scope.name,
            mobNo: $scope.mobNo,
            otp: $scope.otp,
            messageText: $scope.messageText,
            typeCat:$scope.typeCat
           
        }
        
        $http.post('http://localhost:3000/fpoProfile/varifyOtpAndSendData', data).then(function (response) {
            //console.log("status");
            if (response.data.status == true) {
                $scope.success = true
                $scope.mobNo = ''
                $scope.otpSent = false
                $scope.otp = ''
                $scope.name = ''
                $timeout(function () { $scope.success = false }, 5000);
                $('#exampleModalLongTitle.close');         
            }
            if (response.data.status == 'otpError') {
                $scope.otpError = true
                $timeout(function () { $scope.otpError = false }, 10000);
            }
        })
    }
 C


    //Digital Count Run
    $scope.countRun = function () {
        const counters = document.querySelectorAll('.counter');//get all the counters
        const speed = 400; // The lower the faster
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                // Lower inc to slow and higher to slow
                const inc = ~~(target / speed);

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = count + inc;
                    // Call function every ms
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();

        });
    }

    // Below code is for chart js

    // var dps = [{ x: 1, y: 10 }, { x: 2, y: 13 }, { x: 3, y: 18 }, { x: 4, y: 20 }, { x: 5, y: 17 }, { x: 6, y: 10 }, { x: 7, y: 13 }, { x: 8, y: 18 }, { x: 9, y: 20 }, { x: 10, y: 17 }];
    // var chartOptions = {

    //     data: [{
    //         type: "line",
    //         dataPoints: dps
    //     }]
    // };
    // var chart = new CanvasJS.Chart("chartContainer", chartOptions);
    // chart.render();

    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Produced',
                data: [5, 7, 10, 12, 15, 20],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 0.8)',
                ],
                borderWidth: 3,tension: 0.3
            },{
                label: 'Sales',
                data: [3, 5, 10, 10, 15, 17],
                backgroundColor: [
                    'rgb(0, 0, 255)',
                ],
                borderColor: [
                    'rgb(0, 0, 255)',
                ],
                borderWidth: 3,tension: 0.3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    // Below code is for chart js end

})