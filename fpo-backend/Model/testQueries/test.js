
// Insert array data into a document in collection
db.fpoDataDommy.aggregate([{ $match: { note_1: { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoArrayDommy.aggregate([{ $match: { 'basicdetails_fpo:note_1': a.note_1, 'basicdetails_fpo:name_FPO': a.fpoName } }, { $project: { _id: 0, } }]).forEach(function (b) {
        db.fpoDataDommy.updateOne({ _id: a._id }, { $push: { bod: b } })
    })
})

// Inserting enum details
db.fpoMasterDommy.aggregate([{ $match: { note_1: { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.insertOne({ fpoName: a.fpoName, enumeratorData: { 'enumName': a.enumName, 'enumContactNo': a.enumContactNo, 'surveyDate': a.surveyDate, 'fpoGPSdata': '' } })
})

// Inserting FPO details
db.fpoMasterDommy.aggregate([{ $match: { note_1: { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, {
        $set: {
            FPOData: {
                district: a.district,
                district_id: a.district_id,
                block_id: a.block_id,
                block: a.block,
                subDivision: a.subDivision,
                state: 'Odisha',
                gramPanchayat: a.gramPanchayat,
                village: a.village,
                noOfVillageCovered: a.noOfVillageCovered,
                coveredVillagesName: a.coveredVillagesName,
                address: a.address,
                separateOfcOfFPO: a.separateOfcOfFPO,
                fpoOfficeType: a.fpoOfficeType,
                storageFacility: a.storageFacility,
                storageArea: a.storageArea,
                fpoStorageType: a.fpoStorageType,
                imageOfOffice: a.imageOfOffice,
                fpoName: a.fpoName,
                yearOfFormation: a.yearOfFormation,
                visionOfFPO: a.visionOfFPO,
                fpoRegistrationStatus: a.fpoRegistrationStatus,
                formOfRegistration: a.formOfRegistration,
                regNoOfFPO: a.regNoOfFPO,
                dateOfReg: a.dateOfReg,
                fpoContactNo: a.fpoContactNo,
                fpoMailId: a.fpoMailId,
                noOfFarmerMember: a.noOfFarmerMember,
                noOfMaleFarmerMember: a.noOfMaleFarmerMember,
                noOfFemaleFarmerMember: a.noOfFemaleFarmerMember,
                noOfScStFarmerMember: a.noOfScStFarmerMember,
                noOfSmallOrMarginalFarmer: a.noOfSmallOrMarginalFarmer,
                shareCapitalRaisedAmount: a.shareCapitalRaisedAmount,
                paidUpCapitalAmount: a.paidUpCapitalAmount,
                shareCertificateIssueStatus: a.shareCertificateIssueStatus,
                fpoBusinessActivity: '',
                imgOfRegCerti: '',
                fpoLatitude: a.fpoLatitude,
                fpoLongitude: a.fpoLongitude
            }
        }
    })
})

// Creating userId and refNo
var count = 0
db.fpoMasterDommy.aggregate([{ $match: { note_1: { $exists: true } } }]).forEach(function (a) {
    count++
    let x = 'ODFPO' + count
    print(x)
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $set: { refNo: x } })
})
var count = 0
db.fpoMasterDommy.aggregate([{ $match: { note_1: { $exists: true } } }]).forEach(function (a) {
    count++
    let id = 'OD' + a.block.substring(0, 3).toUpperCase() + 'FPO' + count
    print(id)
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $set: { fpoId: id } })

})

// Create user id and password
db.fpoDataDommy.aggregate([{ $match: { fpoId: { $exists: true } } }]).forEach(function (a) {
    print(a.fpoId)
    db.userCredDommy.insertOne({
        refNo: a.refNo,
        fpoId: a.fpoId,
        userId: a.fpoId,
        password: 'b42458de550ef94801e7df33778c436d93bb78d3962f1020f3659db75b72cb8e3a4bb75f972c500d5a3626f74f6b69436d515b55a0344c4b29f28ad0cba56c3b',
        mobileNo: a.FPOData.fpoContactNo,
        userType: 'FPO',
        creationDate: new Date()
    })

})

// Create BOD details
db.fpoMasterBodDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $push: { boardDirectorsDetails: { serialNo: a.serialNo, name: a.name, phNumber: a.phNumber, sex: a.sex, age: a.age, educationalQual: a.educationalQual, DIN: a.DIN, panNo: a.panNo, IdNo: a.IdNo } } })
})

