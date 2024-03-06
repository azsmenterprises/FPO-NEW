const { ObjectId } = require('bson')
var mongo = require('../mongo/mongo')
var newmongo = require('../mongo/newMongo')
const moment = require('moment')
const fs = require('fs');
const path = require("path")
exports.updateFpoData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data }, function (response) {
        // updateProfileDate(data);
        callback(response)
    })
}
exports.getFpoDetails = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data }, function (response) {
        // console.log(response,"response");
        callback(response)
    })
}

async function updateProfileDate(fpoId) {
    try {
        mongo.updateOne({ fpoId: fpoId }, { updatedOn: new Date() }, 'FPOmaster', function (response) {
            // callback(response)
        })
        return true
    } catch (error) {
        console.log(error);
    }
}

exports.uploadBODList = function (data, callback) {
    console.log(data, "data");
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        mongo.updatePush({ fpoId: data[i].fpoId }, { boardDirectorsDetails: element }, 'FPOmaster', function (response) {
            if (data.length == i + 1 && response) {
                console.log(data.length, "length");
                updateProfileDate(data.fpoCode);
                callback({ status: true, message: "Added Successfully" })
            }
        })
    }
}

exports.AddBoarddirectors = function (data, callback) {
    mongo.updatePush({ fpoId: data.fpoCode }, { boardDirectorsDetails: data }, 'FPOmaster', function (response) {
        if (response.modifiedCount > 0) {
            mongo.findOne('FPOmaster', { fpoId: data.fpoCode }, function (response) {
                // console.log(response.boardDirectorsDetails,"333");
                updateProfileDate(data.fpoCode);
                callback(response.boardDirectorsDetails)
            })
        }
    })
}

exports.updateBoardDirectors = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'boardDirectorsDetails.DIN': data.DIN }, function (response) {
        if (response) {
            // //console.log(boardDirectorsDetails.name,"responseBOD");
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'boardDirectorsDetails.DIN': data.DIN },
                {
                    'boardDirectorsDetails.$[e1].name': data.name,
                    'boardDirectorsDetails.$[e1].phNumber': data.phNumber,
                    'boardDirectorsDetails.$[e1].sex': data.sex,
                    'boardDirectorsDetails.$[e1].age': data.age,
                    "boardDirectorsDetails.$[e1].educationalQual": data.educationalQual,
                    'boardDirectorsDetails.$[e1].DIN': data.DIN,
                    'boardDirectorsDetails.$[e1].updatedform': data.updatedform = new Date(),
                }, { arrayFilters: [{ 'e1.DIN': data.DIN }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}
exports.deleteBoardDirectors = function (data, callback) {
    console.log(data, "data model ")
    mongo.update({ fpoId: data.fpoId }, { 'boardDirectorsDetails': { DIN: data.DIN } }, 'FPOmaster', function (response) {
        console.log(response, "response Deleted");
        updateProfileDate(data.fpoId);
        callback(response)
    })

}


exports.AddStaffDetails = function (data, callback) {
    mongo.updatePush({ fpoId: data.fpoCode }, { staffDetails: data }, 'FPOmaster', function (response) {
        if (response.modifiedCount > 0) {
            mongo.findOne('FPOmaster', { fpoId: data.fpoCode }, function (response) {
                // console.log(response.boardDirectorsDetails,"333");
                updateProfileDate(data.fpoCode);
                callback(response.staffDetails)
            })
        }
    })
}

exports.updateStaffDetails = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'staffDetails.emailId': data.emailId }, function (response) {
        if (response) {
            // //console.log(boardDirectorsDetails.name,"responseBOD");
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'staffDetails.emailId': data.emailId },
                {
                    'staffDetails.$[e1].name': data.name,
                    'staffDetails.$[e1].designation': data.designation,
                    'staffDetails.$[e1].contactNo': data.contactNo,
                    'staffDetails.$[e1].emailId': data.emailId,
                    "staffDetails.$[e1].educationalQual": data.educationalQual,
                    'staffDetails.$[e1].sex': data.sex,
                }, { arrayFilters: [{ 'e1.emailId': data.emailId }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteStaffDetails = function (data, callback) {
    // console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'staffDetails': { emailId: data.emailId } }, 'FPOmaster', function (response) {
        //    console.log(response,"response Deleted");
        updateProfileDate(data.fpoId);
        callback(response)
    })

}

exports.cropDataOfFpo = function (data, callback) {
    mongo.queryFindAll({ fpoId: data }, 'cropProduction', function (response) {
        updateProfileDate(data);
        callback(response)
    })
}

exports.updateEnumData = function (data, callback) {
    mongo.updateOne({ fpoId: data.fpoId }, { 'enumeratorData.enumName': data.enumData.name, 'enumeratorData.enumContactNo': data.enumData.contactNo, 'enumeratorData.surveyDate': data.enumData.dateOfSurvey, 'enumeratorData.fpoGPSdata': data.enumData.gpsCordinates }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })
}

exports.updatefpoDetails = function (data, callback) {
    // ////////console.log(123,data);
    mongo.updateOne({ fpoId: data.fpoId }, {
        // 'FPOData.state': data.fpoData.state,
        'FPOData.state': 'Odisha',
        'FPOData.district': data.fpoData.district,
        'FPOData.masterDistrictCode': data.fpoData.district.districtCode,
        'FPOData.subDivision': data.fpoData.subDivision,
        'FPOData.block': data.fpoData.block,
        'FPOData.masterBlockCode': data.fpoData.block_id,
        'FPOData.village': data.fpoData.village,
        'FPOData.villageCode': data.fpoData.masterVillageCode,
        'FPOData.masterVillageCode': data.fpoData.village.villageCode,
        'FPOData.gramPanchayat': data.fpoData.gramPanchayat,
        // 'FPOData.masterGramPanchayatCode': data.fpoData.gramPanchayat,
        'FPOData.noOfVillageCovered': data.fpoData.noOfVlgCovered,
        'FPOData.coveredVillagesName': data.fpoData.nameOfVillages,
        'FPOData.address': data.fpoData.address,
        'FPOData.separateOfcOfFPO': data.fpoData.separateOfcOfFPO,
        'FPOData.fpoOfficeType': data.fpoData.fpoOfficeType,
        'FPOData.storageFacility': data.fpoData.storageFacility,
        'FPOData.fpoStorageType': data.fpoData.fpoStorageType,
        'FPOData.imageOfOffice': data.fpoData.imageOfOffice,
        'FPOData.fpoName': data.fpoData.fpoName,
        'FPOData.yearOfFormation': data.fpoData.yearOfFormation,
        'FPOData.visionOfFPO': data.fpoData.visionOfFPO,
        'FPOData.fpoRegistrationStatus': data.fpoData.fpoRegistrationStatus,
        // 'FPOData.imgOfRegCerti': data.fpoData.imgOfRegCerti,
        'FPOData.formOfRegistration': data.fpoData.formOfRegistration,
        'FPOData.regNoOfFPO': data.fpoData.regNoOfFPO,
        'FPOData.dateOfReg': data.fpoData.dateOfReg,
        'FPOData.fpoContactNo': data.fpoData.fpoContactNo,
        'FPOData.fpoMailId': data.fpoData.fpoMailId,
        // 'FPOData.noOfFarmerMember': data.fpoData.noOfFarmerMember,
        // 'FPOData.noOfMaleFarmerMember': data.fpoData.noOfMaleFarmerMember,
        // 'FPOData.noOfFemaleFarmerMember': data.fpoData.noOfFemaleFarmerMember,
        // 'FPOData.noOfScStFarmerMember': data.fpoData.noOfScStFarmerMember,
        // 'FPOData.noOfSmallOrMarginalFarmer': data.fpoData.noOfSmallOrMarginalFarmer,
        // 'FPOData.shareCapitalRaisedAmount': data.fpoData.shareCapitalRaisedAmount,
        // 'FPOData.paidUpCapitalAmount': data.fpoData.paidUpCapitalAmount,
        // 'FPOData.shareCertificateIssueStatus': data.fpoData.shareCertificateIssueStatus,
        // 'FPOData.fpoBusinessActivity': data.fpoData.fpoBusinessActivity,
        'organisationHelpedToCreateSPO': data.fpoData.organisationHelpedToCreateSPO,
        'baselineSurvey': data.fpoData.baselineSurvey,
        'creationScheme': data.fpoData.creationScheme,
        'promotedByNGO': data.fpoData.promotedByNGO,
        'ngoName': data.fpoData.ngoName,
        'keyPersonContactNo': data.fpoData.keyPersonContactNo,
        'noOfBoardDirectors': data.fpoData.noOfBoardDirectors,
        'FPOData.Capacity': data.fpoData.Capacity,
        'FPOData.villageCoveredByFPO': data.fpoData.selectedVillage,
        'FPOData.noOfVillage': data.fpoData.noOfVillage,


    },
        'FPOmaster', function (response) {
            updateProfileDate(data.fpoId);
            callback(response)
        })
}

exports.farmerDetailsSubmit = function (data, callback) {


    if (data.moaDoc != "") {
        // Convert base64 to buffer
        const pdfBuffer = Buffer.from(data.moaDoc, 'base64');
        // Write buffer to file
        let tempDir = __dirname.slice(0, -3)
        let temp = tempDir.slice(0, -6)
        let dirName = temp + "/public/MOA_AOADocs";
        let fileName = "MOA-" + data.fpoId + ".pdf";
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
        let filePath = path.join(dirName, fileName);
        fs.writeFile(filePath, pdfBuffer, (err) => {
            if (err) {
                throw err;
            } else {
                console.log('PDF file saved successfully!');
            }
        });
        let tempFilePath = 'https://fpoodisha.nic.in/MOA_AOADocs/' + fileName;
        // let tempFilePath = 'https://fpoodisha.nic.in/MOA_AOADocs/' + fileName;
        data.MOAFilePath = tempFilePath;
        data.MOAFileUploaded = true;
        delete data.moaDoc;
    } else {
        data.MOAFilePath = "";
        data.MOAFileUploaded = false;
        delete data.moaDoc;
    }

    if (data.aoaDoc != "") {
        // Convert base64 to buffer
        const pdfBuffer = Buffer.from(data.aoaDoc, 'base64');
        // Write buffer to file
        let tempDir = __dirname.slice(0, -3)
        let temp = tempDir.slice(0, -6)
        let dirName = temp + "/public/MOA_AOADocs";
        let fileName = "AOA-" + data.fpoId + ".pdf";
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
        let filePath = path.join(dirName, fileName);
        fs.writeFile(filePath, pdfBuffer, (err) => {
            if (err) {
                throw err;
            } else {
                console.log('PDF file saved successfully!');
            }
        });
        let tempFilePath = 'https://fpoodisha.nic.in/MOA_AOADocs/' + fileName;
        // let tempFilePath = 'https://fpoodisha.nic.in/MOA_AOADocs/' + fileName;
        data.AOAFilePath = tempFilePath;
        data.AOAFileUploaded = true;
        delete data.aoaDoc;
    } else {
        data.AOAFilePath = "";
        data.AOAFileUploaded = false;
        delete data.aoaDoc;
    }

    mongo.updateOne({ fpoId: data.fpoId }, {
        'FPOData.year': data.year,
        'FPOData.noOfFarmerMember': data.noOfFarmerMember,
        'FPOData.noOfMaleFarmerMember': data.noOfMaleFarmerMember,
        'FPOData.totalshareCertificates': data.totalshareCertificates,
        'FPOData.totalFpoIssueDividends': data.totalFpoIssueDividends,
        'FPOData.rateOfLoan': data.rateOfLoan,
        'FPOData.noOfMaleFarmerMember1': data.noOfMaleFarmerMember1,
        'FPOData.noOfMaleFarmerMember2': data.noOfMaleFarmerMember2,
        'FPOData.noOfFemaleFarmerMember': data.noOfFemaleFarmerMember,
        'FPOData.noOfFemaleFarmerMember1': data.noOfFemaleFarmerMember1,
        'FPOData.noOfFemaleFarmerMember2': data.noOfFemaleFarmerMember2,
        'FPOData.noOfScStFarmerMember': data.noOfScStFarmerMember,
        'FPOData.noOfSmallOrMarginalFarmer': data.noOfSmallOrMarginalFarmer,
        'FPOData.NoOfFarmerMobilizedAsShareholders': data.NoOfFarmerMobilizedAsShareholders,
        'FPOData.shareCapitalRaisedAmount': data.shareCapitalRaisedAmount,
        'FPOData.paidUpCapitalAmount': data.paidUpCapitalAmount,
        'FPOData.shareCertificateIssueStatus': data.shareCertificateIssueStatus,
        'FPOData.MOAFileUploaded': data.MOAFileUploaded,
        'FPOData.MOAFilePath': data.MOAFilePath,
        'FPOData.AOAFileUploaded': data.AOAFileUploaded,
        'FPOData.AOAFilePath': data.AOAFilePath,
    },
        'FPOmaster', function (response) {
            updateProfileDate(data.fpoId);
            callback(response)
        })

}
// exports.farmerDetailsSubmit = function (data, callback) {
//     mongo.updateOne({ fpoId: data.fpoId }, {
//         'FPOData.noOfFarmerMember': data.fpoData.noOfFarmerMember,
//         'FPOData.noOfMaleFarmerMember': data.fpoData.noOfMaleFarmerMember,
//         'FPOData.noOfFemaleFarmerMember': data.fpoData.noOfFemaleFarmerMember,
//         'FPOData.noOfScStFarmerMember': data.fpoData.noOfScStFarmerMember,
//         'FPOData.noOfSmallOrMarginalFarmer': data.fpoData.noOfSmallOrMarginalFarmer,
//         'FPOData.NoOfFarmerMobilizedAsShareholders': data.fpoData.NoOfFarmerMobilizedAsShareholders,
//         'FPOData.shareCapitalRaisedAmount': data.fpoData.shareCapitalRaisedAmount,
//         'FPOData.paidUpCapitalAmount': data.fpoData.paidUpCapitalAmount,
//         'FPOData.shareCertificateIssueStatus': data.fpoData.shareCertificateIssueStatus,
//     },
//         'FPOmaster', function (response) {
//             updateProfileDate(data.fpoId);
//             callback(response)
//         })
// }


exports.businessActivityUpdate = function (data, callback) {
    console.log(data, "businessActivityUpdate");
    mongo.updateOne({ fpoId: data.fpoId }, {
        "businessActivities1920.businessActivities": data.form.businessActivities,
        "businessActivities1920.businessPlanFor2021": data.form.businessPlanFor2021,
        "businessActivities1920.haveYearPlan": data.form.haveYearPlan,
        "businessActivities1920.fpofilledRoc": data.form.fpofilledRoc,
        "businessActivities1920.tradingThroughenum": data.form.tradingThroughenum,
        "businessActivities1920.registrationEnum": data.form.registrationEnum,
        "businessActivities1920.statutoryAudit": data.form.statutoryAudit,
        "businessActivities1920.OthersIp": data.form.OtherIp,
        "businessActivities1920.businessFileUploaded": false,
    },
        'FPOmaster', function (response) {
            updateProfileDate(data.fpoId);
            callback(response)
        })
}

exports.uploadBusinessFile = async (data, callback) => {
    try {
        // console.log(data, "finYearDetails");

        if (data.businessFileFetchData) {
            // Convert base64 to buffer
            const pdfBuffer = Buffer.from(data.businessFileFetchData, 'base64');
            // Write buffer to file
            let tempDir = __dirname.slice(0, -3)
            let temp = tempDir.slice(0, -6)
            let dirName = temp + "/public/FpoBusinessFileReports";
            // let fileName = data.fpoId + data.year + ".pdf";
            let fileName = data.fpoId + ".pdf";
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName);
            }
            let filePath = path.join(dirName, fileName);
            fs.writeFile(filePath, pdfBuffer, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('PDF file saved successfully!');
                }
            });
            let tempFilePath = 'https://fpoodisha.nic.in/FpoBusinessFileReports/' + fileName;
            // let tempFilePath = 'https://fpoodisha.nic.in/FpoBusinessFileReports/' + fileName;
            data.businessFilePath = tempFilePath;
            // data.businessFileUploaded = true;
            delete data.businessFileFetchData;

        }
        //  else {
        //     data.businessFileUploaded = false;
        //     data.businessFilePath = "";
        //     delete data.businessFileFetchData;
        // }
        data.uploadedOn = new Date();
        mongo.updateOne({ fpoId: data.fpoId }, {
            "businessActivities1920.businessFileUploaded": true,
            "businessActivities1920.businessFilePath": data.businessFilePath,
            "businessActivities1920.uploadedOn": data.uploadedOn,
        },
            'FPOmaster', function (response) {
                // console.log(response,"modifiedCount");
                updateProfileDate(data.fpoId);
                callback(response)
            })
    } catch (e) {
        console.log(e, "error");
    }
}

