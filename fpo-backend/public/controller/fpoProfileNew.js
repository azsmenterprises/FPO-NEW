var app1 = angular.module("myapp", []);

app1.controller("ctrl", function ($scope, $http, $filter, $timeout) {
    $scope.userId = userId;
    $scope.getFpoData = async function () {
        $scope.loader = document.getElementById("loaderDiv");
        await $http.get('https://fpoodisha.nic.in/fpoProfileNew/fpoDetailsNew/' + $scope.userId).then(function (response) {
            $scope.fpoProfileData = response.data;
            $scope.fpoId = $scope.fpoProfileData.fpoId
        $scope.fpoProfileLike();
            $scope.countRun()
            $scope.formatForSlider()
        })
      
    }
    $scope.getFpoData();


    
    // $scope.formatForSlider = function () {
    //     var perChunk = 4 // items per chunk    
    //     var inputArray = $scope.fpoProfileData.cropProducedAggreData

    //     var result = inputArray.reduce((resultArray, item, index) => {
    //         const chunkIndex = Math.floor(index / perChunk)
    //         if (!resultArray[chunkIndex]) {
    //             resultArray[chunkIndex] = [] // start a new chunk
    //         }

    //         resultArray[chunkIndex].push(item)
    //         return resultArray
    //     }, [])
    //     $scope.sliderData = result[0]
    //     $scope.sliderData1 = result.slice(1)
    // }

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

    $scope.exportToExcel = function (type, fn, dl) {
        var elt = document.getElementById('tableId');
        var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
        return dl ?
            XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
            XLSX.writeFile(wb, fn || ($scope.userId + 'ProfileDetails.' + ('xlsx')));

    }

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
        $scope.sliderData = result[0]
        $scope.sliderData1 = result.slice(1)
    }

    $scope.getProfileLikes = async function () {
        let fpoId = await $scope.getFpoData()
        console.log($scope.fpoId, "controller");

        $http.get('https://fpoodisha.nic.in/fpoProfileNew/getProfileLikes?fpoId=' + $scope.fpoId).then(function (response) {
            $scope.Likes = response.data;
            if (response.data.length > 0) {
                alert("Success")
                // window.location.reload();
            } else {
                alert("Unsuccess")
            }
        })
    }
    // $scope.getProfileLikes()
    
    $scope.connectBackData =  function () {
        var mData ={
            name: $scope.name,
            contactNumber:$scope.number,
            required:$scope.required,
            message:$scope.message,
            fpoName:$scope.fpoProfileData.fpoName,
            fpoId:$scope.userId 
        }
        console.log(mData,"kkk");
        $http.get('https://fpoodisha.nic.in/fpoProfileNew/connectBackData?name=' + $scope.name +'&contactNumber='+$scope.number + '&required=' + $scope.required + '&message=' + $scope.message + '&fpoName=' + $scope.fpoProfileData.fpoName  + '&fpoId='+ $scope.userId).then(function (response) {
            // $scope.Likes = response.data;
            if (response.data == true) {
                alert("Success")
                $scope.name = '';
            $scope.number = '';
            $scope.required = '';
            $scope.message = '';
            } else {
                alert("Unsuccess")
            }
        })
    }
    $scope.fpoProfileLike = async function () {
        $http.get('https://fpoodisha.nic.in/fpoProfileNew/fpoProfileLike/' + $scope.userId)
        .then(function (response1) {
            $scope.fpoProfileDataLike = response1.data;
        }).catch(function (error) {
            console.error('Error fetching data:', error);
        });
    }
    
   


})