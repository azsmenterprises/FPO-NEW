var myapp3 = angular.module("myapp", []);
myapp3.controller("ctrl", function ($scope, $http, $filter, $timeout) {
    $scope.Type
    $scope.feedback = 'Feedback'
    $scope.greivance
    $scope.query
    $scope.mobNo
    $scope.email
    $scope.content
    $scope.feedbackFormSubmitStatus = false;
    $scope.required = true;


    $scope.feedBackFormSubmit = function () {
        let feedbackData = {
            // feedback: x.feedback,
            // greivance: x.greivance,
            // query: x.query,
            feedbackType: $scope.feedback,
            mobNo: $scope.mobNo,
            email: $scope.email,
            feedback: $scope.content
        }

        $http.post('http://localhost:3000/landRoute/feedbackformsubmit', feedbackData).then(function (response) {
            if (response.data.status > 0) {
                $scope.feedbackType = response.data.feedbackType
                $scope.feedbackFormSubmitStatus = true;
                $scope.mobNo = ''
                $scope.email = ''
                $scope.content = ''
                $scope.feedback = 'Feedback'
                $timeout(function () { $scope.feedbackFormSubmitStatus = false }, 15000);
            }

        })
    }


})