exports.cropDetailsUpdate = function (data, callback) {
    //console.log(data,"cropdata");
    if (data.id) {
        mongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data.id) }, {
            year: data.year,
            season: data.season,
            cropCatagory: data.cropCatagory,
            cropName: data.cropName,
            cropType: data.cropType,
            variety: data.variety,
            productionArea: data.productionArea,
            quantity: data.quantity,

            Sowing: data.Sowing,
            Harvesting: data.Harvesting,
            transctionAmount: data.transctionAmount,
            saleStatus: data.saleStatus

        }, 'cropProduction', function (response) {
            if (response) {
                updateProfileDate(data.fpoId);
                callback({ status: true, message: "Updated successfully" })
                // ////////console.log(response.modifiedCount);
            } else {
                callback({ status: false, message: "Update unsuccessful" })
            }

        })
    } else {
        mongo.insertDocument({
            fpoId: data.fpoId,
            year: data.year,
            season: data.season,
            cropCatagory: data.cropCatagory,
            cropName: data.cropName,
            cropType: data.cropType,
            variety: data.variety,
            productionArea: data.productionArea,
            quantity: data.quantity,

            Sowing: data.Sowing,
            Harvesting: data.Harvesting,
            transctionAmount: data.transctionAmount,
            saleStatus: data.saleStatus
        }, 'cropProduction', function (response) {
            if (response?.insertedCount) {
                updateProfileDate(data.fpoId);
                callback({ status: true, message: "Added successfully" })
            } else {
                callback({ status: false, message: "Add unsuccessful" })
            }
        })
    }

}

exports.deleteCropListDetails = function (data, callback) {
    mongo.removeDocument({ _id: ObjectId(data._id), fpoId: data.fpoId }, 'cropProduction', function (response) {
        // console.log(response,"response");
        if (response.deletedCount == 1) {
            callback({ status: true, message: "Deleted successfully" })
        }
        else {
            callback({ status: false, message: "Delete unsuccessful" })
        }

    })

}

exports.boardDirectorsDataSubmit = function (data, callback) {
    mongo.updateOne({ fpoId: data.fpoId }, {
        // organisationHelpedToCreateSPO: data.boardDirectorsData.organisationHelpedToCreateSPO,
        // creationScheme: data.boardDirectorsData.creationScheme,
        // promotedByNGO: data.boardDirectorsData.promotedByNGO,
        // ngoName: data.boardDirectorsData.ngoName,
        // keyPersonContactNo: data.boardDirectorsData.keyPersonContactNo,
        noOfBoardDirectors: data.boardDirectorsData.noOfBoardDirectors
    }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })
}


exports.detailsOfBoardDirectors = function (data, callback) {
    // ////////console.log(data)
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'boardDirectorsDetails.name': data.sourceName }, function (response) {
        if (response) {
            // //console.log(boardDirectorsDetails.name,"responseBOD");
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'boardDirectorsDetails.name': data.sourceName },
                {
                    'boardDirectorsDetails.$[e1].name': data.name,
                    'boardDirectorsDetails.$[e1].phNumber': data.phNumber,
                    'boardDirectorsDetails.$[e1].sex': data.sex,
                    'boardDirectorsDetails.$[e1].age': data.age,
                    "boardDirectorsDetails.$[e1].educationalQual": data.educationalQual,
                    'boardDirectorsDetails.$[e1].DIN': data.DIN,
                    // 'boardDirectorsDetails.$[e1].panNo': data.panNo,
                    // 'boardDirectorsDetails.$[e1].IdNo': data.IdNo
                }, { arrayFilters: [{ 'e1.name': data.sourceName }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        } else {
            mongo.updatePush({ fpoId: data.fpoCode }, { boardDirectorsDetails: data }, 'FPOmaster', function (response2) {
                // ////////console.log(response2);
                updateProfileDate(data.fpoCode);
                callback(response2)
            })
        }
    })

}


