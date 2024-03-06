const { response } = require('express')
var ex = require('express')
var router = ex.Router()
var model = require('../../Model/FPO/updateFPO')
const path = require("path")
const fs = require('fs');
const { log } = require('util')

router.get('/updateFpoData/:fpoId', (req, res) => {
    model.updateFpoData(req.params.fpoId, (response) => {
        res.send(response)
    })
})
router.get('/getFpoDetails/:fpoId', (req, res) => {
    model.getFpoDetails(req.params.fpoId, (response) => {
        res.send(response)
    })
})
router.post('/uploadBODList', (req, res) => {
    model.uploadBODList(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddBoarddirectors', (req, res) => {
    model.AddBoarddirectors(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateBoardDirectors', (req, res) => {
    model.updateBoardDirectors(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteBoardDirectors', (req, res) => {
    model.deleteBoardDirectors(req.body, (response) => {
        res.send(response)
    })
})



router.post('/AddStaffDetails', (req, res) => {
    model.AddStaffDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateStaffDetails', (req, res) => {
    model.updateStaffDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteStaffDetails', (req, res) => {
    model.deleteStaffDetails(req.body, (response) => {
        res.send(response)
    })
})


router.get('/cropDataOfFpo/:fpoId', (req, res) => {
    model.cropDataOfFpo(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.post('/updateEnum', (req, res) => {
    model.updateEnumData(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/updatefpoDetails', (req, res) => {
    model.updatefpoDetails(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/farmerDetailsSubmit', (req, res) => {
    model.farmerDetailsSubmit(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })

})


router.post('/deleteTrainingDetails', (req, res) => {
    model.deleteTrainingDetails(req.body, (response) => {
        res.send(response);
    })
})
// router.post('/deleteTrainingRow', (req, res) => {
//     model.deleteTrainingRow(req.body, (response) => {
//         res.send({ status: response })
//     })
// })

router.post('/businessActivityUpdate', (req, res) => {
    model.businessActivityUpdate(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/uploadBusinessFile', (req, res) => {
    model.uploadBusinessFile(req.body, (response) => {
        res.send(response)
    })
})

router.post('/totalBusinessDoneSubmit', (req, res) => {
    model.totalBusinessDoneSubmit(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})


router.post('/cropDetailsUpdate', (req, res) => {
    model.cropDetailsUpdate(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteCropListDetails', (req, res) => {
    model.deleteCropListDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/boardDirectorsDataSubmit', (req, res) => {
    model.boardDirectorsDataSubmit(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})


router.post('/detailsOfBoardDirectors', (req, res) => {
    model.detailsOfBoardDirectors(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})



router.post('/detailsOfScheme', (req, res) => {
    model.detailsOfScheme(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})


router.post('/detailsOfOtherScheme', (req, res) => {
    model.detailsOfOtherScheme(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/detailsOfCredScheme', (req, res) => {
    model.detailsOfCredScheme(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/staffDetailsUpdate', (req, res) => {
    model.staffDetailsUpdate(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})


router.post('/groupDetailsUpdate', (req, res) => {
    model.groupDetailsUpdate(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/businessExtraDetails', (req, res) => {
    model.businessExtraDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/InfrastructureDetail', (req, res) => {
    model.InfrastructureDetail(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/primaryBusinessDetailsUpdate', (req, res) => {
    // console.log("in router");
    model.primaryBusinessDetailsUpdate(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.post('/deleteRow7', (req, res) => {
    model.deleteRow7(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/secondaryBusinessDetailsUpdate', (req, res) => {
    model.secondaryBusinessDetailsUpdate(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteSecBusinessDetails', (req, res) => {
    model.deleteSecBusinessDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/licenseDetailsUpdate', (req, res) => {
    model.licenseDetailsUpdate(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})


router.post('/InfrastructureDetailUpdate', (req, res) => {
    model.InfrastructureDetailUpdate(req.body, (response) => {
        res.send({ status: response.modifiedCount })

    })
})
router.post('/storageDetailUpdate', (req, res) => {
    model.storageDetailUpdate(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteStorageDetails', (req, res) => {
    model.deleteStorageDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/accountDetailsSubmit', (req, res) => {
    // console.log(req.body,"ffffffffff");
    model.accountDetailsSubmit(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

router.get('/finYearDetails/:fpoId', (req, res) => {
    model.finYearDetails(req.params.fpoId, (response) => {
        res.send(response)
    })
})


router.post('/finYearDetailsUpdate', (req, res) => {
    model.finYearDetailsUpdate(req.body, (response) => {
        res.send({ status: response })
        // ////////console.log(response);
    })
})

router.post('/deleteFinDetails', (req, res) => {
    model.deleteFinDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/downloadPdf', (req, res) => {
    let tempDir = __dirname.slice(0, -3)
    let temp = tempDir.slice(0, -7)
    let dirName = temp + "/Model/FPO/turnOverReports/";
    let fileName = req.body.fpoId + "-" + req.body.finYear + ".pdf"
    let filePath = path.join(dirName, fileName);
    console.log(filePath, "filePath");
    fs.readFile(filePath, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        res.setHeader('Content-Length', result.length);
        res.send(result);
    });
    // model.downloadPdf(req.body, (response) => {
    //     res.send(response)
    // })
})

router.post('/schemesDetailsUpdate', (req, res) => {
    model.schemesDetailsUpdate(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/AddEquityData', (req, res) => {
    model.AddEquityData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddRecordData', (req, res) => {
    // console.log(req.body,"3333333");
    model.AddRecordData(req.body, (response) => {
        // console.log(response,"6666");
        res.send(response)
    })
})

router.post('/updateEquityData', (req, res) => {
    model.updateEquityData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteEquityDetails', (req, res) => {
    model.deleteEquityDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/AddCreditData', (req, res) => {
    model.AddCreditData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateCreditData', (req, res) => {
    model.updateCreditData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteCreditDetails', (req, res) => {
    model.deleteCreditDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/AddOtherData', (req, res) => {
    model.AddOtherData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateOtherData', (req, res) => {
    model.updateOtherData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteOtherDetails', (req, res) => {
    model.deleteOtherDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/AddLicenseData', (req, res) => {
    model.AddLicenseData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateLicenseData', (req, res) => {
    model.updateLicenseData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteLicenseDetails', (req, res) => {
    model.deleteLicenseDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/AddOtherLicenseData', (req, res) => {
    model.AddOtherLicenseData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateOtherLicenseData', (req, res) => {
    model.updateOtherLicenseData(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteOtherLicenseDetails', (req, res) => {
    model.deleteOtherLicenseDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/AddPrimaryBusinessDetails', (req, res) => {
    model.AddPrimaryBusinessDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updatePrimaryBusinssDetails', (req, res) => {
    model.updatePrimaryBusinssDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deletePrimaryBusinessDetails', (req, res) => {
    model.deletePrimaryBusinessDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/addInfrastructureDetails', (req, res) => {
    model.addInfrastructureDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateInfrastructureDetails', (req, res) => {
    model.updateInfrastructureDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteInfrastructureDetails', (req, res) => {
    model.deleteInfrastructureDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/addQualityControlDetails', (req, res) => {
    model.addQualityControlDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateQualityControlDetails', (req, res) => {
    model.updateQualityControlDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteQualityControlDetails', (req, res) => {
    model.deleteQualityControlDetails(req.body, (response) => {
        res.send(response)
    })
})


router.post('/addCollectionCenterDetails', (req, res) => {
    model.addCollectionCenterDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateCollectionCenterDetails', (req, res) => {
    console.log(req.body,"aaaaaaaaaaaaaaaaaaaaaaaaa");
    model.updateCollectionCenterDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteCollectionCenterDetails', (req, res) => {
    model.deleteCollectionCenterDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddTieupsData', (req, res) => {

    model.AddTieupsData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateTieupsData', (req, res) => {
    model.updateTieupsData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteTieupsDetails', (req, res) => {
    model.deleteTieupsDetails(req.body, (response) => {
        res.send(response)
    })
})



router.post('/addFacilityCenterDetails', (req, res) => {
    model.addFacilityCenterDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/updateFacilityCenterDetails', (req, res) => {
    model.updateFacilityCenterDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteFacilityCenterDetails', (req, res) => {
    model.deleteFacilityCenterDetails(req.body, (response) => {
        res.send(response)
    })
})

router.get('/meetingDetailsFetch/:fpoId', (req, res) => {
    model.meetingDetailsFetch(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.post('/meetingDetailsUpdate', (req, res) => {
    model.meetingDetailsUpdate(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleteScheduleMeeting', (req, res) => {
    model.deleteScheduleMeeting(req.body, (response) => {
        res.send(response)
    })
})

router.get('/trainingDetailsFetch/:fpoId', (req, res) => {
    model.trainingDetailsFetch(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.post('/trainingDataUpdate', (req, res) => {
    model.trainingDataUpdate(req.body, (response) => {
        res.send(response)
        // ////////console.log(response);
    })
})


router.post('/schemesAvailedSubmit', (req, res) => {
    model.schemesAvailedSubmit(req.body, (response) => {
        res.send({ status: response.modifiedCount })
        // console.log(response);
    })
})

router.get('/fetchBankNames', (req, res) => {
    model.fetchBankNames((response) => {
        res.send(response)
    })
})

router.get('/fetchBranchName/:bankName', (req, res) => {
    model.fetchBranchName(req.params.bankName, (response) => {
        res.send(response)
    })
})

router.get('/fetchAwards/:fpoId', (req, res) => {
    model.fetchAwards(req.params.fpoId, (response) => {
        res.send(response)
    })
})

router.post('/awardUpdate', (req, res) => {
    model.awardUpdate(req.body, (response) => {
        res.send(response)
    })
})

router.post('/finalUploadFiles', (req, res) => {
    model.finalUploadFiles(req.body, (response) => {
        res.send({ status: response.modifiedCount })
    })
})

// router.post('/deleteRow1', (req, res) => {
//     model.deleteRow1(req.body, (response) => {
//         res.send({ status: response })
//     })
// })


router.post('/deleteRowBod', (req, res) => {
    model.deleteRowBod(req.body, (response) => {
        res.send({ status: response })
    })
})


router.post('/deleteRowStaff', (req, res) => {
    model.deleteRowStaff(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleteRowEquity', (req, res) => {
    model.deleteRowEquity(req.body, (response) => {
        res.send({ status: response })
    })
})


router.post('/deleteRowCredit', (req, res) => {
    model.deleteRowCredit(req.body, (response) => {
        res.send({ status: response })
    })
})




router.post('/deleteAwardDetails', (req, res) => {
    model.deleteAwardDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteRecordDetails', (req, res) => {
    model.deleteRecordDetails(req.body, (response) => {
        res.send(response)
    })
})

router.post('/deleteRowOther', (req, res) => {
    model.deleteRowOther(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleteRowfinYear', (req, res) => {
    model.deleteRowfinYear(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleterowInfra', (req, res) => {
    model.deleterowInfra(req.body, (response) => {
        res.send({ status: response })
    })
})

router.post('/deleteLicRow', (req, res) => {
    model.deleteLicRow(req.body, (response) => {
        res.send({ status: response })
    })
})

// router.post('/deleteRow3', (req, res) => {
//     //console.log(req.body.id,"req.body.id");
//     model.deleteRow3(req.body, (response) => {
//         res.send({ status: response })
//     })
// })

router.get('/getFpoContactForSendMessage', (req, res) => {
    model.getFpoContactForSendMessage((response) => {
        res.send(response)
    })
})

router.get('/fetchRecords/:fpoId', (req, res) => {
    model.fetchRecords(req.params.fpoId, (response) => {
        res.send(response)
    })
})


router.get('/finYearDetails1/:fpoId', (req, res) => {
    model.finYearDetails1(req.params.fpoId, (response) => {
        res.send(response)
    })
})
router.post('/finYearDetailsUpdate1', (req, res) => {
    model.finYearDetailsUpdate1(req.body, (response) => {
        res.send({ status: response })
    })
})
router.post('/deletePLDetails', (req, res) => {
    model.deletePLDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddRoCData', (req, res) => {
    model.AddRoCData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddKycData', (req, res) => {
    model.AddKycData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateKycData', (req, res) => {
    model.updateKycData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteKycDetails', (req, res) => {
    model.deleteKycDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddItrData', (req, res) => {
    model.AddItrData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateItrData', (req, res) => {
    model.updateItrData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteItrDetails', (req, res) => {
    model.deleteItrDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddAnnualAuditData', (req, res) => {
    model.AddAnnualAuditData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateAnnualAuditData', (req, res) => {
    model.updateAnnualAuditData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteAnnualAuditDetails', (req, res) => {
    model.deleteAnnualAuditDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateRoCData', (req, res) => {
    model.updateRoCData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteRoCDetails', (req, res) => {
    model.deleteRoCDetails(req.body, (response) => {
        res.send(response)
    })
})
router.post('/AddBusinessPlanData', (req, res) => {
    model.AddBusinessPlanData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateBusinessPlanData', (req, res) => {
    console.log(req.body,"dhbhdvjhdvgh");
    model.updateBusinessPlanData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteBusinessDetails', (req, res) => {
    model.deleteBusinessDetails(req.body, (response) => {
        res.send(response)
    })
}) 


router.post('/AddeNamData', (req, res) => {

    model.AddeNamData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/updateeNamData', (req, res) => {
    model.updateeNamData(req.body, (response) => {
        res.send(response)
    })
})
router.post('/deleteeNamDetails', (req, res) => {
    model.deleteeNamDetails(req.body, (response) => {
        res.send(response)
    })
})

//"min hour dayOfMonth * *" //this will run on 6th of every month at 12:10AM
// cron.schedule('10 0 6 * *', function (res) {
// var nodemailer = require('nodemailer')
// var cron = require('node-cron');
// cron.schedule('37 15 7 * *', function (res) {
//      // send mail 
//     //  const transporter = nodemailer.createTransport({
//     //     service: 'gmail',
//     //     auth: {
//     //         user: 'bikashp70@gmail.com',
//     //         pass: 'bikashp70'
//     //     }
//     // });
//     // const mailOptions = {
//     //     from: 'bikashp70@gmail.com',
//     //     to: 'bikashpradhan98@gmail.com',
//     //     subject: 'Welcome home',
//     //     text: 'Sending from FPO' 
//     // }
//     // console.log(transporter,"transporter");
//     model.getFpoContactForSendMessage((response) => {
//         console.log(response, "send sms");
//     })
// });

module.exports = router;