// Create Staff details
db.fpoMasterStaffDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $push: { staffDetails: { slNo: a.slNo, name: a.name, designation: a.designation, contactNo: a.contactNo, emailId: a.emailId, sex: a.sex } } })
})

db.fpoMasterDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $set: { organisationHelpedToCreateSPO: a.organisationHelpedToCreateSPO, creationScheme: a.creationScheme, promotedByNGO: a.promotedByNGO, ngoName: a.ngoName, keyPersonContactNo: a.keyPersonContactNo, noOfBoardDirectors: a.noOfBoardDirectors } })
})

// Secondary business details
db.fpoSecondaryBusinessDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $push: { secondaryBusinessDetails: { secBusinessNo: a.Sec_Business_no, businessActivity: a.bus1_act, productName: a.bus1_nm, businessDetails: a.bus1_dt, quantitySold: a.quantitySold, amount: a.bus1_amt, brandingDetails: a.brandingDetails } } })
})

// Account details
db.fpoMasterDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoName: a.fpoName }, { $set: { accountDetails: { haveBankAccount: a.haveBankAccount, bankName: a.bankName, branchName: a.branchName, accountNo: a.accountNo, panNo: a.panNo, tanNo: a.tanNo, haveTradeLicence: a.haveTradeLicence, tradeLicenceNo: a.tradeLicenceNo } } })
})

db.fpoAccountDetailsDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoMasterDommy.updateOne({ fpoName: a.fpoName }, { $set: { haveBankAccount: a.haveBankAccount } })
})

// Delete a field
db.fpoDataDommy.update({ accountDetails: { $exists: true } }, { $unset: { accountDetails: 1 } }, false, true)

// Rename keys in collection
db.fpoMeetingDetailsDommy.update({ 'name_FPO': { $exists: true } }, { $rename: { "name_FPO": "fpoName" } }, false, true)


// Removing lat long null value in fpo details
db.FPOmaster.aggregate([{ $match: { 'fpoName': { $exists: true }, 'FPOData.fpoLatitude': null, 'FPOData.fpoLongitude': null } }]).forEach(a => {
    print(a.fpoName)
    db.FPOmaster.update({ fpoName: a.fpoName, 'FPOData.fpoLatitude': null, 'FPOData.fpoLongitude': null }, { $set: { 'FPOData.fpoLatitude': 0, 'FPOData.fpoLongitude': 0 } }, false, true)
})


db.fpoAwardDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(a => {
    print(a.fpoName)
    db.FPOmaster.aggregate([{ $match: { fpoName: a.fpoName } }, { $project: { fpoId: 1 } }]).forEach(b => {
        db.fpoAwardDommy.update({ fpoName: a.fpoName }, { $set: { fpoId: b.fpoId } }, false, true)

    })
})



// Create award details
db.fpoAwardDommy.aggregate([{ $match: { 'fpoName': { $exists: true } } }]).forEach(function (a) {
    print(a.fpoName);
    db.FPOmaster.updateOne({ fpoId: a.fpoId }, { $push: { FPOAward: { awardNo: a.award_no, type: a.type, year: a.year, awardedOrganisation: a.awardedOrganisation } } })
})

db.fpoDataDommy.aggregate([{ $match: { 'FPOAward': { $exists: false } } }]).forEach(function (a) {
    print(a.fpoName);
    db.fpoDataDommy.updateOne({ fpoId: a.fpoId }, { $set: { FPOAward: {} } })
})

db.FPOmaster.updateMany({ 'FPOAward': { $exists: false } }, { $set: { FPOAward: [] } })



// Create FIG data start
db.figRegistrationMasterDommy.aggregate([{ $match: { village: { $exists: true } } }]).forEach(function (a) {
    let x = a.village.charAt(0).toUpperCase() + a.village.substr(1).toLowerCase()
    print(x);
    db.villageMaster.aggregate([{ $match: { villageName: x } }]).forEach(b => {
        db.figRegistrationMasterDommy.updateOne({ _id: a._id }, { $set: { village: b.villageName, villageCode: b.villageCode, gpCode: b.gpCode, blockCode: b.blockCode, distCode: b.districtCode } })
    })
})