exports.detailsOfScheme = function (data, callback) {
    //console.log(data.index,"data.index")
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'equityGrant.index': data.index }, function (response) {
        if (response) {
            // //console.log(response,"response");

            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'equityGrant.index': data.index },
                {
                    'equityGrant.$[e1].haveAvailedEquityGrant': data.haveAvailedEquityGrant,
                    'equityGrant.$[e1].nameOfOrg': data.nameOfOrg,
                    'equityGrant.$[e1].status': data.status,
                    'equityGrant.$[e1].Amount': data.Amount,
                    "equityGrant.$[e1].YearOfEquity": data.YearOfEquity,
                    "equityGrant.$[e1].PurposeOfGrantutilization": data.PurposeOfGrantutilization,
                    "equityGrant.$[e1].Purpose": data.Purpose3,

                    // 'boardDirectorsDetails.$[e1].panNo': data.panNo,
                    // 'boardDirectorsDetails.$[e1].IdNo': data.IdNo
                }, { arrayFilters: [{ 'e1.nameOfOrg': data.nameOfOrg }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        } else {
            mongo.updatePush({ fpoId: data.fpoCode }, { equityGrant: data }, 'FPOmaster', function (response2) {
                // ////////console.log(response2);
                updateProfileDate(data.fpoCode);
                callback(response2)
            })
        }
    })

}


exports.detailsOfCredScheme = function (data, callback) {
    //console.log(data.index,"data.index")
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'creditGrant.index': data.index }, function (response) {
        if (response) {
            // //console.log(response,"response");

            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'creditGrant.index': data.index },
                {
                    'creditGrant.$[e1].haveAvailedCreditGrant': data.haveAvailedCreditGrant,
                    'creditGrant.$[e1].nameOfOrg': data.nameOfOrg,
                    'creditGrant.$[e1].status': data.status,
                    'creditGrant.$[e1].Amount': data.Amount,
                    "creditGrant.$[e1].YearOfCreditavailed": data.YearOfCreditavailed,
                    "creditGrant.$[e1].Bankname": data.Bankname,
                    "creditGrant.$[e1].Purpose": data.Purpose3,

                    // 'boardDirectorsDetails.$[e1].panNo': data.panNo,
                    // 'boardDirectorsDetails.$[e1].IdNo': data.IdNo
                }, { arrayFilters: [{ 'e1.nameOfOrg': data.nameOfOrg }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        } else {
            mongo.updatePush({ fpoId: data.fpoCode }, { creditGrant: data }, 'FPOmaster', function (response2) {
                // ////////console.log(response2);
                updateProfileDate(data.fpoCode);
                callback(response2)
            })
        }
    })

}

exports.detailsOfOtherScheme = function (data, callback) {
    //console.log(data.index,"data.index")
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'otherScheme.index': data.index }, function (response) {
        if (response) {
            // //console.log(response,"response");

            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'otherScheme.index': data.index },
                {
                    'otherScheme.$[e1].schemeName': data.schemeName,
                    'otherScheme.$[e1].financialAid': data.financialAid,
                    'otherScheme.$[e1].financialAidType': data.financialAidType,
                    'otherScheme.$[e1].nameOfOrg': data.nameOfOrg,
                    'otherScheme.$[e1].status': data.status,
                    'otherScheme.$[e1].Amount': data.Amount,
                    "otherScheme.$[e1].Purpose1": data.Purpose1,
                    // "creditGrant.$[e1].Purpose": data.Purpose2,
                    // "creditGrant.$[e1].Purpose": data.Purpose3,

                    // 'boardDirectorsDetails.$[e1].panNo': data.panNo,
                    // 'boardDirectorsDetails.$[e1].IdNo': data.IdNo
                }, { arrayFilters: [{ 'e1.nameOfOrg': data.nameOfOrg }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        } else {
            mongo.updatePush({ fpoId: data.fpoCode }, { otherScheme: data }, 'FPOmaster', function (response2) {
                updateProfileDate(data.fpoCode);
                // ////////console.log(response2);
                callback(response2)
            })
        }
    })

}

exports.staffDetailsUpdate = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'staffDetails.name': data.sourceName }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'staffDetails.name': data.sourceName },
                {
                    'staffDetails.$[e1].name': data.name,
                    'staffDetails.$[e1].designation': data.designation,
                    'staffDetails.$[e1].contactNo': data.contactNo,
                    'staffDetails.$[e1].emailId': data.emailId,
                    "staffDetails.$[e1].sex": data.sex
                },
                { arrayFilters: [{ 'e1.name': data.sourceName }] },
                "FPOmaster", function (response) {
                    updateProfileDate(data.fpoCode);
                    callback(response);
                })
        } else {
            mongo.updatePush({ fpoId: data.fpoCode }, { staffDetails: data }, 'FPOmaster', function (response2) {
                updateProfileDate(data.fpoCode);
                // ////////console.log(response2);
                callback(response2)
            })
        }
    })

}

exports.groupDetailsUpdate = async (data, callback) => {
    try {
        let db = await newmongo.mongoConnection()
        let response = await newmongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'groupDetails.groupName': data.sourceGroupName }, db)
        if ('groupDetails' in response) {
            let response1 = await newmongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'groupDetails.groupName': data.sourceGroupName },
                {
                    'groupDetails.$[e1].groupName': data.groupName,
                    'groupDetails.$[e1].typeOfGroup': data.typeOfGroup,
                    'groupDetails.$[e1].noOfMembers': data.noOfMembers,
                    'groupDetails.$[e1].gramPanchyat': data.gramPanchyat,
                    "groupDetails.$[e1].village": data.village,
                    "groupDetails.$[e1].shareCapitalRaised": data.shareCapitalRaised
                },
                { arrayFilters: [{ 'e1.groupName': data.sourceGroupName }] },
                "FPOmaster", db)
            updateProfileDate(data.fpoCode);
            callback(response1);
            db.close()
        } else {
            let response2 = await newmongo.updatePush({ fpoId: data.fpoCode }, { groupDetails: data }, 'FPOmaster', db)
            updateProfileDate(data.fpoCode);
            callback(response2)
            db.close()
        }
    } catch (e) {
        ////////console.log('fpo update', e.message);
    }
    // mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'groupDetails.groupName': data.sourceGroupName }, function (response) {
    //     if (response) {
    //         mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'groupDetails.groupName': data.sourceGroupName },
    //             {
    //                 'groupDetails.$[e1].groupName': data.groupName,
    //                 'groupDetails.$[e1].typeOfGroup': data.typeOfGroup,
    //                 'groupDetails.$[e1].noOfMembers': data.noOfMembers,
    //                 'groupDetails.$[e1].gramPanchyat': data.gramPanchyat,
    //                 "groupDetails.$[e1].village": data.village,
    //                 "groupDetails.$[e1].shareCapitalRaised": data.shareCapitalRaised
    //             },
    //             { arrayFilters: [{ 'e1.groupName': data.sourceGroupName }] },
    //             "FPOmaster", function (response1) {
    //                 callback(response1);
    //             }
    //         )
    //     } else {
    //         mongo.updatePush({ fpoId: data.fpoCode }, { groupDetails: data }, 'FPOmaster', function (response2) {
    //             // ////////console.log(response2);
    //             callback(response2)
    //         })
    //     }
    // })

}


exports.businessExtraDetails = function (data, callback) {
    mongo.updateOne({ fpoId: data.fpoId }, { 'secondaryBusinessActiv': data.secondaryBusinessActiv, 'processingInfrastructure': data.processingInfrastructure, 'processingInfraDetails': data.processingInfraDetails, 'StorageFacility': data.StorageFacility }, 'FPOmaster', function (response) {
        if (response) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Updated successfully" })
        } else {
            callback({ status: false, message: "Update unsuccessful" })
        }

    })
}

exports.InfrastructureDetail = function (data, callback) {
    mongo.updateOne({ fpoId: data.fpoId }, { 'secondaryBusinessActiv': data.businessExtraDetail.secondaryBusinessActiv, 'processingInfrastructure': data.businessExtraDetail.processingInfrastructure, 'processingInfraDetails': data.businessExtraDetail.processingInfraDetails, '   InfraCapacity': data.businessExtraDetail.InfraCapacity }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })
}
exports.totalBusinessDoneSubmit = function (data, callback) {
    // ////////console.log(data);
    mongo.updateOne({ fpoId: data.fpoId }, { 'totalBusinessDone': data.totalBusinessDone }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })
}


exports.secondaryBusinessDetailsUpdate = function (data, callback) {
    console.log(data, "data ")
    if (data?.index >= 0) {
        mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'secondaryBusinessDetails.index': data.index }, function (response) {
            if (response) {
                mongo.updateWithArrayFilter({ fpoId: data.fpoId },
                    {
                        'secondaryBusinessDetails.$[e1].businessActivity': data.businessActivity,
                        'secondaryBusinessDetails.$[e1].productName': data.productName,
                        'secondaryBusinessDetails.$[e1].businessDetails': data.businessDetails,
                        'secondaryBusinessDetails.$[e1].quantitySold': data.quantitySold,
                        "secondaryBusinessDetails.$[e1].amount": data.amount,
                    }, { arrayFilters: [{ 'e1.index': data.index }] },
                    "FPOmaster", function (response1) {
                        if (response1) {
                            updateProfileDate(data.fpoId);
                            callback({ status: true, message: "Updated successfully" })
                        } else {
                            callback({ status: false, message: "Update unsuccessful" })
                        }
                    })
            }
        })
    } else {
        let aggrigation = [
            {
                '$match': {
                    fpoId: data.fpoId,
                    'secondaryBusinessDetails': { '$exists': true }
                }
            }, {
                '$unwind': '$secondaryBusinessDetails'
            },
            {
                '$project': {
                    '_id': 0,
                    'index': '$secondaryBusinessDetails.index'
                }
            },
            {
                '$sort': { 'index': -1 }
            }
        ]
        mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
            console.log(response.length, 'pppppppp');
            if (response.length > 0) {
                data.index = parseInt(response[0].index) + 1;
            } else {
                data.index = 0;
            }
            mongo.updatePush({ fpoId: data.fpoId }, { secondaryBusinessDetails: data }, 'FPOmaster', function (response2) {
                if (response2) {
                    updateProfileDate(data.fpoId);
                    callback({ status: true, message: "Added successfully" })
                } else {
                    callback({ status: false, message: "Add unsuccessful" })
                }

            })

        })
    }


}

