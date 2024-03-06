var myapp = angular.module("myapp", []);

myapp.controller("faqCtrl", function ($scope, $http, $filter, $timeout) {
    // $scope.id = id
    $scope.allfaqData
    $scope.allfaqTypes
    $scope.getchapterwiseFaqData
    $scope.searchBox
    $scope.searchFAQ
// console.log("4444444444444444444444444444");

    $scope.getAllFaqTypes = function () {
        $http.get('http://localhost:3000/landRoute/getAllFaqTypes').then(function (response) {
            // console.log(response,"hhhhhhhhhhhhhhhyyyyyyyyyy");
            $scope.allfaqTypes = response.data
            // console.log(response.data,"kjhgdss","hhhhhhhhhhhhhhh");
            let mergingData = '';
            let count = 0
            let count1 = 0
            $scope.allfaqTypes.forEach(e => {
                count++
                mergingData += `<h1 style="font-size: larger;
                text-align: center;">${count}.${e.typeAs}:-</h1><br><hr><br>`;
                e.others.forEach(f => {
                    count1++
                    mergingData += `<h5 class="card-title"> Q.${count1}.${f.question}</h5>`;
                    mergingData += `Ans:` + f.answer + `<br>`;
                })
            })
            // console.log(response,"gagagag");
            document.getElementById("faq").innerHTML = mergingData;
        })
    }
    $scope.getAllFaqTypes();


    $scope.search2=function(){
        if($scope.searchFAQ){
            $http.get("http://localhost:3000/landRoute/searchFAQ/"+$scope.searchFAQ)
            .then(function (response) {
                $scope.allfaqTypes = response.data
                ////////console.log($scope.allfaqTypes);
                let mergingData = '';
                let count = 0
                let count1 = 0
                $scope.allfaqTypes.forEach(e => {
                    count++
                    mergingData += `<h1 style="font-size: larger;
                    text-align: center;">${count}.${e.typeAs}:-</h1><br><hr><br>`;
                    e.others.forEach(f => {
                        count1++
                        mergingData += `<h5 class="card-title"> Q.${count1}.${f.question}</h5>`;
                        mergingData += `Ans:` + f.answer + `<br>`;
                    })
                })
                document.getElementById("faq").innerHTML = mergingData;
            });
        }
    }

   

})


