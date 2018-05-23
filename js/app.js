// DEFINE GLOBALS
var masterPass;
var obj;
var siteName;
var userProfile;
var charLength;
var year;
var seedNum;
var passType;
var isAlpha;
var isNumeric;
var isAmbiguous;
var isSpecial;
var isExtended;
var isYearly;
var isUnique;
var ranSyl;
var poolString;
var domainPassword;
var noUnique;
var storageID;
var syncKey;
var storageUUID;
var encryptPassword;
var selectState;
var currentYear = (new Date).getFullYear();
var formObject;
var db;
var uuid;

function randSynckey() {
    chance = new Chance();
    syncKey = chance.string({
        length: generateNumber(6, 12),
        pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
    var syncKey = syncKey;
    $(".syncKey").val(syncKey);
    // return syncKey;
    formInteraction();
    putSyncKey();
}

// GENERATE FORM PASSWORD
function formInteraction() {
    formVariables();
    useVariables();
    changeSelect();
    encryptPasswords();
    generatePassword(year, masterPass, siteName, userProfile, charLength, seedNum);
    requireFields();
    devConsole();
    updateObj();
    hidebuttons();
    putStorageUUID();
}

function requireFields() {
    if (masterPass == "") {
        domainPassword = "";
        noUnique = "";
        storageID = "";
        storageUUID = "";
        encryptPassword = "";
        $("#domainPassword").val("");
    } else if (masterPass == "" || siteName == "") {
        domainPassword = "";
        noUnique = "";
        storageID = "";
        $("#domainPassword").val("");
        inputErrorOn();
    } else {
        inputErrorOff();
    }
}

function useVariables() {
    // INPUT VALUES
    if (isAmbiguous == true) {
        ambiguous = "";
    }
    if (isAlpha == false) {
        latinLower = "";
        latinUpper = "";
    }
    if (isNumeric == false) {
        numeric = "";
    }
    if (isSpecial == false) {
        special = "";
    }
    if (isExtended == false) {
        extended = "";
    }
    if (isYearly == false) {
        year = "";
    }
    charString = latinLower + latinUpper + numeric + special + extended;
    toReplace = "[" + ambiguous + "]";
    regString = new RegExp(toReplace, "g");
    poolString = charString.replace(regString, "");
}

function devConsole() {
    console.clear();
    console.log("UUID:   " + uuid);
    console.log("Master: " + masterPass);
    // console.log("");
    console.log("#JSON");
    console.log(" ID:    " + storageID);
    console.log(" Name:  " + siteName);
    console.log(" User:  " + userProfile);
    console.log(" Char:  " + charLength);
    console.log(" Year:  " + year);
    console.log(" Type:  " + passType);
    console.log(" Seed:  " + seedNum);
    // console.log("");
    console.log("#Options");
    console.log(" Unique:    " + isUnique);
    console.log(" Alpha:     " + isAlpha);
    console.log(" Numeric:   " + isNumeric);
    console.log(" Ambiguous: " + isAmbiguous);
    console.log(" Special:   " + isSpecial);
    console.log(" Extended:  " + isExtended);
    console.log(" Yearly:    " + isYearly);
    console.log(" Select:    " + selectState);
    // console.log(" Pool:      " + poolString);
    // console.log("");
    console.log("#Passwords");
    console.log(" Pass: " + domainPassword);
    console.log(" Uniq: " + noUnique);
    // console.log("");
    console.log("#Encryption");
    console.log(" syncKey:     " + syncKey);
    console.log(" storageUUID: " + storageUUID);
    console.log(" EncryptPass: " + encryptPassword);
    // console.log(encryptForm(obj));
    // updateObj();
    // dencryptForm();
}