exports.deleteSecBusinessDetails = function (data, callback) {
    // console.log(data, "data");
    mongo.update({ fpoId: data.fpoId }, { 'secondaryBusinessDetails': { index: data.index, fpoId: data.fpoId } }, 'FPOmaster', function (response) {
        if (response) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Deleted successfully" })
        } else {
            callback({ status: false, message: "Delete unsuccessful" })
        }

    })
}



exports.licenseDetailsUpdate = function (data, callback) {
    ////////console.log(data,"data ")
    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'License.index': data.index }, function (response) {
        // ////////console.log(response,"response");
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId },
                {
                    'License.$[e1].licenseType': data.licenseType,
                    'License.$[e1].LicenseNumber': data.LicenseNum,
                    'License.$[e1].dateOfIssue': data.dateOfIssue,
                    'License.$[e1].dateOfRenewal': data.dateOfRenewal,

                    // 'boardDirectorsDetails.$[e1].panNo': data.panNo,
                    // 'boardDirectorsDetails.$[e1].IdNo': data.IdNo
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                    // ////////console.log(response1,'agrre');
                })
        } else {
            // ////////console.log("else part");
            mongo.updatePush({ fpoId: data.fpoId }, { License: data }, 'FPOmaster', function (response2) {
                updateProfileDate(data.fpoId);
                callback(response2)
            })
        }
    })

}

















exports.primaryBusinessDetailsUpdate = function (data, callback) {

    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'primaryBusinessDetails.index': data.index }, function (response) {
        //    console.log(response,"response model");
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId },
                {
                    'primaryBusinessDetails.$[e1].Year': data.Year,
                    'primaryBusinessDetails.$[e1].priBusinessActivity': data.priBusinessActivity,
                    'primaryBusinessDetails.$[e1].cropCategory': data.cropCategory,
                    'primaryBusinessDetails.$[e1].quantitySold': data.quantitySold,
                    'primaryBusinessDetails.$[e1].amount': data.amount,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                    // console.log(response1,'agrre');
                })
        } else {
            console.log("else part");
            console.log(data, "primaryBusinessDetails");
            mongo.updatePush({ fpoId: data.fpoId }, { primaryBusinessDetails: data }, 'FPOmaster', function (response2) {
                updateProfileDate(data.fpoId);
                callback(response2)
            })
        }
    })

}

exports.deleteRow7 = function (data, callback) {
    //  //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'primaryBusinessDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        // //console.log(response,"response");
        callback(response)
    })

}

exports.InfrastructureDetailUpdate = function (data, callback) {
    ////////console.log(data,"data ")
    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'InfrastructureDetail.index': data.index }, function (response) {
        // ////////console.log(response,"response");
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId },
                {
                    'InfrastructureDetail.$[e1].machineName': data.machineName,
                    'InfrastructureDetail.$[e1].ownership': data.ownership,
                    'InfrastructureDetail.$[e1].Capacity': data.Capacity,
                    'InfrastructureDetail.$[e1].utility': data.utility,
                    "InfrastructureDetail.$[e1].Age": data.Age,
                    'InfrastructureDetail.$[e1].contactSupplier': data.contactSupplier,

                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                    // ////////console.log(response1,'agrre');
                })
        } else {
            // ////////console.log("else part");
            mongo.updatePush({ fpoId: data.fpoId }, { InfrastructureDetail: data }, 'FPOmaster', function (response2) {
                updateProfileDate(data.fpoId);
                callback(response2)
            })
        }
    })

}

exports.storageDetailUpdate = function (data, callback) {
    console.log(data, "data ")

    if (data?.index >= 0) {
        mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'storageDetails.index': data.index }, function (response) {
            if (response) {
                mongo.updateWithArrayFilter({ fpoId: data.fpoId },
                    {
                        'storageDetails.$[e1].storageType': data.storageType,
                        'storageDetails.$[e1].ownership': data.ownership,
                        'storageDetails.$[e1].rentType': data.rentType,
                        'storageDetails.$[e1].commodityType': data.commodityType,
                        'storageDetails.$[e1].storageCapacity': data.storageCapacity,
                        "storageDetails.$[e1].storageUtility": data.storageUtility,
                    }, { arrayFilters: [{ 'e1.index': data.index }] },
                    "FPOmaster", function (response1) {
                        if (response1) {
                            updateProfileDate(data.fpoId);
                            callback({ status: true, message: "Updated successfully" })
                        } else {
                            callback({ status: false, message: "Update unsuccessful" })
                        }
                    })
            }
        })
    } else {
        let aggrigation = [
            {
                '$match': {
                    fpoId: data.fpoId,
                    'storageDetails': { '$exists': true }
                }
            }, {
                '$unwind': '$storageDetails'
            },
            {
                '$project': {
                    '_id': 0,
                    'index': '$storageDetails.index'
                }
            },
            {
                '$sort': { 'index': -1 }
            }
        ]
        mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
            console.log(response.length, 'index');
            if (response.length > 0) {
                data.index = parseInt(response[0].index) + 1;
            } else {
                data.index = 0;
            }
            mongo.updatePush({ fpoId: data.fpoId }, { storageDetails: data }, 'FPOmaster', function (response2) {
                if (response2) {
                    updateProfileDate(data.fpoId);
                    callback({ status: true, message: "Added successfully" })
                } else {
                    callback({ status: false, message: "Add unsuccessful" })
                }

            })

        })
    }








}

exports.deleteStorageDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoId }, { 'storageDetails': { index: data.index } }, 'FPOmaster', function (response) {
        if (response) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Deleted successfully" })
        } else {
            callback({ status: false, message: "Delete unsuccessful" })
        }

    })
}


exports.AddLicenseData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'License': { '$exists': true }
            }
        }, {
            '$unwind': '$License'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$License.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { License: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateLicenseData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'License.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'License.incdex': data.incdex },
                {
                    'License.$[e1].LicenseNum': data.LicenseNum,
                    'License.$[e1].dateOfIssue': data.dateOfIssue,
                    'License.$[e1].gstFilling': data.gstFilling,
                    "License.$[e1].dateOfRenewal": data.dateOfRenewal,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteLicenseDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'License': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}

exports.AddOtherLicenseData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'otherLicense': { '$exists': true }
            }
        }, {
            '$unwind': '$otherLicense'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$otherLicense.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { otherLicense: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateOtherLicenseData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'otherLicense.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'otherLicense.incdex': data.incdex },
                {
                    'otherLicense.$[e1].licenseType': data.licenseType,
                    'otherLicense.$[e1].LicenseNum': data.LicenseNum,
                    'otherLicense.$[e1].dateOfIssue': data.dateOfIssue,
                    "otherLicense.$[e1].dateOfRenewal": data.dateOfRenewal,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteOtherLicenseDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'otherLicense': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}

exports.AddPrimaryBusinessDetails = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'primaryBusinessDetails': { '$exists': true }
            }
        }, {
            '$unwind': '$primaryBusinessDetails'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$primaryBusinessDetails.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { primaryBusinessDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updatePrimaryBusinssDetails = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoName, 'primaryBusinessDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'primaryBusinessDetails.incdex': data.incdex },
                {
                    'primaryBusinessDetails.$[e1].financeYear': data.financeYear,
                    'primaryBusinessDetails.$[e1].businessPlanReady': data.businessPlanReady,
                    'primaryBusinessDetails.$[e1].uploadBusinessPlan2': data.uploadBusinessPlan2,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deletePrimaryBusinessDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'primaryBusinessDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}

exports.addInfrastructureDetails = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoId,
                'InfrastructureDetail': { '$exists': true }
            }
        }, {
            '$unwind': '$InfrastructureDetail'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$InfrastructureDetail.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoId }, { InfrastructureDetail: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateInfrastructureDetails = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'InfrastructureDetail.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId, 'InfrastructureDetail.incdex': data.incdex },
                {
                    'InfrastructureDetail.$[e1].machineName': data.machineName,
                    'InfrastructureDetail.$[e1].ownership': data.ownership,
                    'InfrastructureDetail.$[e1].Capacity': data.Capacity,
                    "InfrastructureDetail.$[e1].utility": data.utility,
                    "InfrastructureDetail.$[e1].Age": data.Age,
                    "InfrastructureDetail.$[e1].contactSupplier": data.contactSupplier,
                    "InfrastructureDetail.$[e1].packing": data.packing,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                })
        }
    })
}

exports.deleteInfrastructureDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoId }, { 'InfrastructureDetail': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}



exports.addQualityControlDetails = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'qualityControlDetails': { '$exists': true }
            }
        }, {
            '$unwind': '$qualityControlDetails'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$qualityControlDetails.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoId }, { qualityControlDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateQualityControlDetails = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'qualityControlDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId, 'qualityControlDetails.index': data.index },
                {
                    'qualityControlDetails.$[e1].haveAssayingFacility': data.haveAssayingFacility,
                    'qualityControlDetails.$[e1].assaying': data.assaying,
                    'qualityControlDetails.$[e1].location': data.location,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                })
        }
    })
}

