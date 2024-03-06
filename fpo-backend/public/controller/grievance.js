var myapp = angular.module("myapp", []);
myapp.controller("ctrl", function ($scope, $http, $filter, $timeout) {
   

    $scope.FpoDistrictList
    $scope.FpoBlockList



    $scope.loadFpoDistrcits = function () {

        $http.get("http://localhost:3000/landRoute/getDistricts")
            .then(function (response) {
                $scope.FpoDistrictList = response.data;

            });

    }
    $scope.loadFpoDistrcits();

    $scope.loadFpoBlocks = function () {       
        if ($scope.FpoDistrict != null) {

            $http.get("http://localhost:3000/landRoute/getBlocksOfDistrict/" + JSON.parse($scope.FpoDistrict).districtCode)
                .then(function (response) {
                    $scope.FpoBlockList = response.data;

                });
        }
    }


    $scope.submitGrievance = function() {
        // console.log($scope.petitioner_name,"$scope.petitioner_namenamenamename");
        // console.log($scope.upload,"$scope.upload_filehttttttttttttttt");
        let upload = document.querySelector('#upload').files[0];
        $scope.data1= [];
        $scope.data = {};
        $scope.data.petitioner_name = $scope.petitioner_name;
        $scope.data.email = $scope.email;
        $scope.data.mobile_no = $scope.mobile_no;
        $scope.data.district = JSON.parse($scope.FpoDistrict).districtName;
        $scope.data.block = JSON.parse($scope.FpoBlock).blockName;
        $scope.data.address = $scope.address;
        $scope.data.sender_identity = $scope.sender_identity;
        $scope.data.to_whom = $scope.to_whom;
        
        $scope.data.grievance_receive_date = $scope.grievance_receive_date;
        $scope.data.upload = $scope.upload;

        var data = new FormData();
        var request = new XMLHttpRequest();
        alert("Grievance Submitted Sucessfully");
        $scope.clearAll();

        data.append('upload', document.querySelector('#upload').files[0]);
        request.onreadyuploadfile = function (response) {
            if (this.uploadfile == 4 && this.status == 200) {
                 window.location.href = "notification";
                
            }
        };

        data.append('Name1', JSON.stringify(JSON.parse(angular.toJson($scope.data))));
        request.open('POST', "http://localhost:3000/landRoute/submitGrievance");
        request.send(data);


        
    }
    $scope.clearAll = function () {
       
      data = {};
        $scope.petitioner_name= null;
        $scope.email= null;
        $scope.mobile_no= null;
        $scope.FpoDistrict= null;
        $scope.FpoBlock=null; 
        $scope.address= null;
        $scope.sender_identity= null;
        $scope.to_whom=null;
        $scope.grievance_receive_date= null;
        $scope.upload= null;

        // $scope.id_proof_type= null;
        // $scope.hidden_farmer_aadhaar_number=null;  
        // $scope.farmer_aadhaar_number_document= null;
        // $scope.farmer_voter_id= null;
        // $scope.farmer_voter_id_document= null;
       
    }


   
    $scope.userFileCheck = function () {
        let upload = document.querySelector('#upload').files[0];
        if (upload != undefined) {
            var theSize = upload.size;
            var checkType = upload.type;
            if (checkType == "image/jpeg" || checkType == "image/png" || checkType == "image/jpg" || checkType == "application/pdf" || checkType == "application/PDF" || checkType == ".csv" || checkType == "application/vnd.ms-excel" || checkType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || checkType == "application/msword" || checkType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") { // validation of file extension using regular expression before file upload
                $scope.uploadFileGood = "";
                $scope.showUploadError = true;
                if (theSize > 1000000)  // validation according to file size(in bytes)
                {
                    alert('file size too large');
                    document.getElementById("upload").value = null;
                    $scope.showUploadError = true;
                    $scope.uploadFileGood = "File size too large";
                }
            }
            else {
               
                $scope.showUploadError = true;
                $scope.uploadFileGood = "Wrong file Type Selected";

                document.getElementById("upload").value = null;

            }

        }
        else {
            window.alert('Upload Mandatory Files');
        }
        $scope.$apply();
    }
    

});