db.figRegistrationMasterDommy.aggregate([{ $match: { gp: { $exists: true } } }]).forEach(function (a) {
    let x = a.gp.toUpperCase()
    db.gpMaster.aggregate([{ $match: { gpName: x } }]).forEach(b => {
        print(x);
        db.figRegistrationMasterDommy.updateOne({ _id: a._id }, { $set: { gp: b.gpName, gpCode: b.gpCode } })
    })
})

db.figRegistrationMasterDommy.aggregate([{ $match: { blockCode: { $exists: true } } }]).forEach(function (a) {
    db.blockMaster.aggregate([{ $match: { blockCode: a.blockCode } }]).forEach(b => {
        db.figRegistrationMasterDommy.updateOne({ _id: a._id }, { $set: { blockCode: b.blockCode, blockName: b.blockName } })
    })
})

db.figRegistrationMasterDommy.aggregate([{ $match: { district: { $exists: true } } }]).forEach(function (a) {
    db.districtMaster.aggregate([{ $match: { districtName: a.district } }]).forEach(b => {
        db.figRegistrationMasterDommy.updateOne({ _id: a._id }, { $set: { distCode: b.districtCode } })
    })
})

db.figRegistrationMasterDommy.aggregate([{ $match: { name_FPO: { $exists: true } } }]).forEach(function (a) {
    db.fpoDataDommy.aggregate([{ $match: { fpoName: a.name_FPO } }]).forEach(b => {
        db.figRegistrationMasterDommy.updateOne({ _id: a._id }, { $set: { fpo: { fpoId: b.fpoId, fpoName: b.fpoName, refNo: b.refNo } } })
    })
})

db.figRegistrationMasterDommy.update({ 'blockName': { $exists: true } }, { $rename: { "blockName": "block" } }, false, true)

var count = 0
db.figRegistrationMasterDommy.aggregate([{ $match: { 'fpo': { $exists: true } } }]).forEach(function (a) {
    count++
    let x = 'OD' + a.blockCode + 'FG' + count
    db.figRegistrationMasterDommy.updateOne({ _id: a._id }, { $set: { refNo: x } })
})


db.figRegistrationMasterDommy.aggregate([{ $match: { refNo: { $exists: true } } }]).forEach(function (a) {
    db.userCredDommy.insertOne({ refNo: a.refNo, userId: a.refNo, password: a.password, mobileNo: '', userType: 'FIG', creationDate: new Date() })
})
// Create FIG data end

// Create schemes availed
db.fpoMasterDommy1.aggregate([{ $match: { fpoName: { $exists: true } } }]).forEach(function (a) {
    db.FPOmaster.aggregate([{ $match: { fpoName:a.fpoName} }]).forEach(function (b) {

    db.FPOmaster.updateOne({ _id: b._id }, { $set: { schemesAvailed: {haveAvailedEquityGrant:a.haveAvailedEquityGrant,organisationHelped:a.organisationHelped,equityGrantDetails:a.equityGrantDetails,amountGranted:a.amountGranted,haveCreditGuaranteeScheme:a.haveCreditGuaranteeScheme,organiExtendedCredGuarantee:'',credAvailedDetails:a.schemeAvailedDetails,credAvldAmount:'',haveOtherScheme:a.haveOtherScheme,schemeAvailedDetails:a.schemeAvailedDetails,haveAvailedLoan:'',sourceOfLoan:'',loanClosedStatus:'',loanAmountRemaining:'',haveMissedEMI:'',missingEMIReason:''} } })
    })
})

db.fpoMasterDommy.update({ 'fpoName': { $exists: true } }, { $rename: { "schemesAvailed.haveAvailedEquityGrant": "haveAvailedEquityGrant" } }, false, true)

db.newDistListDommy.aggregate([{ $match: { distId: { $exists: true } } }]).forEach(function (a) {
    db.FPOmaster.update({'FPOData.district':a.name}, { $set: { 'FPOData.districtCode':a.distId,distUpdated:true}  })
})