exports.deleteQualityControlDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoId }, { 'qualityControlDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}


exports.AddTieupsData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'TieupDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$TieupDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$TieupDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { TieupDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}
exports.updateTieupsData = function (data, callback) {
    console.log(data, "gfbhfgdg");
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'TieupDetails.index': data.index }, function (response) {
        if (response) {

            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'TieupDetails.index': data.index },
                {
                    'TieupDetails.$[e1].TieupYear': data.TieupYear,
                    'TieupDetails.$[e1].Tieupdone': data.Tieupdone,
                    'TieupDetails.$[e1].TieupAssociation': data.TieupAssociation,
                    'TieupDetails.$[e1].TieupCompany': data.TieupCompany,
                    'TieupDetails.$[e1].TieupTransaction': data.TieupTransaction,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteTieupsDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'TieupDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}







exports.addCollectionCenterDetails = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoId,
                'collectionCenterDetails': { '$exists': true }
            }
        }, {
            '$unwind': '$collectionCenterDetails'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$collectionCenterDetails.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        console.log(response, "hhhhhhhhhhh");
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoId }, { collectionCenterDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoId);
            // console.log(data, "jjjjjjjjjjjj");
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateCollectionCenterDetails = function (data, callback) {
    console.log(data, "update data");
    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'collectionCenterDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId, 'collectionCenterDetails.incdex': data.incdex },
                {
                    'collectionCenterDetails.$[e1].haveCollectionCenter': data.haveCollectionCenter,
                    'collectionCenterDetails.$[e1].collectionType': data.collectionType,
                    'collectionCenterDetails.$[e1].locationOfAssaying': data.locationOfAssaying,

                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                })
        }
    })
}

exports.deleteCollectionCenterDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoId }, { 'collectionCenterDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}


exports.addFacilityCenterDetails = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoId,
                'facilityCenterDetails': { '$exists': true }
            }
        }, {
            '$unwind': '$facilityCenterDetails'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$facilityCenterDetails.index'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoId }, { facilityCenterDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateFacilityCenterDetails = function (data, callback) {
    console.log(data, "hahahah");
    mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'facilityCenterDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoId, 'facilityCenterDetails.index': data.index },
                {
                    'facilityCenterDetails.$[e1].haveAccessToFacilityCenter': data.haveAccessToFacilityCenter,
                    'facilityCenterDetails.$[e1].facilityType': data.facilityType,
                    'facilityCenterDetails.$[e1].wantToOpenFacility': data.wantToOpenFacility,
                    'facilityCenterDetails.$[e1].landAvailable': data.landAvailable,
                    'facilityCenterDetails.$[e1].landStatus': data.landStatus,
                    'facilityCenterDetails.$[e1].uploadLand': data.uploadLand,



                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1);
                })
        }

        
    })

}

exports.deleteFacilityCenterDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoId }, { 'facilityCenterDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}








exports.deleteRowBod = function (data, callback) {
    //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'boardDirectorsDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}


exports.deleteRowStaff = function (data, callback) {
    //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'staffDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}

exports.deleteRowEquity = function (data, callback) {
    //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'equityGrant': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })

}


exports.deleteRowCredit = function (data, callback) {
    //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'creditGrant': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
        //console.log(response,"response Dekete Row");
    })

}




exports.deleteRowOther = function (data, callback) {
    //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'otherScheme': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
        //console.log(response,"response Delete Row Other");
    })

}


// exports.deleteTrainingRow = function (data, callback) {
//     mongo.removeDocument({ _id: ObjectId(data.id) }, 'trainingDetails', function (response) {

//         if (response.deletedCount == 1) {
//             response = true
//         }
//         else {
//             response = false
//         }
//         // updateProfileDate(data.fpoId);
//         callback(response)
//     })

// }


exports.deleteRowfinYear = function (data, callback) {
    //console.log(data,"data model ")
    mongo.removeDocument({ _id: ObjectId(data.id) }, 'fpoFinYearData', function (response) {
        //console.log(response,"fin year");
        if (response.deletedCount == 1) {
            response = true
        }
        else {
            response = false
        }
        callback(response)
    })

}









exports.deleterowInfra = function (data, callback) {
    //  //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'InfrastructureDetail': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        // //console.log(response,"response");
        callback(response)
    })

}

exports.deleteLicRow = function (data, callback) {
    //  //console.log(data,"data model ")
    mongo.update({ fpoId: data.fpoId }, { 'License': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoId);
        // //console.log(response,"response");
        callback(response)
    })

}




// exports.deleteRow3 = function (data, callback) {
//     //console.log(data,"data model ")
//     mongo.removeDocument({ _id: ObjectId(data.id) }, 'cropProduction', function (response) {
//         //console.log(response.deletedCount,"response");
//         if (response.deletedCount == 1) {
//             response = true
//         }
//         else {
//             response = false
//         }
//         callback(response)
//     })
// }



exports.accountDetailsSubmit = function (data, callback) {
    // console.log(data);
    mongo.updateOne({ fpoId: data.fpoId },
        {
            'accountDetails.haveBankAccount': data.accountData.haveBankAccount,
            'accountDetails.bankName': data.accountData.bankName,
            'accountDetails.branchName': data.accountData.branchName,
            'accountDetails.accountNo': data.accountData.accountNo,
            'accountDetails.panNo': data.accountData.panNo,
            'accountDetails.tanNo': data.accountData.tanNo,
            // 'accountDetails.haveTradeLicence': data.accountData.haveTradeLicence,
            // 'accountDetails.tradeLicenceNo': data.accountData.tradeLicenceNo,
            'accountDetails.year': data.accountData.year,
            'accountDetails.transactionPercentages': data.accountData.transactionPercentages,

        },
        "FPOmaster", function (response) {
            updateProfileDate(data.fpoId);
            callback(response)
        })
}

exports.finYearDetails = function (data, callback) {
    mongo.queryFindAll({ fpoId: data }, 'fpoFinYearData', (response) => {
        callback(response)
    })
}

exports.deleteFinDetails = function (data, callback) {
    console.log(data, "deleteFinDetails")
    mongo.removeDocument({ fpoId: data.fpoId, _id: ObjectId(data._id) }, 'fpoFinYearData', function (response) {
        // console.log(response, "response Deleted");
        if (response) {
            let tempDir = __dirname.slice(0, -3)
            let temp = tempDir.slice(0, -6)
            let dirName = temp + "/public/turnOverReports";
            let fileName = data.fpoId + data.finYear + ".pdf";
            let filePath = path.join(dirName, fileName);
            fs.unlinkSync(filePath);
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Deleted successfully" })
        } else {
            callback({ status: false, message: "Delete unsuccessful" })
        }
    })
}
exports.downloadPdf = function (data, callback) {
    let dirName = __dirname + "/turnOverReports";
    let fileName = data.fpoId + "-" + data.finYear + ".pdf";
    let filePath = path.join(dirName, fileName);
    // res.download(filePath,  (err) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Error downloading file');
    //       }else{
    //         console.log('PDF file saved successfully!');
    //       }
    // });
    callback(filePath)

}

exports.finYearDetailsUpdate = async (data, callback) => {
    try {
        // console.log(data, "finYearDetails");
        var insertData = {
            turnoverAmount: data.turnoverAmount, finYear: data.finYear,
            addedOn: new Date(),
            // fpoManagementCost: data.fpoManagementCost, income: data.income, otherCost: data.otherCost, 
            fpoAudit: data.fpoAudit,
            profit: data.profit
        }
        if (data.fpoAudit) {
            // Convert base64 to buffer
            const pdfBuffer = Buffer.from(data.fpoAudit, 'base64');
            // Write buffer to file
            let tempDir = __dirname.slice(0, -3)
            let temp = tempDir.slice(0, -6)
            let dirName = temp + "/public/turnOverReports";
            // let fileName = data.fpoId + "-" + data.finYear + ".pdf";
            let fileName = data.fpoId + data.finYear + ".pdf";
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName);
            }
            let filePath = path.join(dirName, fileName);
            fs.writeFile(filePath, pdfBuffer, (err) => {
                if (err) throw err;

                console.log('PDF file saved successfully!');
            });
            // let tempFilePath = 'https://fpoodisha.nic.in/turnOverReports/' + fileName;
            let tempFilePath = 'https://fpoodisha.nic.in/turnOverReports/' + fileName;
            insertData.turnOverFilePath = tempFilePath;
            insertData.turnOverRepUploaded = true;

            delete insertData.fpoAudit;

            let db = await newmongo.mongoConnection()
            if ('_id' in data) {
                let response = await newmongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data._id) }, insertData, 'fpoFinYearData', db)
                callback(response.modifiedCount)
                db.close()
            } else {
                insertData.fpoId = data.fpoId;
                let response = await newmongo.insertDocument(insertData, 'fpoFinYearData', db)
                callback(response.insertedCount)
                db.close()
            }
        } else {
            delete insertData.fpoAudit;
            if (data.turnOverFilePath) {
                insertData.turnOverRepUploaded = true;
                insertData.turnOverFilePath = data.turnOverFilePath;
            } else {
                insertData.turnOverRepUploaded = false;
            }
            let db = await newmongo.mongoConnection()
            if ('_id' in data) {
                let response = await newmongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data._id) }, insertData, 'fpoFinYearData', db)
                callback(response.modifiedCount)
                db.close()
            } else {
                insertData.fpoId = data.fpoId;
                let response = await newmongo.insertDocument(insertData, 'fpoFinYearData', db)
                callback(response.insertedCount)
                db.close()
            }
        }



    } catch (e) {
        ////////console.log(e.message);
    }
    // ////////console.log(123,data);
    // mongo.updateOne({ fpoId: data.fpoId,_id:ObjectId(data._id)}, { turnoverAmount: data.turnoverAmount, fpoManagementCost: data.fpoManagementCost, otherCost: data.otherCost, income: data.income }, 'fpoFinYearData', function (response) {
    //     callback(response)
    //     ////////console.log(response.updatedCount);
    // })
}

// exports.schemesDetails = async (data, callback) => {
//     try {
//       ////////console.log(req.params,"2 b approved");
//       let db = await newmongo.mongoConnection()
//       let aggregate1 = [
//         {
//           '$match': {
//             'fpoId': data.fpoId
//           }
//         }, {
//           '$project': {
//             'schemesAvailed': 1
//           }
//         }
//       ]
//       let response1 = await newmongo.queryWithAggregator(aggregate1, 'FPOmaster', db)

//       callback(response1)
//       db.close()
//     } catch (e) {
//       ////////console.log(e.message);
//     }


//   }



