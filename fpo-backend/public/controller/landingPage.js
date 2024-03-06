

var app = angular.module("myapp", []);

app.controller("ctrl", function ($scope, $http, $filter, $timeout) {
    $scope.showFigRegForm = true;
    $scope.showFarmerTbl = false
    $scope.showFrmrRegScrn = true
    $scope.farmerRegStatus = false
    $scope.farmerRegErr = true
    $scope.farmerRegExists = false
    $scope.frmrCropArry = []
    $scope.showOtpSec = false
    $scope.otpError1 = false
    $scope.fpoDataForScroll
    $scope.allSchemes
    $scope.allSchemesOdia
    $scope.allDepartmentsForSchemes
    $scope.allBeneficiaryTypes
    $scope.selectedDepartment
    $scope.selectedBeneficiary
    $scope.consumerId
    $scope.groupRegType
    $scope.leaderMobNo = ''
    $scope.hiddenLeaderMobNO
    $scope.locationOfFpo
    $scope.locationOfKsk
    $scope.mark
    $scope.markerArray = []
    $scope.CsOtp
    $scope.traderRegFormSubmitStatus
    $scope.showOtpForTrader = false
    $scope.traderotp = true

    $scope.CGName
    $scope.cgMobNo
    $scope.noOfConsumers
    $scope.Cgmail
    $scope.Cgmail1
    $scope.cgMobNo1
    $scope.plot
    $scope.landmark
    $scope.District1
    $scope.city
    $scope.state
    $scope.pin
    $scope.ctg
    $scope.crop
    $scope.District2
    $scope.Cs
    $scope.csName
    $scope.Csmail
    $scope.csMobNo
    $scope.csMobNo1
    $scope.plot1
    $scope.landmark1
    $scope.city1
    $scope.state1
    $scope.pin1
    $scope.pw1
    $scope.pw2
    $scope.cgFormSubmitStatus = false
    $scope.cgRegFormSubmitStatus = false
    $scope.showOtp = false
    $scope.cgotp = true
    $scope.showCGRegForm = true
    $scope.showCGRegForm1 = false
    $scope.showCGRegForm2 = false
    $scope.showCGRegForm3 = false
    $scope.showCSRegForm = true
    $scope.showCSRegForm1 = false
    $scope.showCSRegForm2 = false
    $scope.cgPassword
    $scope.cgRegUserId
    $scope.traderOtp
    $scope.FpoForm1 = false
    $scope.showTraderRegForm2 = false
    $scope.disablenum = false
    $scope.csRegFormSubmitStatus = false
    $scope.showconsumerTbl = false
    $scope.disableButton = false;
    $scope.loadDistrcits = function () {
        $http.get("http://localhost:3000/landRoute/getDistricts")
            .then(function (response) {
                $scope.DistrictList = response.data;
            });
    }
    $scope.loadDistrcits();

    $scope.loadCrops = function () {
        $http.get("http://localhost:3000/landRoute/getCrops?ctg=" + $scope.ctg)
            .then(function (response) {
                $scope.allCrop = response.data;
            });
    }
    $scope.loadBlocks = function () {
        // console.log($scope.District1);
        if ($scope.District1 != null) {
            // console.log(1234444);
            $http.get("http://localhost:3000/landRoute/getBlocksOfDistrict/" + JSON.parse($scope.District1).districtCode)
                .then(function (response) {
                    $scope.BlockList = response.data;
                });
        }
    }

    $scope.loadGP = function () {
        $scope.Village = null;
        $scope.VillageList = null;
        if ($scope.Block != null) {
            $http.get("http://localhost:3000/landRoute/getGP/" + JSON.parse($scope.Block).blockCode)
                .then(function (response) {
                    $scope.GpList = response.data;
                });
        }
    }
    $scope.loadVillage = function () {
        if ($scope.GP != null) {
            $http.get("http://localhost:3000/landRoute/getVillage/" + JSON.parse($scope.GP).gpCode)
                .then(function (response) {
                    $scope.VillageList = response.data;
                });
        }
    }


    $scope.getFrmIdOfFigLdr = function (farmerId) {
        if (farmerId != null) {
            $http.get('https://mkuy.apicol.nic.in/api/FarmerData?farmerID=' + farmerId).then(function (response) {
                if (response.data.VCHFARMERNAME != null && response.data.VCHMOBILENO != null) {
                    $scope.farmerId = farmerId
                    $scope.leaderName = response.data.VCHFARMERNAME
                    $scope.leaderMobNo = response.data.VCHMOBILENO1
                    $scope.hiddenLeaderMobNO = response.data.VCHMOBILENO
                }
                else {
                    $scope.hiddenLeaderMobNO = ''
                }
            })
        }
    }

    $scope.figRegCheck = function () {
        let data = {
            figName: $scope.figName,
            noOfFarmers: $scope.noOfFarmers,
            district: JSON.parse($scope.District).districtName,
            distCode: JSON.parse($scope.District).districtCode,
            block: JSON.parse($scope.Block).blockName,
            blockCode: JSON.parse($scope.Block).blockCode,
            gp: JSON.parse($scope.GP).gpName,
            gpCode: JSON.parse($scope.GP).gpCode,
            village: JSON.parse($scope.village).villageName,
            villageCode: JSON.parse($scope.village).villageCode,
            leaderName: $scope.leaderName,
            leaderId: $scope.farmerId,
            leaderMobNo: $scope.leaderMobNo,
            fpo: $scope.fpo,
            password: $scope.psw

        }

        $scope.figDetails = data
        $scope.figDetails.password = (sha512($scope.figDetails.password))

        // $http.post('http://localhost:3000/landRoute/figRegCheck', data)
        //     .then(function (response) {
        //         $scope.figExists = response.data
        //         if ($scope.figExists.regExists != true) {
        //             let mob = {
        //                 mobNo: $scope.leaderMobNo
        //             }
        //             $http.post('http://localhost:3000/landRoute/sendOTP', mob).then(
        //                 function (response1) {
        //                     if (response1) {
        //                         $scope.figRegProceed()
        //                     }
        //                 }
        //             )

        //         }
        //     })
    }


    $scope.figRegSubmit = function () {

        let data = {
            otp: $scope.receivedOTP,
            figData: $scope.figDetails
        }
        $http.post('http://localhost:3000/landRoute/otpVerify', data).then(
            function (response1) {
                if (response1.data.status == 1) {
                    $scope.postfigRegStatus = true
                    $scope.otpError = false
                    $scope.figRegProceed()
                    $scope.figName = ''
                    $scope.noOfFarmers = ''
                    $scope.District = ''
                    $scope.Block = ''
                    $scope.GP = ''
                    $scope.village = ''
                    $scope.leaderId = ''
                    $scope.leaderMobNo = ''
                    $scope.psw = ''
                    $scope.fpo = ''
                    $scope.frmIdOfFigLdr = ''
                    $scope.hiddenLeaderMobNO = ''
                    $timeout(function () { $scope.postfigRegStatus = false }, 3000);

                }
                if (response1.data.status == 'otpError') {
                    $scope.otpError = true
                    // $scope.figRegProceed()
                }
            }
        )
    }

    $scope.figRegProceed = function () {
        if ($scope.showFigRegForm == true) {
            $scope.showFigRegForm = false
        } else {
            $scope.showFigRegForm = true
        }
    }

    $scope.searchFarmer = function () {
        $scope.correctFarmerID = false;
        $scope.otpSectionAll = false;
        if ($scope.farmerId != null) {
            $http.get('https://mkuy.apicol.nic.in/api/FarmerData?farmerID=' + $scope.farmerId).then(function (response) {
                $scope.fetchedFarmerData = response.data
                if (!$scope.fetchedFarmerData.ErrorMessage) {
                    $scope.frmHiddenMob = response.data.VCHMOBILENO.substring(response.data.VCHMOBILENO.length - 4)
                    $http.get('http://localhost:3000/landRoute/getVlgForFrmrReg/' + $scope.fetchedFarmerData.LGDVillageCode)
                        .then(function (response1) {
                            $scope.fetchedFarmerData.address = response1.data
                            $scope.showFarmerTbl = true
                            $scope.otpSectionAll = true;
                        })
                }
                else {
                    $scope.correctFarmerID = true;
                    $scope.otpSectionAll = false;
                }
            })
        }
    }
    $scope.sendOtpToFarmer = function () {
        // $scope.fetchedFarmerData.VCHMOBILENO
        let mobNo = {
            mobNO: $scope.fetchedFarmerData.VCHMOBILENO
        }
        $http.post('http://localhost:3000/landRoute/sendOTPForFarmerReg', mobNo).then(
            function (response1) {
                if (response1) {
                    $scope.showOtpSec = true
                } else {
                    $scope.showOtpSec = false
                }
            }
        )
    }
    $scope.frmrOtpSubmit = function (frmOtp) {
        let otp = {
            frmOtp: frmOtp
        }
        $http.post('http://localhost:3000/landRoute/otpVerifyForFrmEnroll', otp)
            .then(function (response) {
                if (response.data.status == true) {
                    $scope.showSecondFrmerScrn();
                    $scope.getCropData()
                    $scope.allFpos = []
                } else {
                    $scope.otpError1 = true
                    $timeout(function () { $scope.otpError1 = false }, 5000);
                }
            })
    }

    $scope.getCropData = function () {
        $http.get('http://localhost:3000/landRoute/getCropData')
            .then(function (response) {
                if (response.data) {
                    $scope.cropData = response.data
                }
            })
    }

    $scope.commoditiesPushToAry = function () {
        if ($scope.ctg && $scope.crop) {
            let data = {
                season: $scope.ctg,
                cropName: $scope.crop
            }
            $scope.frmrCropArry.push(data)
            $scope.ctg = ''
            $scope.crop = ''
        }
    }


    $scope.showSecondFrmerScrn = function () {
        if ($scope.showFrmrRegScrn == true) {
            $scope.showFrmrRegScrn = false
        } else {
            $scope.showFrmrRegScrn = true
        }
    }

    $scope.cropPushToAry = function () {
        let data = {
            season: $scope.frmSeason,
            cropCode: JSON.parse($scope.frmCrop).Crop_Code,
            cropName: JSON.parse($scope.frmCrop).Crop_Name,
            area: $scope.frmArea
        }
        $scope.frmrCropArry.push(data)
        $scope.frmSeason = ''
        $scope.frmCrop = ''
        $scope.frmArea = ''
    }

    $scope.removeCropFromArray = function (x) {
        $scope.frmrCropArry.splice(x, 1);
    }

    $scope.getFpoOrFigList = function (type) {
        if (type == 'FPO') {
            $scope.getAllFpos()
        }
        if (type == 'FIG') {
            $scope.getAllFigs()
        }
    }

    $scope.getAllFigs = function () {
        $http.get('http://localhost:3000/landRoute/getAllFigs')
            .then(function (response) {
                $scope.allFigNames = response.data
            })
    }

    $scope.getAllFpos = function () {
        $http.get('http://localhost:3000/landRoute/getAllFpos')
            .then(function (response) {
                $scope.allFpos = response.data
            })
    }

    $scope.getAllFpos();

    $scope.getAllFposFromDist = function (dist) {
        // console.log($scope.frmDist);
        $http.get('http://localhost:3000/landRoute/getAllFposFromDist/' + JSON.parse($scope.frmDist).districtCode)
            .then(function (response) {
                $scope.allFpos = response.data
            })
    }
    $scope.submitFarmerReg = function () {
        let data = {
            fullFarmerData: $scope.fetchedFarmerData,
            farmerId: $scope.fetchedFarmerData.NICFARMERID,
            farmerName: $scope.fetchedFarmerData.VCHFARMERNAME,
            gender: $scope.fetchedFarmerData.GENDER,
            farmerForwardsTo: $scope.forwardTo,
            farmerSelectDist: JSON.parse($scope.frmDist),
            additionalData: JSON.parse($scope.fpoOrFigName),
            cropData: $scope.frmrCropArry
        }
        $http.post('http://localhost:3000/landRoute/submitFarmerReg', data)
            .then(function (response) {
                if (response.data.status == 1) {
                    $scope.farmerRegStatus = true
                    $scope.fetchedFarmerData = ''
                    $scope.frmFig = ''
                    $scope.frmSeason = ''
                    $scope.frmCrop = ''
                    $scope.frmCro = ''
                    $scope.frmArea = ''
                    $scope.frmrCropArry = []
                    $scope.showSecondFrmerScrn()
                    $scope.showFarmerTbl = false
                    $timeout(function () { $scope.farmerRegStatus = false }, 3000)


                } else if (response.data.status == 'exists') {
                    $scope.farmerRegExists = true
                    $timeout(function () { $scope.farmerRegExists = false }, 3000)
                } else {
                    $scope.farmerRegErr = false
                    $timeout(function () { $scope.farmerRegErr = false }, 3000)
                }
            })
    }

    $scope.counter = function () {
        $http.get("http://localhost:3000/landRoute/media")
            .then(function (response) {
                $scope.mediaDetail = response.data
                $scope.videoUrl = "https://www.youtube.com/embed/l0bpy857deM?autoplay=1&enablejsapi=1";
                $scope.thumbnail = "assets/images/img4.jpg";
                $scope.mediaId = "md001";
            });
    }
    $scope.counter();
    $scope.playVideo = function (x) {
        console.log(x);
        $scope.videoUrl = "https://www.youtube.com/embed/" + x.url + "?autoplay=1&enablejsapi=1";
        $scope.thumbnail = x.thumbnail;
        $scope.mediaId = x.mediaId;

        $('.yvideo').each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });
    }


    // ===================================Fpo profile Line chart====================================

    // var dps = [{ x: 1, y: 10 }, { x: 2, y: 13 }, { x: 3, y: 18 }, { x: 4, y: 20 }, { x: 5, y: 17 }, { x: 6, y: 10 }, { x: 7, y: 13 }, { x: 8, y: 18 }, { x: 9, y: 20 }, { x: 10, y: 17 }];
    // var chartOptions = {

    //     data: [{
    //         type: "line",
    //         dataPoints: dps
    //     }]
    // };
    // var chart = new CanvasJS.Chart("chartContainer", chartOptions);
    // chart.render();


    $scope.fpoDetailsForScroll = function () {
        $http.get("http://localhost:3000/landRoute/fpoDetailsForScroll")
            .then(function (response) {
                $scope.fpoDataForScroll = response.data
            });
    }
    $scope.fpoDetailsForScroll()

    $scope.getAllSchemes = function () {
        $http.get('http://localhost:3000/landRoute/getAllSchemes').then(function (response) {
            $scope.allSchemes = response.data
            // console.log( $scope.allSchemes ,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        })
    }

    $scope.getAllSchemes()

    $scope.getAllSchemesOdia = function () {
        $http.get('http://localhost:3000/landRoute/getAllSchemesOdia').then(function (response) {
            $scope.allSchemesOdia = response.data
        })
    }

    $scope.getAllSchemesOdia()


    $scope.getAllDepartmentsForSchemes = function () {
        $http.get('http://localhost:3000/landRoute/getAllDepartmentsForSchemes').then(function (response) {
            $scope.allDepartmentsForSchemes = response.data
            $scope.getAllDepartmentsForSchemes = function () {
                $http.get('http://localhost:3000/landRoute/getAllDepartmentsForSchemes').then(function (response) {
                    $scope.allDepartmentsForSchemes = response.data
                })
            }
        })
    }
    $scope.getAllDepartmentsForSchemes()

    $scope.getAllBeneficiaryTypes = function () {
        $http.get('http://localhost:3000/landRoute/getAllBeneficiaryTypes').then(function (response) {
            $scope.allBeneficiaryTypes = response.data
            $scope.getAllBeneficiaryTypes = function () {
                $http.get('http://localhost:3000/landRoute/getAllBeneficiaryTypes').then(function (response) {
                    $scope.allBeneficiaryTypes = response.data
                })
            }
        })
    }
    $scope.getAllBeneficiaryTypes()

    $scope.getSchemeAccToDepartment = function () {
        // console.log('hii');
        $http.get('http://localhost:3000/landRoute/getSchemeAccToDepartment/' + $scope.selectedDepartment + '/' + $scope.selectedBeneficiary).then(function (response) {
            $scope.allSchemes = response.data
            $scope.getSchemeAccToDepartment = function () {
                // console.log('hii');
                $http.get('http://localhost:3000/landRoute/getSchemeAccToDepartment/' + $scope.selectedDepartment + '/' + $scope.selectedBeneficiary).then(function (response) {
                    $scope.allSchemes = response.data
                })
            }
        })
    }

    // $scope.getCurrentLocation=function(){
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function(position){
    //           $scope.$apply(function(){
    //             // $scope.position = position;
    //             console.log(85,position);
    //           });
    //         });
    //       }
    //  }
    //  $scope.getCurrentLocation()


    //=====================================================    leaflet Location setting starts======================================================

    $scope.getallAgroCordinates = function () {
        // console.log(1, $scope.locationOfKsk);
        if ($scope.locationOfKsk == true) {
            return new Promise(callback => {
                $http.get('https://mkuy.apicol.nic.in/api/apicol/GetAgroData').then(function (response) {
                    callback(response)
                })
            })
        }
        if ($scope.locationOfKsk == undefined) {
            return new Promise(callback => {
                $http.get('https://mkuy.apicol.nic.in/api/apicol/GetAgroData').then(function (response) {
                    callback(response)
                })
            })
        }
    }

    $scope.getAllFpoLocations = function () {
        // console.log(2, $scope.locationOfFpo);

        if ($scope.locationOfFpo == true) {
            return new Promise(callback => {
                $http.get('http://localhost:3000/landRoute/getAllFpoLocations').then(function (response) {
                    callback(response)
                })
            })
        }
        if ($scope.locationOfFpo == undefined) {
            return new Promise(callback => {
                $http.get('http://localhost:3000/landRoute/getAllFpoLocations').then(function (response) {
                    callback(response)
                })
            })
        }
    }

    var newMap
    $scope.fetchLocation = function () {
        const geoposition = { latitude: 0, longitude: 0 }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                geoposition.latitude = position.coords.latitude
                geoposition.longitude = position.coords.longitude
                var container = L.DomUtil.get('newMap');
                if (newMap == null || newMap == undefined) {
                    newMap = L.map('newMap').setView([20.9517, 85.0985], 6.5);
                } else {
                    newMap.remove();
                    newMap = L.map('newMap').setView([20.9517, 85.0985], 6.5);
                }
                // var newMap = L.map('newMap').setView([20.9517, 85.0985], 6.5);


                const attribution = ''
                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                const tiles = L.tileLayer(tileUrl, { attribution }).addTo(newMap)
                // L.geoJSON(odishaData);
                L.geoJSON(odishaData).addTo(newMap)
                // L.geoJSON(odishaData).addTo(newMap);
                L.circle([geoposition.latitude, geoposition.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 30000
                }).addTo(newMap);

                var blueIcon = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                    //shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

                    //iconSize: [38, 48], // size of the icon
                    //shadowSize:   [50, 64], // size of the shadow
                    //iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    //shadowAnchor: [4, 62],  // the same for the shadow
                    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                if ($scope.locationOfKsk == true) {

                    L.marker([]);
                    const allAgroCordinates = await $scope.getallAgroCordinates()
                    if (allAgroCordinates) {
                        $scope.markerArray = []
                        allAgroCordinates?.data.forEach(element => {
                            let mark = L.marker([element.Latitude, element.Longitude], { icon: blueIcon }).addTo(newMap).on('mouseover', function (e) {
                                mark.bindPopup(`Name: ${element.Applicant_Name}<br>District: ${element.DistrictName}<br>Address:${element.PermanentAddress}`).openPopup();
                                $scope.markerArray.push(mark)
                            })
                        });
                    }
                }
                if ($scope.locationOfKsk == undefined && $scope.locationOfFpo == undefined) {
                    L.marker([]);
                    const allAgroCordinates = await $scope.getallAgroCordinates()
                    if (allAgroCordinates) {
                        $scope.markerArray = []
                        allAgroCordinates?.data.forEach(element => {
                            let mark = L.marker([element.Latitude, element.Longitude], { icon: blueIcon }).addTo(newMap).on('mouseover', function (e) {
                                mark.bindPopup(`Name: ${element.Applicant_Name}<br>District: ${element.DistrictName}<br>Address:${element.PermanentAddress}`).openPopup();
                                $scope.markerArray.push(mark)
                            })
                        });
                    }
                }

                var redIcon = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                    //shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

                    //iconSize: [38, 48], // size of the icon
                    //shadowSize:   [50, 64], // size of the shadow
                    //iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    //shadowAnchor: [4, 62],  // the same for the shadow
                    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                if ($scope.locationOfFpo == true) {
                    L.marker([]);
                    const allFpoCordinates = await $scope.getAllFpoLocations()

                    if (allFpoCordinates) {
                        allFpoCordinates?.data.forEach(element => {
                            let mark = L.marker([element.FPOData.fpoLatitude, element.FPOData.fpoLongitude], { icon: redIcon }).addTo(newMap).on('mouseover', function (e) {
                                mark.bindPopup(`Name: ${element.fpoName}<br>District: ${element.FPOData.district}<br>Address:${element.FPOData.address}`).openPopup();
                            })
                        })
                    }
                }
                if ($scope.locationOfFpo == undefined && $scope.locationOfKsk == undefined) {
                    L.marker([]);
                    const allFpoCordinates = await $scope.getAllFpoLocations()

                    if (allFpoCordinates) {
                        allFpoCordinates?.data.forEach(element => {
                            let mark = L.marker([element.FPOData.fpoLatitude, element.FPOData.fpoLongitude], { icon: redIcon }).addTo(newMap).on('mouseover', function (e) {
                                mark.bindPopup(`Name: ${element.fpoName}<br>District: ${element.FPOData.district}<br>Address:${element.FPOData.address}`).openPopup();
                            })
                        })
                    }
                }

                // L.flyTo(geoposition.latitude, geoposition.longitude, 10, { animate: true })
                // currentLocation.bindPopup(`District: ${element.DistrictName}<br>Name: ${element.Applicant_Name}`).openPopup()

            });
        } else {
            $scope.getAllElseCordinates()
        }
    }

    $scope.fetchLocation()

    $scope.getLocationAccToCheckbox = function () {
        $scope.fetchLocation()
    }

    $scope.getAllElseCordinates = async () => {
        var newMap = L.map('newMap').setView([20.9517, 85.0985], 1);
        const attribution = '&copy;<a href="https://www.openstreetmap.org/copyright"></a>'
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        const tiles = L.tileLayer(tileUrl, { attribution }).addTo(newMap)
        // L.geoJSON(odishaData);
        L.geoJSON(odishaData).addTo(newMap)
        // L.geoJSON(odishaData).addTo(newMap);

        const allAgroCordinates = await $scope.getallAgroCordinates()
        if (allAgroCordinates) {
            allAgroCordinates?.data.forEach(element => {
                let mark = L.marker([element.Latitude, element.Longitude]).addTo(newMap).on('mouseover', function (e) {
                    mark.bindPopup(`Name: ${element.Applicant_Name}<br>District: ${element.DistrictName}<br>Address:${element.PermanentAddress}`).openPopup();
                })
            });
        }

        const allFpoCordinates = await $scope.getAllFpoLocations()
        var redIcon = L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
            //shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

            iconSize: [38, 48], // size of the icon
            //shadowSize:   [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        if (allFpoCordinates) {
            allFpoCordinates?.data.forEach(element => {
                let mark = L.marker([element.FPOData.fpoLatitude, element.FPOData.fpoLongitude], { icon: redIcon }).addTo(newMap).on('mouseover', function (e) {
                    mark.bindPopup(`Name: ${element.fpoName}<br>District: ${element.FPOData.district}<br>Address:${element.FPOData.address}`).openPopup();
                })
            })
        }

        // L.marker([19.8048, 85.8179]).addTo(newMap)
        // L.marker([19.7950, 85.8237]).addTo(newMap)
    }

    //=====================================================    leaflet Location setting ends======================================================

    // =====================================================CG Registration start ========================================================
    $scope.cgFormSubmit = function () {
        let x = JSON.parse($scope.District1);
        let cgData = {
            // groupRegType: $scope.groupRegType,
            groupRegType: "ConsumerGroup",
            cgMobNo: $scope.cgMobNo,
            cgName: $scope.CGName,
            cgNoc: $scope.noOfConsumers,
            cgMail: $scope.Cgmail,
            cgAltMail: $scope.Cgmail1,
            cgAltMob: $scope.cgMobNo1,
            cgPlot: $scope.plot,
            cgLndmark: $scope.landmark,
            cgDistName: x.districtName,
            cgDistCode: x.districtCode,
            cgCity: $scope.city,
            cgState: $scope.state,
            cgPin: $scope.pin,
            cgCtg: $scope.ctg,
            cropData: $scope.frmrCropArry,
            password: sha512($scope.cgPassword),
            reEnteredpassword: sha512($scope.reEnteredpassword)
        }
        $http.post('http://localhost:3000/landRoute/cgFormSubmit', cgData).then(function (response) {
            if ($scope.cgPassword == $scope.reEnteredpassword) {
                if (response.data.status > 0) {
                    // $scope.cgData.$setPristine();
                    $scope.ctg = ''
                    $scope.cgPassword = ''
                    $scope.reEnteredpassword = ''
                    $scope.cgMobNo = ''
                    $scope.CGName = ''
                    $scope.noOfConsumers = ''
                    $scope.Cgmail = ''
                    $scope.Cgmail1 = ''
                    $scope.cgMobNo1 = ''
                    $scope.plot = ''
                    $scope.landmark = ''
                    x.districtName = ''
                    x.districtCode = ''
                    $scope.city = ''
                    $scope.state = ''
                    $scope.pin = ''
                    $scope.ctg = ''
                    $scope.crop = ''
                    $scope.frmrCropArry = []
                    $scope.cgFormSubmitStatus = true
                    $scope.showCGRegForm2 = false
                    $scope.showCGRegForm3 = true
                    $scope.cgRegUserId = response.data.userId
                    $scope.CgOtp = ''
                    $timeout(function () { $scope.cgFormSubmitStatus = false, $scope.showCGRegForm2 = true }, 60000);


                }
            }
            else {
                alert("password doesnot match");
            }

        })
    }
    $scope.cgRegistrationFormSubmit = function () {
        let x = JSON.parse($scope.District2);
        let cgRegData = {
            cgDistName: x.districtName,
            cgDistCode: x.districtCode,
            consumerGroup: $scope.Cs,
            consumerName: $scope.csName,
            consumerMail: $scope.Csmail,
            consumerMobilenumber: $scope.csMobNo,
            consumerAltmobno: $scope.csMobNo1,
            consumerPlot: $scope.plot1,
            consumerLandmark: $scope.landmark1,
            consumerCity: $scope.city1,
            consumerState: $scope.state1,
            consumerPin: $scope.pin1,
            password: $scope.pw1,
            confirmPassword: $scope.pw2
        }
        $http.post('http://localhost:3000/landRoute/consumerRegFormSubmit', cgRegData).then(function (response) {
            if (response.data.insertedCount > 0) {
                $scope.csRegFormSubmitStatus = true
                $scope.csRegFormSubmitStatus = true
                $scope.District2 = ''
                $scope.Cs = ''
                $scope.csName = ''
                $scope.consumerName = ''
                $scope.Csmail = ''
                $scope.csMobNo = ''
                $scope.csMobNo1 = ''
                $scope.plot1 = ''
                $scope.Block = ''
                $scope.landmark1 = ''
                $scope.city1 = ''
                $scope.state1 = ''
                $scope.pin1 = ''
                $scope.pw1 = ''
                $scope.pw2 = ''
                $scope.showconsumerTbl = false
                $timeout(function () { $scope.csRegFormSubmitStatus = false }, 60000);
            }
        })
    }
    $scope.sendOtptoCg = function () {
        $scope.disableButton = true;
        let cgMobNo = {
            cgMobNo: $scope.cgMobNo
        }
        $http.post('http://localhost:3000/landRoute/cgMobNoSubmit', cgMobNo).then(function (response) {
            $scope.csRegFormSubmitStatus = response.data.status
            if ($scope.csRegFormSubmitStatus == 'matched') {
                $scope.showOtp = true
                $scope.cgotp = false
            }
            $timeout(function () { $scope.csOTPStatus = false }, 3000);
        })
    }

    $scope.CGRegProceed = function () {
        $http.get('http://localhost:3000/landRoute/cgVerifyOtp/' + $scope.CgOtp).then(function (response) {
            $scope.otpError1 = false
            if (response.data.status == 'matched') {
                if ($scope.showCGRegForm == true && $scope.showCGRegForm1 == false && $scope.showCGRegForm2 == false) {
                    $scope.showOtp = false
                    $scope.showCGRegForm = false
                    $scope.showCGRegForm1 = true
                    $scope.showCGRegForm2 = false
                }
                else {
                    $scope.showCGRegForm = false
                    $scope.showCGRegForm1 = false
                    $scope.showCGRegForm2 = true
                }
            } else {
                $scope.otpError1 = true;
                $scope.CgOtp = ''
            }
        })
    }
    $scope.CGRegProceed1 = function () {
        if ($scope.showCGRegForm == false && $scope.showCGRegForm1 == true && $scope.showCGRegForm2 == false) {
            $scope.showCGRegForm = false
            $scope.showCGRegForm1 = false
            $scope.showCGRegForm2 = true
        }

    }
    $scope.CGRegBack = function () {
        if ($scope.showCGRegForm == false && $scope.showCGRegForm1 == true && $scope.showCGRegForm2 == false) {
            $scope.showCGRegForm = true
            $scope.cgotp = true
            $scope.showCGRegForm1 = false
            $scope.showCGRegForm2 = false
        }

    }
    $scope.CGRegBack1 = function () {
        if ($scope.showCGRegForm == false && $scope.showCGRegForm1 == false && $scope.showCGRegForm2 == true) {
            $scope.showCGRegForm = false
            $scope.showCGRegForm1 = true
            $scope.showCGRegForm2 = false
        }

    }
    $scope.CSRegProceed = function () {
        if ($scope.showCSRegForm == true && $scope.showCSRegForm1 == false && $scope.showCSRegForm2 == false) {
            $scope.showCSRegForm = false
            $scope.showCSRegForm1 = true
            $scope.showCSRegForm2 = false
        }
        else {
            $scope.showCSRegForm = false
            $scope.showCSRegForm1 = false
            $scope.showCSRegForm2 = true
        }

    }
    // $scope.CSRegProceed1 = function () {
    //     if ($scope.showCSRegForm1 == true && $scope.showCSRegForm == false && $scope.showCSRegForm2 == false) {
    //         $scope.showCSRegForm = false
    //         $scope.showCSRegForm1 = false
    //         $scope.showCSRegForm2 = true
    //     }
    // }
    $scope.CSRegBack = function () {
        if ($scope.showCSRegForm == false && $scope.showCSRegForm1 == true && $scope.showCSRegForm2 == false) {
            $scope.showCSRegForm = true
            $scope.cgotp = true
            $scope.showCSRegForm1 = false
            $scope.showCSRegForm2 = false

        }

    }
    $scope.CSRegBack1 = function () {
        if ($scope.showCSRegForm == false && $scope.showCSRegForm1 == false && $scope.showCSRegForm2 == true) {
            $scope.showCSRegForm = false
            $scope.showCSRegForm1 = true
            $scope.showCSRegForm2 = false
        }

    }

    // =====================================================CG Registration end ========================================================

    // ===========================================Consumer Registration start===============================================
    $scope.CSRegProceed = function () {
        if ($scope.showCSRegForm == true && $scope.showCSRegForm1 == false && $scope.showCSRegForm2 == false) {
            $scope.showCSRegForm = false
            $scope.showCSRegForm1 = true
            $scope.csotp = true

            $scope.showCSRegForm2 = false
            $scope.showstatusForm = false
        }
        else {
            $scope.showCSRegForm = false
            $scope.showCSRegForm1 = false
            $scope.showCSRegForm2 = true
        }

    }
    $scope.CSRegProceed1 = function () {
        $http.get('http://localhost:3000/landRoute/csVerifyOtp/' + $scope.CsOtp).then(function (response) {

            if (response.data.status == 'matched') {
                if ($scope.showCSRegForm1 == true && $scope.showCSRegForm == false && $scope.showCSRegForm2 == false) {
                    $scope.showCSRegForm = false
                    $scope.csotp = true
                    $scope.showOtp1 = false
                    $scope.showCSRegForm1 = false
                    $scope.showCSRegForm2 = true
                    $scope.showstatusForm = false
                    $scope.csRegFormSubmitStatus = false
                }
            }
        })

    }
    $scope.CSRegBack = function () {
        if ($scope.showCSRegForm == false && $scope.showCSRegForm1 == true && $scope.showCSRegForm2 == false) {
            $scope.showCSRegForm = true
            $scope.csotp = true
            $scope.showOtp1 = false
            $scope.showCSRegForm1 = false
            $scope.showCSRegForm2 = false

        }

    }
    $scope.CSRegBack1 = function () {
        if ($scope.showCSRegForm == false && $scope.showCSRegForm1 == false && $scope.showCSRegForm2 == true) {
            $scope.showCSRegForm = false
            $scope.showCSRegForm1 = true
            $scope.csotp = true
            $scope.showCSRegForm2 = false
            $scope.showOtp1 = false
        }

    }

    $scope.csRegistrationFormSubmit = function () {
        let x = JSON.parse($scope.District2);
        let csRegData = {
            csDistName: x.districtName,
            csDistCode: x.districtCode,
            consumerGroup: $scope.Cs,
            consumerName: $scope.csName,
            consumerMail: $scope.Csmail,
            consumerMobilenumber: $scope.csMobNo,
            consumerAltmobno: $scope.csMobNo1,
            consumerAltemailID: $scope.csmail1,
            consumerPlot: $scope.plot1,
            Block: $scope.Block,
            consumerLandmark: $scope.landmark1,
            consumerCity: $scope.city1,
            consumerState: $scope.state1,
            consumerPin: $scope.pin1,
            password: (sha512($scope.pw1)),
            confirmPassword: $scope.pw2
        }
        $http.post('http://localhost:3000/landRoute/csRegFormSubmit', csRegData).then(function (response) {
            if (response.data.status > 0) {
                $scope.csRegFormSubmitStatus = true
                $scope.showCSRegForm1 = true
                $scope.showOtp1 = false
                $scope.showCSRegForm2 = false
                $scope.consumerId = response.data.consumerId
                $scope.District2 = ''
                $scope.Cs = ''
                $scope.csName = ''
                $scope.consumerName = ''
                $scope.Csmail = ''
                $scope.csMobNo = ''
                $scope.csMobNo1 = ''
                $scope.plot1 = ''
                $scope.Block = ''
                $scope.landmark1 = ''
                $scope.city1 = ''
                $scope.state1 = ''
                $scope.pin1 = ''
                $scope.pw1 = ''
                $scope.pw2 = ''
                $scope.showconsumerTbl = false
                // $timeout(function () { $scope.csRegFormSubmitStatus = false }, 10000);
            }
        })
    }
    $scope.sendOtptoCs = function () {
        let csMobNo = {
            csMobNo: $scope.csMobNo
        }
        $http.post('http://localhost:3000/landRoute/csMobNoSubmit', csMobNo).then(function (response) {
            $scope.csRegFormSubmitStatus = response.data.status
            if ($scope.csRegFormSubmitStatus == 'matched') {
                $scope.showOtp1 = true
                $scope.csotp = false
            }
            $timeout(function () { $scope.csOTPStatus = false }, 3000);
        })
    }

    $scope.getConsumerallData = function () {
        $scope.showconsumerTbl = false
        $http.get('http://localhost:3000/landRoute/getallConsumerdata/' + JSON.parse($scope.District2).districtCode)
            .then(function (response) {
                if (response.data) {
                    $scope.consumerallData = response.data
                }
            })
    }
    // $scope.consumerallData();

    $scope.loadconsumerGroup = function () {
        // console.log($scope.Cs );
        $http.get("http://localhost:3000/landRoute/getConsumerdata/" + $scope.Cs)
            .then(function (response) {
                $scope.getConsumerdata = response.data;
                $scope.showconsumerTbl = true
            });
    }

    // ===========================================Consumer Registration end===============================================

    // =========================================Trader Registration start==============================

    $scope.sendOtptoTrader = function () {
        $scope.disableButton = true;
        let traderMobNo = {
            traderMobNo: $scope.traderMobNo
        }

        $http.post('http://localhost:3000/landRoute/sendOtptoTrader', traderMobNo).then(function (response) {
            $scope.traderRegFormSubmitStatus = response.data.status
            if (response.data.status == 'matched') {
                $scope.showOtpForTrader = true
                $scope.traderotp = false
            }
            // $timeout(function () { $scope.csOTPStatus = false }, 3000);
        })
    }

    $scope.showTraderRegForm = true
    $scope.otpErrorForTrader = false
    $scope.showTraderRegForm1 = false

    $scope.traderRegProceed = function () {
        $http.get('http://localhost:3000/landRoute/traderVerifyOtp/' + $scope.traderOtp).then(function (response) {

            if (response.data.status == 'matched') {
                if ($scope.showTraderRegForm == true && $scope.showTraderRegForm1 == false) {
                    $scope.otpErrorForTrader = false
                    $scope.showTraderRegForm = false
                    $scope.showOtpForTrader = false
                    $scope.showTraderRegForm1 = true
                }
                else {
                    $scope.showTraderRegForm = true
                    $scope.showTraderRegForm1 = false
                    $scope.otpErrorForTrader = false
                }
            }
            else {
                $scope.otpErrorForTrader = true

            }
        })


    }

    $scope.traderRegBack = function () {
        if ($scope.showTraderRegForm == true && $scope.showTraderRegForm1 == false) {
            $scope.otpErrorForTrader = false
            $scope.showTraderRegForm == false
            $scope.showTraderRegForm1 == true
        }
        else {
            $scope.showTraderRegForm == true
            $scope.showTraderRegForm1 == false
            $scope.otpErrorForTrader = false
        }
    }
    $scope.traderDist
    $scope.traderFormSubmitStatus = false
    $scope.traderPassword
    $scope.traderFormSubmit = function () {
        let x = JSON.parse($scope.District1);
        let cgData = {
            groupRegType: 'Trader',
            cgMobNo: $scope.traderMobNo,
            traderName: $scope.traderName,
            // cgNoc: $scope.noOfConsumers,
            panNo: $scope.traderPanNo,
            traderMail: $scope.traderMail,
            traderAltMail: $scope.traderAltMail,
            traderAltMob: $scope.traderAltMob,
            traderPlot: $scope.traderPlot,
            traderLandmark: $scope.traderLandmark,
            traderDist: x.traderDist,
            traderDistCode: x.districtCode,
            traderBlock: $scope.traderBlock,
            traderState: $scope.traderState,
            traderPin: $scope.traderPin,
            traderCtg: $scope.traderCtg,
            password: sha512($scope.traderPassword),
            reTraderEnteredpassword: sha512($scope.reTraderEnteredpassword)

        }
        $http.post('http://localhost:3000/landRoute/traderFormSubmit', cgData).then(function (response) {
            if ($scope.traderPassword == $scope.reTraderEnteredpassword) {

                if (response.data.status > 0) {
                    $scope.traderFormSubmitStatus = true
                    $scope.traderRegUserId = response.data.userId
                    $scope.showTraderRegForm2 = true
                    $scope.reTraderEnteredpassword = ''

                    $scope.traderName = ''
                    $scope.traderPanNo = ''
                    $scope.traderMail = ''
                    $scope.traderMobNo = ''
                    $scope.traderAltMail = ''
                    $scope.traderAltMob = ''
                    $scope.traderOtp = ''
                    $scope.traderState = ''
                    $scope.District1 = ''
                    $scope.traderDistCode = ''
                    $scope.traderBlock = ''
                    $scope.traderPlot = ''
                    $scope.traderLandmark = ''
                    $scope.traderPin = ''
                    $scope.traderPassword = ''
                    $timeout(function () {
                        $scope.showTraderRegForm2 = false

                        $scope.traderFormSubmitStatus = false
                        $scope.showTraderRegForm = false
                        $scope.showTraderRegForm1 = false
                        showTraderRegForm2 = true
                        $scope.otpErrorForTrader = false
                        groupRegType = ''
                        cgMobNo = ''
                    }, 60000);
                }
            }

        })
    }


    $scope.fpoName
    $scope.fpoContactNo
    $scope.FpoDistrictList
    $scope.FpoBlockList
    $scope.FpoGPList
    $scope.FpovillageList
    $scope.FpoDistrict
    $scope.FpoBlock
    $scope.FpoGP
    $scope.Fpovillage
    $scope.fpoEmail
    $scope.cinNumber
    $scope.fpoFormSubmitStatus = false;
    $scope.showOtp5 = false
    $scope.FPOotp1 = true
    $scope.FPOotp
    $scope.otpErrorForFpo = false

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



    $scope.loadFpoGP = function () {
        $scope.Fpovillage = null;
        $scope.FpovillageList = null;
        if ($scope.FpoBlock != null) {
            $http.get("http://localhost:3000/landRoute/getGP/" + JSON.parse($scope.FpoBlock).blockCode)
                .then(function (response) {
                    $scope.FpoGPList = response.data;
                });
        }
    }
    $scope.loadFpoVillage = function () {
        if ($scope.FpoGP != null) {
            $http.get("http://localhost:3000/landRoute/getVillage/" + JSON.parse($scope.FpoGP).gpCode)
                .then(function (response) {
                    $scope.FpovillageList = response.data;
                });
        }
    }

    $scope.FPORegistrationFormSubmit = function () {
        let fpoRegData = {
            fpoName: $scope.fpoName,
            fpoContactNo: $scope.fpoContactNo,
            fpoMail: $scope.fpoEmail,
            districtCode: JSON.parse($scope.FpoDistrict).districtCode,
            districtName: JSON.parse($scope.FpoDistrict).districtName,
            blockCode: JSON.parse($scope.FpoBlock).blockCode,
            blockName: JSON.parse($scope.FpoBlock).blockName,
            gpCode: JSON.parse($scope.FpoGP).gpCode,
            gpName: JSON.parse($scope.FpoGP).gpName,
            villageCode: $scope.Fpovillage.villageCode,
            villageName: $scope.Fpovillage.villageName,
            cinNo: $scope.regNoOfFPO,
            FPOotp: $scope.FPOotp
        }
        $http.post('http://localhost:3000/landRoute/fpoRegFormSubmit', fpoRegData).then(function (response) {
            // console.log(response.data.res.response);
            if (response.data.status == 'mismatch') {
                $scope.otpErrorForFpo = true
            }
            if (response.data.res.response > 0) {
                console.log(response.data, "FPO");
                $scope.fpoFormSubmitStatus = true
                $scope.FpoRefNo = response.data.res.response2


                $scope.fpoFormSubmitStatus = true
                $scope.fpoName = ''
                $scope.FpoDistrictList = ''
                $scope.FpoBlockList = ''
                $scope.FpoGPList = ''
                $scope.FpovillageList = ''
                $scope.FpoDistrict = ''
                $scope.FpoBlock = ''
                $scope.FpoGP = ''
                $scope.Fpovillage = ''
                $scope.fpoEmail = ''
                $scope.cinNumber = ''

                $scope.FPORegForm = false
                $scope.FpoForm1 = true

                $timeout(function () {
                    $scope.FPORegForm = true
                    $scope.fpoFormSubmitStatus = false

                    $scope.FPOotp1 = true
                    $scope.FPOotp = ''
                    $scope.otpErrorForFpo = false


                }, 60000);
                $scope.showOtp5 = false
                $scope.fpoContactNo = ''
            }
            if (response.data.status == 'mismatch') {
                $scope.otpErrorForFpo = true
            }
        })
    }
    $scope.sendOtptoFPO = function () {
        $scope.disablenum = true
        let fpoContactNo = {
            fpoContactNo: $scope.fpoContactNo
        }
        $http.post('http://localhost:3000/landRoute/sendOtptoFPO', fpoContactNo).then(function (response) {
            $scope.fpoFormSubmitStatus = response.data.status
            if ($scope.fpoFormSubmitStatus == 'sent') {
                $scope.fpoFormSubmitStatus = false
                $scope.showOtp5 = true
                $scope.FPOotp1 = false
            }
            $timeout(function () { $scope.fpoOTPStatus = false }, 3000);
        })
    }

    // =======================================================Circular Navigation============================================
    $scope.WhyFpo = function () {
        console.log('hii');
    }

    $scope.schemeSelectAll = function (x) {
        if ($scope.selectedDepartment == 'selectAll' || $scope.selectedDepartment == 'Others') {
            $scope.selectedDepartment = undefined
            $scope.viewDetail1 = undefined
            $scope.viewSubScheme = false;
        } else {

            if (x != undefined) {
                $scope.selectedDepartment = x.concernedDepartment;
            }
            $http.get('http://localhost:3000/landRoute/schemedetailView?concernedDepartment=' + $scope.selectedDepartment).then(function (response) {
                $scope.schemedetailView = response.data;
                if ($scope.schemedetailView[0].detail != undefined) {
                    $scope.viewDetail1 = $scope.schemedetailView[0].detail[0];
                    if ($scope.schemedetailView[0].detail.length > 1) {
                        $scope.viewSubScheme = true;
                    } else {
                        $scope.viewSubScheme = false;
                    }
                } else {
                    $scope.viewDetail1 = undefined
                    $scope.viewSubScheme = false;

                }

            })
        }
    }

    $scope.subScheemeSelect = function (x) {
        if (x.selectedSubScheme == "2") {
            $scope.viewDetail1 = $scope.schemedetailView[0].detail[1];
        } else {
            $scope.viewDetail1 = $scope.schemedetailView[0].detail[0];
        }
    }

    $scope.odia = function () {
        if ($scope.language == "Odia") {
            window.location.href = "http://localhost:3000/odia";
        }
        else {
            window.location.href = "https://fpoodisha.nic.in";
        }
    };


    // $http.get("/api/getcircularNotice")
    $http.get("http://localhost:3000/landRoute/getcircularNotice/")
        .then(function (response) {
            $scope.circularDetails = response.data;
            // console.log($scope.circularDetails, "$scope.circularDetails$scope.circularDetails");
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });


    $http.get("http://localhost:3000/landRoute/getFpoDetailsIndex/")
        .then(function (response) {
            $scope.fpoDetailsIndex = response.data;
            // console.log($scope.fpoDetailsIndex, "$scope.fpoDetailsIndex$scope.fpoDetailsIndex");
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });


    $http.get("http://localhost:3000/landRoute/getDetatilsForOdisha/")
        .then(function (response) {
            $scope.Odisha = response.data;
            $scope.totalFarmer = $scope.Odisha[0].totalFarmer
        // console.log($scope.Odisha,"iuyu8989899");

        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });



    $http.get("http://localhost:3000/landRoute/getDetatilsForMayurbhanj/")
        .then(function (response) {
            $scope.Mayurbhanj = response.data;
            $scope.totalFpoMayurbhanj = $scope.Mayurbhanj[0].totalFpoMayurbhanj
            $scope.totalFarmerMayurbhanj = $scope.Mayurbhanj[0].totalFarmerMayurbhanj
            $scope.totalBlocksMayurbhanj = $scope.Mayurbhanj[0].totalBlocksMayurbhanj
            $scope.totalVillageCoveredMayurbhanj = $scope.Mayurbhanj[0].totalVillageCoveredMayurbhanj
            // $scope.totalFarmer = $scope.Mayurbhanj[0].totalFarmer

            // console.log($scope.List, "$scope.List$scope.List");
        });

        
        $http.get("http://localhost:3000/landRoute/getDetatilsForSundargarh/")
        .then(function (response) {
            $scope.Sundargarh = response.data;
            $scope.totalFpoSundargarh = $scope.Sundargarh[0].totalFpoSundargarh
            $scope.totalFarmerSundargarh = $scope.Sundargarh[0].totalFarmerSundargarh
            $scope.totalBlocksSundargarh = $scope.Sundargarh[0].totalBlocksSundargarh
            $scope.totalVillageCoveredSundargarh = $scope.Sundargarh[0].totalVillageCoveredSundargarh

        });


        $http.get("http://localhost:3000/landRoute/getDetatilsForKeonjhar/")
        .then(function (response) {
            $scope.Keonjhar = response.data;
            $scope.totalFpoKeonjhar = $scope.Keonjhar[0].totalFpoKeonjhar
            $scope.totalFarmerKeonjhar = $scope.Keonjhar[0].totalFarmerKeonjhar
            $scope.totalBlocksKeonjhar = $scope.Keonjhar[0].totalBlocksKeonjhar
            $scope.totalVillageCoveredKeonjhar = $scope.Keonjhar[0].totalVillageCoveredKeonjhar

        });

        $http.get("http://localhost:3000/landRoute/getDetatilsForKandhamal/")
        .then(function (response) {
            $scope.Kandhamal = response.data;
            $scope.totalFpoKandhamal = $scope.Kandhamal[0].totalFpoKandhamal
            $scope.totalFarmerKandhamal = $scope.Kandhamal[0].totalFarmerKandhamal
            $scope.totalBlocksKandhamal = $scope.Kandhamal[0].totalBlocksKandhamal
            $scope.totalVillageCoveredKandhamal = $scope.Kandhamal[0].totalVillageCoveredKandhamal

        });


        $http.get("http://localhost:3000/landRoute/getDetatilsForGanjam/")
        .then(function (response) {
            $scope.Ganjam = response.data;
            $scope.totalFpoGanjam = $scope.Ganjam[0].totalFpoGanjam
            $scope.totalFarmerGanjam = $scope.Ganjam[0].totalFarmerGanjam
            $scope.totalBlocksGanjam = $scope.Ganjam[0].totalBlocksGanjam
            $scope.totalVillageCoveredGanjam = $scope.Ganjam[0].totalVillageCoveredGanjam
            
        });

        $http.get("http://localhost:3000/landRoute/getDetatilsForKalahandi/")
        .then(function (response) {
            $scope.Kalahandi = response.data;
            $scope.totalFpoKalahandi = $scope.Kalahandi[0].totalFpoKalahandi
            $scope.totalFarmerKalahandi = $scope.Kalahandi[0].totalFarmerKalahandi
            $scope.totalBlocksKalahandi = $scope.Kalahandi[0].totalBlocksKalahandi
            $scope.totalVillageCoveredKalahandi = $scope.Kalahandi[0].totalVillageCoveredKalahandi
            
        });

        $http.get("http://localhost:3000/landRoute/getDetatilsForKoraput/")
        .then(function (response) {
            $scope.Koraput = response.data;
            $scope.totalFpoKoraput = $scope.Koraput[0].totalFpoKoraput
            $scope.totalFarmerKoraput = $scope.Koraput[0].totalFarmerKoraput
            $scope.totalBlocksKoraput = $scope.Koraput[0].totalBlocksKoraput
            $scope.totalVillageCoveredKoraput = $scope.Koraput[0].totalVillageCoveredKoraput
            
        });

        $http.get("http://localhost:3000/landRoute/getDetatilsForAnugul/")
        .then(function (response) {
            $scope.Anugul = response.data;
            $scope.totalFpoAnugul = $scope.Anugul[0].totalFpoAnugul
            $scope.totalFarmerAnugul = $scope.Anugul[0].totalFarmerAnugul
            $scope.totalBlocksAnugul = $scope.Anugul[0].totalBlocksAnugul
            $scope.totalVillageCoveredAnugul = $scope.Anugul[0].totalVillageCoveredAnugul
            
        });

        $http.get("http://localhost:3000/landRoute/getDetatilsForSambalpur/")
        .then(function (response) {
            $scope.Sambalpur = response.data;
            $scope.totalFpoSambalpur = $scope.Sambalpur[0].totalFpoSambalpur
            $scope.totalFarmerSambalpur = $scope.Sambalpur[0].totalFarmerSambalpur
            $scope.totalBlocksSambalpur = $scope.Sambalpur[0].totalBlocksSambalpur
            $scope.totalVillageCoveredSambalpur = $scope.Sambalpur[0].totalVillageCoveredSambalpur
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForNabarangpur/")
        .then(function (response) {
            $scope.Nabarangpur = response.data;
            $scope.totalFpoNabarangpur = $scope.Nabarangpur[0].totalFpoNabarangpur
            $scope.totalFarmerNabarangpur = $scope.Nabarangpur[0].totalFarmerNabarangpur
            $scope.totalBlocksNabarangpur = $scope.Nabarangpur[0].totalBlocksNabarangpur
            $scope.totalVillageCoveredNabarangpur = $scope.Nabarangpur[0].totalVillageCoveredNabarangpur
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForRayagada/")
        .then(function (response) {
            $scope.Rayagada = response.data;
            $scope.totalFpoRayagada = $scope.Rayagada[0].totalFpoRayagada
            $scope.totalFarmerRayagada = $scope.Rayagada[0].totalFarmerRayagada
            $scope.totalBlocksRayagada = $scope.Rayagada[0].totalBlocksRayagada
            $scope.totalVillageCoveredRayagada = $scope.Rayagada[0].totalVillageCoveredRayagada
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForBargarh/")
        .then(function (response) {
            $scope.Bargarh = response.data;
            $scope.totalFpoBargarh = $scope.Bargarh[0].totalFpoBargarh
            $scope.totalFarmerBargarh = $scope.Bargarh[0].totalFarmerBargarh
            $scope.totalBlocksBargarh = $scope.Bargarh[0].totalBlocksBargarh
            $scope.totalVillageCoveredBargarh = $scope.Bargarh[0].totalVillageCoveredBargarh
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForBalangir/")
        .then(function (response) {
            $scope.Balangir = response.data;
            $scope.totalFpoBalangir = $scope.Balangir[0].totalFpoBalangir
            $scope.totalFarmerBalangir = $scope.Balangir[0].totalFarmerBalangir
            $scope.totalBlocksBalangir = $scope.Balangir[0].totalBlocksBalangir
            $scope.totalVillageCoveredBalangir = $scope.Balangir[0].totalVillageCoveredBalangir
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForDhenkanal/")
        .then(function (response) {
            $scope.Dhenkanal = response.data;
            $scope.totalFpoDhenkanal = $scope.Dhenkanal[0].totalFpoDhenkanal
            $scope.totalFarmerDhenkanal = $scope.Dhenkanal[0].totalFarmerDhenkanal
            $scope.totalBlocksDhenkanal = $scope.Dhenkanal[0].totalBlocksDhenkanal
            $scope.totalVillageCoveredDhenkanal = $scope.Dhenkanal[0].totalVillageCoveredDhenkanal
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForBalasore/")
        .then(function (response) {
            $scope.Balasore = response.data;
            $scope.totalFpoBalasore = $scope.Balasore[0].totalFpoBalasore
            $scope.totalFarmerBalasore = $scope.Balasore[0].totalFarmerBalasore
            $scope.totalBlocksBalasore = $scope.Balasore[0].totalBlocksBalasore
            $scope.totalVillageCoveredBalasore = $scope.Balasore[0].totalVillageCoveredBalasore
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForKhordha/")
        .then(function (response) {
            $scope.Khordha = response.data;
            $scope.totalFpoKhordha = $scope.Khordha[0].totalFpoKhordha
            $scope.totalFarmerKhordha = $scope.Khordha[0].totalFarmerKhordha
            $scope.totalBlocksKhordha = $scope.Khordha[0].totalBlocksKhordha
            $scope.totalVillageCoveredKhordha = $scope.Khordha[0].totalVillageCoveredKhordha
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForGajapati/")
        .then(function (response) {
            $scope.Gajapati = response.data;
            $scope.totalFpoGajapati = $scope.Gajapati[0].totalFpoGajapati
            $scope.totalFarmerGajapati = $scope.Gajapati[0].totalFarmerGajapati
            $scope.totalBlocksGajapati = $scope.Gajapati[0].totalBlocksGajapati
            $scope.totalVillageCoveredGajapati = $scope.Gajapati[0].totalVillageCoveredGajapati
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForNayagarh/")
        .then(function (response) {
            $scope.Nayagarh = response.data;
            $scope.totalFpoNayagarh = $scope.Nayagarh[0].totalFpoNayagarh
            $scope.totalFarmerNayagarh = $scope.Nayagarh[0].totalFarmerNayagarh
            $scope.totalBlocksNayagarh = $scope.Nayagarh[0].totalBlocksNayagarh
            $scope.totalVillageCoveredNayagarh = $scope.Nayagarh[0].totalVillageCoveredNayagarh
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForCuttack/")
        .then(function (response) {
            $scope.Cuttack = response.data;
            $scope.totalFpoCuttack = $scope.Cuttack[0].totalFpoCuttack
            $scope.totalFarmerCuttack = $scope.Cuttack[0].totalFarmerCuttack
            $scope.totalBlocksCuttack = $scope.Cuttack[0].totalBlocksCuttack
            $scope.totalVillageCoveredCuttack = $scope.Cuttack[0].totalVillageCoveredCuttack
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForBoudh/")
        .then(function (response) {
            $scope.Boudh = response.data;
            $scope.totalFpoBoudh = $scope.Boudh[0].totalFpoBoudh
            $scope.totalFarmerBoudh = $scope.Boudh[0].totalFarmerBoudh
            $scope.totalBlocksBoudh = $scope.Boudh[0].totalBlocksBoudh
            $scope.totalVillageCoveredBoudh = $scope.Boudh[0].totalVillageCoveredBoudh
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForMalkangiri/")
        .then(function (response) {
            $scope.Malkangiri = response.data;
            $scope.totalFpoMalkangiri = $scope.Malkangiri[0].totalFpoMalkangiri
            $scope.totalFarmerMalkangiri = $scope.Malkangiri[0].totalFarmerMalkangiri
            $scope.totalBlocksMalkangiri = $scope.Malkangiri[0].totalBlocksMalkangiri
            $scope.totalVillageCoveredMalkangiri = $scope.Malkangiri[0].totalVillageCoveredMalkangiri
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForDeogarh/")
        .then(function (response) {
            $scope.Deogarh = response.data;
            $scope.totalFpoDeogarh = $scope.Deogarh[0].totalFpoDeogarh
            $scope.totalFarmerDeogarh = $scope.Deogarh[0].totalFarmerDeogarh
            $scope.totalBlocksDeogarh = $scope.Deogarh[0].totalBlocksDeogarh
            $scope.totalVillageCoveredDeogarh = $scope.Deogarh[0].totalVillageCoveredDeogarh
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForKendrapada/")
        .then(function (response) {
            $scope.Kendrapada = response.data;
            $scope.totalFpoKendrapada = $scope.Kendrapada[0].totalFpoKendrapada
            $scope.totalFarmerKendrapada = $scope.Kendrapada[0].totalFarmerKendrapada
            $scope.totalBlocksKendrapada = $scope.Kendrapada[0].totalBlocksKendrapada
            $scope.totalVillageCoveredKendrapada = $scope.Kendrapada[0].totalVillageCoveredKendrapada
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForJajpur/")
        .then(function (response) {
            $scope.Jajpur = response.data;
            $scope.totalFpoJajpur = $scope.Jajpur[0].totalFpoJajpur
            $scope.totalFarmerJajpur = $scope.Jajpur[0].totalFarmerJajpur
            $scope.totalBlocksJajpur = $scope.Jajpur[0].totalBlocksJajpur
            $scope.totalVillageCoveredJajpur = $scope.Jajpur[0].totalVillageCoveredJajpur
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForNuapada/")
        .then(function (response) {
            $scope.Nuapada = response.data;
            $scope.totalFpoNuapada = $scope.Nuapada[0].totalFpoNuapada
            $scope.totalFarmerNuapada = $scope.Nuapada[0].totalFarmerNuapada
            $scope.totalBlocksNuapada = $scope.Nuapada[0].totalBlocksNuapada
            $scope.totalVillageCoveredNuapada = $scope.Nuapada[0].totalVillageCoveredNuapada
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForBhadrak/")
        .then(function (response) {
            $scope.Bhadrak = response.data;
            $scope.totalFpoBhadrak = $scope.Bhadrak[0].totalFpoBhadrak
            $scope.totalFarmerBhadrak = $scope.Bhadrak[0].totalFarmerBhadrak
            $scope.totalBlocksBhadrak = $scope.Bhadrak[0].totalBlocksBhadrak
            $scope.totalVillageCoveredBhadrak = $scope.Bhadrak[0].totalVillageCoveredBhadrak
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForPuri/")
        .then(function (response) {
            $scope.Puri = response.data;
            $scope.totalFpoPuri = $scope.Puri[0].totalFpoPuri
            $scope.totalFarmerPuri = $scope.Puri[0].totalFarmerPuri
            $scope.totalBlocksPuri = $scope.Puri[0].totalBlocksPuri
            $scope.totalVillageCoveredPuri = $scope.Puri[0].totalVillageCoveredPuri
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForSonepur/")
        .then(function (response) {
            $scope.Sonepur = response.data;
            $scope.totalFpoSonepur = $scope.Sonepur[0].totalFpoSonepur
            $scope.totalFarmerSonepur = $scope.Sonepur[0].totalFarmerSonepur
            $scope.totalBlocksSonepur = $scope.Sonepur[0].totalBlocksSonepur
            $scope.totalVillageCoveredSonepur = $scope.Sonepur[0].totalVillageCoveredSonepur
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForJagatsinghpur/")
        .then(function (response) {
            $scope.Jagatsinghpur = response.data;
            $scope.totalFpoJagatsinghpur = $scope.Jagatsinghpur[0].totalFpoJagatsinghpur
            $scope.totalFarmerJagatsinghpur = $scope.Jagatsinghpur[0].totalFarmerJagatsinghpur
            $scope.totalBlocksJagatsinghpur = $scope.Jagatsinghpur[0].totalBlocksJagatsinghpur
            $scope.totalVillageCoveredJagatsinghpur = $scope.Jagatsinghpur[0].totalVillageCoveredJagatsinghpur
            
        });
        $http.get("http://localhost:3000/landRoute/getDetatilsForJharsuguda/")
        .then(function (response) {
            $scope.Jharsuguda = response.data;
            $scope.totalFpoJharsuguda = $scope.Jharsuguda[0].totalFpoJharsuguda
            $scope.totalFarmerJharsuguda = $scope.Jharsuguda[0].totalFarmerJharsuguda
            $scope.totalBlocksJharsuguda = $scope.Jharsuguda[0].totalBlocksJharsuguda
            $scope.totalVillageCoveredJharsuguda = $scope.Jharsuguda[0].totalVillageCoveredJharsuguda
            
        });
        




});


app.directive("allowNumbersOnly", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^0-9.]/g, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };





});