exports.schemesDetailsUpdate = async (data, callback) => {
    //console.log(data,"availedSchemeData");
    try {
        let db = await newmongo.mongoConnection()
        if ('_id' in data) {
            let response = await newmongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data._id) }, {
                'schemesAvailed.schemeGrant': data.schemeGrant,
                'schemesAvailed.schemeName': data.schemeName,
                'schemesAvailed.statusEquity': data.statusEquity, 'schemesAvailed.statusEquity': data.statusEquity, 'schemesAvailed.amount': data.amount, 'schemesAvailed.purpose': data.purpose, 'schemesAvailed.date': data.date
            }, 'FPOmaster', db)
            callback(response.modifiedCount)
            db.close()
        } else {
            let response = await newmongo.insertDocument({ fpoId: data.fpoId, turnoverAmount: data.turnoverAmount, fpoManagementCost: data.fpoManagementCost }, 'FPOmaster', db)
            callback(response.insertedCount)
            db.close()
        }

    } catch (e) {
        ////////console.log(e.message);
    }
    // ////////console.log(123,data);
    // mongo.updateOne({ fpoId: data.fpoId,_id:ObjectId(data._id)}, { turnoverAmount: data.turnoverAmount, fpoManagementCost: data.fpoManagementCost, otherCost: data.otherCost, income: data.income }, 'fpoFinYearData', function (response) {
    //     callback(response)
    //     ////////console.log(response.updatedCount);
    // })
}

exports.AddEquityData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'equityGrant': { '$exists': true }
            }
        }, {
            '$unwind': '$equityGrant'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$equityGrant.index'
            }
        },
        {
            '$sort': { 'index': -1 }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        console.log(response.length, 'pppppppp');
        if (response.length > 0) {
            if (response.length == 3) {
                callback({ status: false, message: "Can't add more" });
                return;
            }
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { equityGrant: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Added successfully" })
        })

    })
    // mongo.updatePush({ fpoId: data.fpoCode }, { equityGrant: data }, 'FPOmaster', function (response) {
    //     if (response.modifiedCount > 0) {
    //         mongo.findOne('FPOmaster', { fpoId: data.fpoCode }, function (response) {
    //             // console.log(response.equityGrant,"333");
    //             updateProfileDate(data.fpoCode);
    //             callback(response.equityGrant)
    //         })
    //     }
    // })
}

exports.updateEquityData = function (data, callback) {
    // console.log(data,"data1111111111");
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'equityGrant.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'equityGrant.index': data.index },
                {
                    'equityGrant.$[e1].haveAvailedEquityGrant': data.haveAvailedEquityGrant,
                    'equityGrant.$[e1].status': data.status,
                    'equityGrant.$[e1].nameOfOrg': data.nameOfOrg,
                    'equityGrant.$[e1].YearOfEquity': data.YearOfEquity,
                    "equityGrant.$[e1].Amount": data.Amount,
                    'equityGrant.$[e1].PurposeOfGrantutilization': data.PurposeOfGrantutilization,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    console.log(response1, "response");
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteEquityDetails = function (data, callback) {
    console.log(data, "data");
    mongo.update({ fpoId: data.fpoCode }, { 'equityGrant': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}






exports.AddCreditData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'creditGrant': { '$exists': true }
            }
        }, {
            '$unwind': '$creditGrant'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$creditGrant.index'
            }
        },
        {
            '$sort': { 'index': -1 }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        console.log(response, 'pppppppp');
        if (response.length > 0) {
            if (response.length == 2) {
                callback({ status: false, message: "Can't add more" });
                return;
            }
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { creditGrant: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Added successfully" })
        })

    })
}





exports.updateCreditData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'creditGrant.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'creditGrant.index': data.index },
                {
                    'creditGrant.$[e1].haveAvailedCreditGrant': data.haveAvailedCreditGrant,
                    'creditGrant.$[e1].status': data.status,
                    'creditGrant.$[e1].nameOfOrg': data.nameOfOrg,
                    'creditGrant.$[e1].YearOfCreditavailed': data.YearOfCreditavailed,
                    "creditGrant.$[e1].Amount": data.Amount,
                    'creditGrant.$[e1].Bankname': data.Bankname,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}


exports.deleteCreditDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'creditGrant': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}

exports.AddOtherData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                fpoId: data.fpoCode,
                'otherScheme': { '$exists': true }
            }
        }, {
            '$unwind': '$otherScheme'
        },
        {
            '$project': {
                '_id': 0,
                'index': '$otherScheme.index'
            }
        },
        {
            '$sort': { 'index': -1 }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        // console.log(response,'pppppppp');
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { otherScheme: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}

exports.updateOtherData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'otherScheme.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'otherScheme.index': data.index },
                {
                    'otherScheme.$[e1].schemeName': data.schemeName,
                    'otherScheme.$[e1].status': data.status,
                    'otherScheme.$[e1].nameOfOrg': data.nameOfOrg,
                    "otherScheme.$[e1].Amount": data.Amount,
                    'otherScheme.$[e1].Purpose1': data.Purpose1,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteOtherDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'otherScheme': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}

exports.meetingDetailsFetch = async function (data, callback) {
    let db = await newmongo.mongoConnection()

    //console.log(data)
    var today = moment(new Date()).format('YYYY-MM-DD');

    let meeting_scheduled = await newmongo.queryFindAll({ fpoId: data, "meetingDate": { "$gt": today } }, 'meetingsDetails', db)
    let meeting_conducted = await newmongo.queryFindAll({ fpoId: data, "meetingDate": { "$lte": today } }, 'meetingsDetails', db)

    // console.log(meeting_scheduled, "sch")
    // console.log(meeting_conducted, "held")
    var allMeeting = meeting_scheduled.concat(meeting_conducted)


    var result = ({
        allMeeting
        // meeting_scheduled, meeting_conducted
    })
    callback(result)
    db.close()
}

exports.meetingDetailsUpdate = function (data, callback) {
    console.log(data, "meetingDetailsUpdate");
    if (data.slNo) {
        mongo.updateOne({ fpoId: data.fpoId, slNo: data.slNo }, { meetingDate: data.meetingDate, meetingType: data.meetingType, agenda: data.agenda, noOfAttendees: data.noOfAttendees, totalMinutes: data.totalMinutes }, 'meetingsDetails', function (response) {
            updateProfileDate(data.fpoId);
            callback(response.modifiedCount)
        })
    } else {
        mongo.autoIncrement({ slNo: data.slNo }, 'meetingsDetails', function (response) {
            if (response) {
                mongo.insertDocument({ fpoId: data.fpoId, slNo: response, meetingDate: data.meetingDate, meetingType: data.meetingType, noOfAttendees: data.noOfAttendees, agenda: data.agenda, totalMinutes: data.totalMinutes }, 'meetingsDetails', function (response1) {
                    updateProfileDate(data.fpoId);
                    callback(response1.insertedCount)
                })
            }
        })
    }

}

exports.deleteScheduleMeeting = function (data, callback) {
    // console.log(data, "deleteScheduleMeeting");
    let condition = { slNo: data.slNo, fpoId: data.fpoId }
    mongo.removeDocument(condition, 'meetingsDetails', function (response) {
        //console.log(response,"fin year");
        if (response.deletedCount == 1) {
            callback({ status: true, message: "Deleted successfully" })
            updateProfileDate(data.fpoId);
        }
        else {
            callback({ status: false, message: "Delete unsuccessful" })
        }
    })

}

exports.trainingDetailsFetch = function (data, callback) {
    mongo.queryFindAll({ fpoId: data }, 'trainingDetails', (response) => {
        callback(response)
    })
}

exports.finalUploadFiles = function (data, callback) {
    //console.log(data.fpoId);
    mongo.upsert({ fpoId: data.fpoId }, { fpoId: data.fpoId, uploadedFiles: data.uploadedFiles }, 'uploadedDocumentMaster', function (response) {
        updateProfileDate(data.fpoId);
        callback(response)
    })
}

exports.trainingDataUpdate = function (data, callback) {
    //console.log(data,"data");
    // data.year = new Date(data.year);
    if (data._id) {
        mongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data._id) }, { trainingOrExposureVisit: data.trainingOrExposureVisit, year: data.year, trainingPurpose: data.trainingPurpose, location: data.location, maleAttendeesNo: data.maleAttendeesNo, femaleAttendeesNo: data.femaleAttendeesNo, organisedBy: data.organisedBy }, 'trainingDetails', function (response) {
            if (response) {
                // if (response.modifiedCount == 1) {
                updateProfileDate(data.fpoId);
                callback({ status: true, message: "Update successfully" })
            } else {
                callback({ status: false, message: "Update unsuccessful" })
            }
            // callback(response.modifiedCount)
        })
    } else {
        mongo.insertDocument({ fpoId: data.fpoId, trainingOrExposureVisit: data.trainingOrExposureVisit, year: data.year, trainingPurpose: data.trainingPurpose, location: data.location, maleAttendeesNo: data.maleAttendeesNo, femaleAttendeesNo: data.femaleAttendeesNo, organisedBy: data.organisedBy }, 'trainingDetails', function (response1) {
            // callback(response1.insertedCount)
            // if (response1) {
            if (response1.insertedCount == 1) {
                updateProfileDate(data.fpoId);
                callback({ status: true, message: "Added successfully" })
            } else {
                callback({ status: false, message: "Added unsuccessful" })
            }
        })
    }

}

exports.deleteTrainingDetails = function (data, callback) {
    console.log(data, "data");
    let condition = { _id: ObjectId(data._id), fpoId: data.fpoId };
    mongo.removeDocument(condition, 'trainingDetails', function (response) {
        console.log(response.deletedCount, "response");
        if (response.deletedCount == 1) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Deleted successfully" })
        }
        else {
            callback({ status: false, message: "Delete Unsuccessful" })
        }
    })

}

exports.schemesAvailedSubmit = function (data, callback) {
    mongo.updateOne({ fpoId: data.fpoId }, {
        'schemesAvailed.haveAvailedEquityGrant': data.availedSchemeData.haveAvailedEquityGrant,
        'schemesAvailed.organisationHelped': data.availedSchemeData.organisationHelped,
        'schemesAvailed.equityGrantDetails': data.availedSchemeData.equityGrantDetails,
        'schemesAvailed.amountGranted': data.availedSchemeData.amountGranted,
        'schemesAvailed.haveCreditGuaranteeScheme': data.availedSchemeData.haveCreditGuaranteeScheme,
        'schemesAvailed.organiExtendedCredGuarantee': data.availedSchemeData.organiExtendedCredGuarantee,
        'schemesAvailed.credAvailedDetails': data.availedSchemeData.credAvailedDetails,
        'schemesAvailed.credAvldAmount': data.availedSchemeData.credAvldAmount,
        'schemesAvailed.haveOtherScheme': data.availedSchemeData.haveOtherScheme,
        'schemesAvailed.schemeAvailedDetails': data.availedSchemeData.schemeAvailedDetails,
        'schemesAvailed.schemeName': data.availedSchemeData.schemeName,
        'schemesAvailed.haveAvailedLoan': data.availedSchemeData.haveAvailedLoan,
        'schemesAvailed.year': data.availedSchemeData.year,

        'schemesAvailed.schemeAvailedAmount': data.availedSchemeData.schemeAvailedAmount,

        'schemesAvailed.sourceOfLoan': data.availedSchemeData.sourceOfLoan,
        'schemesAvailed.loanAmount': data.availedSchemeData.loanAmount,

        'schemesAvailed.loanClosedStatus': data.availedSchemeData.loanClosedStatus,
        'schemesAvailed.statusOfClosure': data.availedSchemeData.statusOfClosure,

        'schemesAvailed.loanAmountRemaining': data.availedSchemeData.loanAmountRemaining,
        'schemesAvailed.haveMissedEMI': data.availedSchemeData.haveMissedEMI,
        'schemesAvailed.AddOtherData': data.availedSchemeData.missingEMIReason
    },
        'FPOmaster', (response) => {
            updateProfileDate(data.fpoId);
            callback(response)
        })
}


exports.fetchBankNames = function (callback) {
    let aggrigation = [
        {
            '$group': {
                '_id': '$vchBankName'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, 'bankMaster', function (response) {
        // ////////console.log(response);
        callback(response)
    })
}

exports.fetchBranchName = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'vchBankName': data
            }
        }, {
            '$group': {
                '_id': '$vchBranchName'
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, 'bankMaster', function (response) {
        if (response) {
            callback(response)
        }
    })
}
exports.fetchAwards = function (fpoId, callback) {
    mongo.findOne('FPOmaster', { fpoId: fpoId }, function (response) {
        updateProfileDate(fpoId);
        callback(response.FPOAward)
    })
}
exports.fetchRecords = function (fpoId, callback) {
    mongo.findOne('FPOmaster', { fpoId: fpoId }, function (response) {
        updateProfileDate(fpoId);
        callback(response.FPORecord)
    })
}
// exports.AddRecordData = function (data, callback) {
//     mongo.updateOne({ fpoId: data.fpoCode },
//         {
//             'recordData.recordType': data.recordType,
//             'recordData.doc': data.doc,
//             'recordData.receipt': data.receiptUpload,  

//         },'FPOmaster', function (response) {
//             callback(response)
//         })
// }


exports.AddRecordData = function (data, callback) {
    if (data?.recordNo >= 0) {
        mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'FPORecord.recordNo': data.recordNo }, function (response) {
            if (response) {
                mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'FPORecord.recordNo': data.recordNo },
                    {
                        'FPORecord.$[e1].recordType': data.recordType,
                        'FPORecord.$[e1].doc': data.doc,
                        'FPORecord.$[e1].receiptUpload': data.receiptUpload,
                    }, { arrayFilters: [{ 'e1.recordNo': data.recordNo }] },
                    "FPOmaster", function (response1) {
                        if (response1) {
                            updateProfileDate(data.fpoId);
                            callback({ response1: true, message: "Updated successfully" });
                        } else {
                            callback({ status: false, message: "Update unsuccessful" });
                        }

                    })
            }
        })
    } else {
        let aggrigation = [
            {
                '$match': {
                    'FPORecord': {
                        '$exists': true
                    }
                }
            }, {
                '$unwind': '$FPORecord'
            }, {
                '$project': {
                    '_id': 0,
                    'recordNo': '$FPORecord.recordNo'
                }
            }, {
                '$sort': {
                    'recordNo': -1
                }
            }, {
                '$limit': 1
            }
        ]
        mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
            if (response.length > 0) {
                data.recordNo = parseInt(response[0].recordNo) + 1;
            } else {
                data.recordNo = 1;
            }
            console.log(data.recordNo, "record number");
            mongo.updatePush({ fpoId: data.fpoCode }, { FPORecord: data }, 'FPOmaster', function (response2) {
                // console.log(response2, 'recordDatarecordDatarecordDatarecordData');
                if (response2.modifiedCount > 0) {
                    updateProfileDate(data.fpoCode);
                    callback({ status: true, message: "Added successfully" })
                } else {
                    callback({ status: false, message: "Added Unsuccessful" })
                }

            })
        })
    }
}


exports.awardUpdate = function (data, callback) {
    console.log(data, 'image.png');
    //=====================
    // mongo.updateOne({ fpoId: data.fpoId }, { FPOAward: data.data }, 'FPOmaster', function (response) {
    //     updateProfileDate(data.fpoId);
    //     callback(response)
    // })
    //=========================
    if (data?.awardNo >= 1) {
        mongo.findOne('FPOmaster', { fpoId: data.fpoId, 'FPOAward.awardNo': data.awardNo }, function (response) {
            if (response) {
                mongo.updateWithArrayFilter({ fpoId: data.fpoId, 'FPOAward.awardNo': data.awardNo },
                    {
                        'FPOAward.$[e1].type': data.type,
                        'FPOAward.$[e1].year': data.year,
                        'FPOAward.$[e1].awardedOrganisation': data.awardedOrganisation,
                    }, { arrayFilters: [{ 'e1.awardNo': data.awardNo }] },
                    "FPOmaster", function (response1) {
                        // console.log(response1, "response1");
                        if (response1) {
                            updateProfileDate(data.fpoId);
                            callback({ status: true, message: "Updated successfully" });
                        } else {
                            callback({ status: false, message: "Update unsuccessful" });
                        }

                    })
            }
        })
    } else {
        let aggrigation = [
            {
                '$match': {
                    fpoId: data.fpoId,
                    'FPOAward': { '$exists': true }
                }
            }, {
                '$unwind': '$FPOAward'
            },
            {
                '$project': {
                    '_id': 0,
                    'awardNo': '$FPOAward.awardNo'
                }
            },
            {
                '$sort': { 'awardNo': -1 }
            }
        ]
        console.log(JSON.stringify(aggrigation), "award");
        mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
            console.log(response.length, 'pppppppp');
            if (response.length > 0) {
                data.awardNo = parseInt(response[0].awardNo) + 1;
            } else {
                data.awardNo = 1;
            }
            mongo.updatePush({ fpoId: data.fpoId }, { FPOAward: data }, 'FPOmaster', function (response2) {
                if (response2) {
                    updateProfileDate(data.fpoId);
                    callback({ status: true, message: "Added successfully" })
                } else {
                    callback({ status: false, message: "Added Unsuccessful" })
                }

            })
        })
    }
}

exports.deleteAwardDetails = function (data, callback) {
    // console.log(data,"data");
    mongo.update({ fpoId: data.fpoId }, { 'FPOAward': { awardNo: data.awardNo } }, 'FPOmaster', function (response) {
        if (response) {
            updateProfileDate(data.fpoId);
            callback({ status: true, message: "Deleted successfully" })
        } else {
            callback({ status: false, message: "Delete unsuccessful" })
        }
    })

}



exports.deleteRecordDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'FPORecord': { recordNo: data.recordNo } }, 'FPOmaster', function (response) {
        if (response) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Deleted successfully" })
        } else {
            callback({ status: false, message: "Delete unsuccessful" })
        }
    })

}



exports.deletePLDetails = function (data, callback) {
    mongo.removeDocument({ _id: ObjectId(data._id), fpoId: data.fpoId }, 'fpoFinYearPLData', function (response) {
        if (response.deletedCount == 1) {
            callback({ status: true, message: "Deleted successfully" })
        }
        else {
            callback({ status: false, message: "Delete unsuccessful" })
        }

    })

}


exports.finYearDetailsUpdate1 = async (data, callback) => {
    try {
        var insertData = {
            finYear1: data.finYear1, profit: data.profit,
            addedOn: new Date(),
            // fpoManagementCost: data.fpoManagementCost, income: data.income, otherCost: data.otherCost, 
            fpoAuditPL: data.fpoAuditPL,
            // profit: data.profit
        }
        if (data.fpoAuditPL) {
            // Convert base64 to buffer
            const pdfBuffer = Buffer.from(data.fpoAuditPL, 'base64');
            // Write buffer to file
            let tempDir = __dirname.slice(0, -3)
            let temp = tempDir.slice(0, -6)
            let dirName = temp + "/public/PLReports";
            // let fileName = data.fpoId + "-" + data.finYear + ".pdf";
            let fileName = data.fpoId + data.finYear1 + ".pdf";
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName);
            }
            let filePath = path.join(dirName, fileName);
            fs.writeFile(filePath, pdfBuffer, (err) => {
                if (err) throw err;

                // console.log('PDF file saved successfully!');
            });
            // let tempFilePath = 'https://fpoodisha.nic.in/PLReports/' + fileName;
            let tempFilePath = 'https://fpoodisha.nic.in/PLReports/' + fileName;
            insertData.turnOverFilePath1 = tempFilePath;
            insertData.turnOverRepUploaded1 = true;

            delete insertData.fpoAuditPL;

            let db = await newmongo.mongoConnection()
            if ('_id' in data) {
                let response = await newmongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data._id) }, insertData, 'fpoFinYearPLData', db)
                callback(response.modifiedCount)
                db.close()
            } else {
                insertData.fpoId = data.fpoId;
                let response = await newmongo.insertDocument(insertData, 'fpoFinYearPLData', db)
                callback(response.insertedCount)
                db.close()
            }
        } else {
            delete insertData.fpoAuditPL;
            if (data.turnOverFilePath1) {
                insertData.turnOverRepUploaded1 = true;
                insertData.turnOverFilePath1 = data.turnOverFilePath1;
            } else {
                insertData.turnOverRepUploaded1 = false;
            }
            let db = await newmongo.mongoConnection()
            if ('_id' in data) {
                let response = await newmongo.updateOne({ fpoId: data.fpoId, _id: ObjectId(data._id) }, insertData, 'fpoFinYearPLData', db)
                callback(response.modifiedCount)
                db.close()
            } else {
                insertData.fpoId = data.fpoId;
                let response = await newmongo.insertDocument(insertData, 'fpoFinYearPLData', db)
                callback(response.insertedCount)
                db.close()
            }
        }



    } catch (e) {
        ////////console.log(e.message);
    }
    // ////////console.log(123,data);
    // mongo.updateOne({ fpoId: data.fpoId,_id:ObjectId(data._id)}, { turnoverAmount: data.turnoverAmount, fpoManagementCost: data.fpoManagementCost, otherCost: data.otherCost, income: data.income }, 'fpoFinYearData', function (response) {
    //     callback(response)
    //     ////////console.log(response.updatedCount);
    // })
}



exports.finYearDetails1 = function (data, callback) {
    mongo.queryFindAll({ fpoId: data }, 'fpoFinYearPLData', (response) => {
        callback(response)
    })
}

// exports.AddBusinessPlanData = function (data, callback) {
//     let aggrigation = [
//         {
//             '$match': {
//                 'fpoId': data.fpoCode,
//                 'businessPlanDetails': {
//                     '$exists': true
//                 }
//             }
//         }, {
//             '$unwind': '$businessPlanDetails'
//         }, {
//             '$project': {
//                 '_id': 0,
//                 'index': '$businessPlanDetails.index'
//             }
//         }, {
//             '$sort': {
//                 'index': -1
//             }
//         }
//     ]
//     mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
//         if (response.length > 0) {
//             data.index = response[0].index + 1;
//         } else {
//             data.index = 0;
//         }
//         if (data.uploadBusinessPlan) {
//             const pdfBuffer = Buffer.from(data.businessForm, 'base64');
//             let tempDir = __dirname.slice(0, -3)
//             let temp = tempDir.slice(0, -6)
//             let dirName = temp + "/public/PLReports";
//             const fileName = `business_plan_${data.fpoCode}_${data.index}.pdf`; // Generate a unique file name
//             const filePath = `uploads/${fileName}`; // Path where file will be stored
//             fs.writeFile(filePath, data.uploadBusinessPlan, function (err) {
//                 if (err) {
//                     callback({ status: false, message: "Error storing file" });
//                 } else {
//                     data.uploadBusinessPlan = filePath; // Update data with file path
//                     mongo.updatePush({ fpoId: data.fpoCode }, { businessPlanDetails: data }, 'FPOmaster', function (response2) {
//                         updateProfileDate(data.fpoCode);
//                         callback({ status: true, message: "Data added successfully" });
//                     });
//                 }
//             });
//         } else {
//             callback({ status: false, message: "No file provided" });
//         }
//     });
// }
// exports.updateBusinessPlanData = function (data, callback) {
//     mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'businessPlanDetails.index': data.index }, function (response) {
//         console.log(response, "response");
//         if (response) {
//             mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'businessPlanDetails.index': data.index },
//                 {
//                     'businessPlanDetails.$[e1].businessPlanYear': data.businessPlanYear,
//                     'businessPlanDetails.$[e1].businessPlanFor2021': data.businessPlanFor2021,
//                     'businessPlanDetails.$[e1].uploadBusinessPlan': data.uploadBusinessPlan,
//                 }, { arrayFilters: [{ 'e1.index': data.index }] },
//                 "FPOmaster", function (response1) {
//                     updateProfileDate(data.fpoCode);
//                     callback(response1);
//                 })
//         }
//     })
// }


exports.AddBusinessPlanData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'businessPlanDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$businessPlanDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$businessPlanDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        // Assuming data.uploadBusinessPlan contains the file content
        if (data.uploadBusinessPlan) {
            const fileName = `business_plan_${data.fpoCode}_${data.index}.pdf`; // Generate a unique file name
            const filePath = `public/businessPlanReports/${fileName}`; // Path where file will be stored
            fs.writeFile(filePath, data.uploadBusinessPlan, function (err) {
                if (err) {
                    callback({ status: false, message: "Error storing file" });
                } else {
                    data.uploadBusinessPlan = filePath; // Update data with file path
                    mongo.updatePush({ fpoId: data.fpoCode }, { businessPlanDetails: data }, 'FPOmaster', function (response2) {
                        updateProfileDate(data.fpoCode);
                        callback({ status: true, message: "Data added successfully" });
                    });
                }
            });
        } else {
            callback({ status: false, message: "No file provided" });
        }
    });
}

exports.updateBusinessPlanData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'businessPlanDetails.index': data.index }, function (response) {
        console.log(response, "response");
        if (response) {
            const oldFilePath = response.businessPlanDetails.uploadBusinessPlan;
            // Assuming data.uploadBusinessPlan contains the new file content
            const fileName = `business_plan_${data.fpoCode}_${data.index}.pdf`; // Generate a unique file name
            const filePath = `'public/businessPlanReports/${fileName}.pdf`; // Path where file will be stored
            fs.writeFile(filePath, data.uploadBusinessPlan, function (err) {
                if (err) {
                    callback({ status: false, message: "Error storing file" });
                } else {
                    data.uploadBusinessPlan = filePath; // Update data with file path
                    mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'businessPlanDetails.index': data.index },
                        {
                            'businessPlanDetails.$[e1].businessPlanYear': data.businessPlanYear,
                            'businessPlanDetails.$[e1].businessPlanFor2021': data.businessPlanFor2021,
                            'businessPlanDetails.$[e1].uploadBusinessPlan': filePath, // Update with new file path
                        }, { arrayFilters: [{ 'e1.index': data.index }] },
                        "FPOmaster", function (response1) {
                            updateProfileDate(data.fpoCode);
                            // Remove old file
                            fs.unlink(oldFilePath, function (err) {
                                if (err) {
                                    console.log("Error deleting file:", err);
                                }
                            });
                            callback(response1);
                        });
                }
            });
        } else {
            callback({ status: false, message: "Data not found" });
        }
    });
}

exports.deleteBusinessDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'businessPlanDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}



exports.AddRoCData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'rocDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$rocDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$rocDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { rocDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}
exports.updateRoCData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'rocDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'rocDetails.index': data.index },
                {
                    'rocDetails.$[e1].RoCYear': data.RoCYear,
                    'rocDetails.$[e1].RoCFillingDone': data.RoCFillingDone,
                    'rocDetails.$[e1].uploadRoC': data.uploadRoC,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteRoCDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'rocDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}


exports.AddKycData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'kycDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$kycDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$kycDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        console.log(response, 'kyccccccccccDetailsssssss');
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { kycDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}
exports.updateKycData = function (data, callback) {
    console.log(data, "updatekyccccccccccccc");
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'kycDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'kycDetails.index': data.index },
                {
                    'kycDetails.$[e1].kycYear2021': data.kycYear2021,
                    'kycDetails.$[e1].kycData': data.kycData,
                    'kycDetails.$[e1].kycUpload': data.kycUpload,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })

        }
    })
}

exports.deleteKycDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'kycDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}


exports.AddItrData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'itrDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$itrDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$itrDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        console.log(response, 'kyccccccccccDetailsssssss');
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { itrDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}
exports.updateItrData = function (data, callback) {
    console.log(data, "updateRoc");
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'itrDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'itrDetails.index': data.index },
                {
                    'itrDetails.$[e1].itrYear': data.itrYear,
                    'itrDetails.$[e1].itrFillingDone': data.itrFillingDone,
                    'itrDetails.$[e1].itrUpload': data.itrUpload,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteItrDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'itrDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}



exports.AddAnnualAuditData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'auditDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$auditDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$auditDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { auditDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}
exports.updateAnnualAuditData = function (data, callback) {
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'auditDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'auditDetails.index': data.index },
                {
                    'auditDetails.$[e1].auditYear': data.auditYear,
                    'auditDetails.$[e1].annualAuditDone': data.annualAuditDone,
                    'auditDetails.$[e1].auditUpload': data.auditUpload,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}

exports.deleteAnnualAuditDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'auditDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}

exports.AddeNamData = function (data, callback) {
    let aggrigation = [
        {
            '$match': {
                'fpoId': data.fpoCode,
                'eNamDetails': {
                    '$exists': true
                }
            }
        }, {
            '$unwind': '$eNamDetails'
        }, {
            '$project': {
                '_id': 0,
                'index': '$eNamDetails.index'
            }
        }, {
            '$sort': {
                'index': -1
            }
        }
    ]
    mongo.queryWithAggregator(aggrigation, "FPOmaster", function (response) {
        if (response.length > 0) {
            data.index = response[0].index + 1;
        } else {
            data.index = 0;
        }
        mongo.updatePush({ fpoId: data.fpoCode }, { eNamDetails: data }, 'FPOmaster', function (response2) {
            updateProfileDate(data.fpoCode);
            callback({ status: true, message: "Data added successfully" })
        })

    })
}
exports.updateeNamData = function (data, callback) {
    console.log(data, "updateenam");
    mongo.findOne('FPOmaster', { fpoId: data.fpoCode, 'eNamDetails.index': data.index }, function (response) {
        if (response) {
            mongo.updateWithArrayFilter({ fpoId: data.fpoCode, 'eNamDetails.index': data.index },
                {
                    'eNamDetails.$[e1].eNamYear': data.eNamYear,
                    'eNamDetails.$[e1].eNamTrading': data.eNamTrading,
                    'eNamDetails.$[e1].eNamRegister': data.eNamRegister,
                }, { arrayFilters: [{ 'e1.index': data.index }] },
                "FPOmaster", function (response1) {
                    updateProfileDate(data.fpoCode);
                    callback(response1);
                })
        }
    })
}
exports.deleteeNamDetails = function (data, callback) {
    mongo.update({ fpoId: data.fpoCode }, { 'eNamDetails': { index: data.index } }, 'FPOmaster', function (response) {
        updateProfileDate(data.fpoCode);
        callback(response)
    })

}










// exports.getFpoContactForSendMessage = function (callback) {
//     let aggregation = [
//         {
//           '$project': {
//             '_id': 0,
//             'fpoName': 1,
//             'fpoId': 1,
//             'contactNo': '$FPOData.fpoContactNo',
//             'mailId': '$FPOData.fpoMailId'
//           }
//         }
//       ]
//       mongo.queryWithAggregator(aggregation, "FPOmaster", function (response1) {
//         callback(response1)
//     })
//   }