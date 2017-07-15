// DEFINE GLOBALS
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

// READY MATERIAL SELECTS
$(document).ready(function() {
    $("#charLength").material_select();
    $("#passType").material_select();
});

// CHARACTER LENGTH SELECT CHANGES BASED ON PASSWORD TYPE
function changeSelect(id, type) {
    var selectDropdown;
    if (type == "password" && selectState != "password") {
        selectState = "password";
        charLength = "16";
        $(id).material_select("destroy");
        selectDropdown = $(id).empty().html(" ");
        selectDropdown.append(
            $("<option></option>").attr("value", "8").text("8"),
            $("<option></option>").attr("value", "12").text("12"),
            $("<option></option>").attr("value", "16").attr({ value: "16", selected: "selected" }).text("16"),
            $("<option></option>").attr("value", "24").text("24"),
            $("<option></option>").attr("value", "32").text("32"),
            $("<option></option>").attr("value", "64").text("64")
        );
        selectDropdown.trigger("contentChanged");
        $(id).material_select();
    } else if (type == "pin" && selectState != "pin") {
        selectState = "pin";
        charLength = "4";
        $(id).material_select("destroy");
        selectDropdown = $(id).empty().html(" ");
        selectDropdown.append(
            $("<option></option>").attr({ value: "4", selected: "selected" }).text("4"),
            $("<option></option>").attr("value", "6").text("6")
        );
        selectDropdown.trigger("contentChanged");
        $(id).material_select();
    } else if (type == "off") {
        selectState = "off";
        $(id).material_select("destroy");
        selectDropdown = $(id).empty().html(" ");
    }
    $(id).on("contentChanged", function() {
        // re-initialize (update)
        $(this).material_select();
        domainPasswords();
    });
}

//CLIPBOARD AND PASS REVEAL
function revealPass() {
    $("#domainPassword").attr("type", "text");
}

function hidePass() {
    $("#domainPassword").attr("type", "password").focus().blur();
}

function flashPass() {
    $("#domainPassword").attr("type", "text");
    setTimeout(function() { $("#domainPassword").attr("type", "password"); }, 250);
}
// CLIPBOARD
/* * /
function copyToClipboard() {
    revealPass();
    $("#domainPassword").select();
    document.querySelector("#domainPassword").select();
    document.queryCommandSupported("copy");
    document.queryCommandEnabled("copy");
    document.execCommand("copy"); //cut, copy or paste
    //clear selection
    if ( document.selection ) {
            document.selection.empty();
        } else if ( window.getSelection ) {
            window.getSelection().removeAllRanges();
        }
    Materialize.toast("Password copied!", 1500);
    // hidePass();
}
$("#domainPassword").tapstart(revealPass);
$("#domainPassword").tapend(copyToClipboard);
/**/
var clipboard = new Clipboard("#domainPassword", {
    target: function() {
        if ($("#domainPassword").attr("type") == "password") {
            revealPass();
        } else {
            hidePass();
        }
        return document.querySelector("#domainPassword");
    }
});
clipboard.on("success", function(e) {
    Materialize.toast("Password copied!", 1500);
    setTimeout(function() { hidePass(); }, 1500);
});
/**/

// CHANGE OPTIONS ARROW
$("#optionsMenu").click(function() {
    if ($("#optionsMenu").attr("data-open") == "no") {
        $("#optionsMenu").attr("data-open", "yes");
        $("#optionsArrow").html("&#8673;");
    } else {
        $("#optionsMenu").attr("data-open", "no");
        $("#optionsArrow").html("&#8675;");
    }
});;

// DISABLES ENTER KEY
$("html").keypress(function(event) {
    if (event.keyCode == 13) {
        document.activeElement.blur();
        $("input").blur();
        return false;
    }
});

// CLEAR BUTTONS

// CLEAR FORM
function clearForm() {
    console.clear();
    $("#formCloud").trigger("reset");
    masterPass = "";
    domainPassword = "";
    noUnique = "";
    storageID = "";
    storageUUID = "";
    encryptPassword = "";
    changeSelect("#charLength", "password");
    inputErrorOff();
    writeYear();
    generatePassword();
}

// CLEAR X's
function clearInput(id) {
    $(id).val("").focus().select();
    generatePassword();
}

function randSynckey() {
    chance = new Chance();
    syncKey = chance.string({length: generateNumber(6, 10)});
    var syncKey = syncKey;
    $(".syncKey").val(syncKey);
    // return syncKey;
    generatePassword();
    putStorage();
}

function putStorage() {
    localStorage.setItem("synckeyStore", syncKey);
    $(".syncKey").val(syncKey);
}

function getStorage() {
    var syncKey = localStorage.getItem("synckeyStore");
    $(".syncKey").val(syncKey);
}
getStorage();

// GENERATE FORM PASSWORD
function generatePassword() {
    formVariables();
    useVariables();
    changeSelect();
    encryptPasswords();
    domainPasswords();
    requireFields();
    devConsole();
    updateObj();
}

// MAKE INPUT RED IF EMPTY
function inputErrorOn() {
    $("#masterPass").attr("class", "inputError");
    $("#siteName").attr("class", "inputError");
}

function inputErrorOff() {
    $("#masterPass").removeAttr("class", "inputError");
    $("#siteName").removeAttr("class", "inputError");
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

function formVariables() {
    syncKey = $("#syncKey").val();
    masterPass = $("#masterPass").val();
    siteName = $("#siteName").val();
    userProfile = $("#userProfile").val();
    charLength = $("#charLength").val();
    passType = $("#passType").val();
    seedNum = $("#seedNum").val();
    year = $("#year").val();
    isAlpha = $("#alpha")[0].checked;
    isNumeric = $("#numeric")[0].checked;
    isAmbiguous = $("#ambiguous")[0].checked;
    isSpecial = $("#special")[0].checked;
    isExtended = $("#extended")[0].checked;
    isYearly = $("#yearly")[0].checked;
    isUnique = $("#unique")[0].checked;
    // CHARACTERS STRING CREATION
    ambiguous = "_iIL1ll|o0O";
    numeric = "1234567890";
    latinLower = "abcdefghijklmnopqrstuvwxyz";
    latinUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    special = "!@#$%^&*_-=+`~()[]{};:\'\",.\<\>?\/\\|";
    extended = "¡¢£¤¥¦§¨©ª®°±µ¿";
    supplimentLower = "àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    supplimentUpper = "ÀÁÂÃÄÅÆÇÈÉÊËÌÌÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß";
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

function domainPasswords() {
    chance = new Chance(
        year,
        masterPass,
        siteName,
        userProfile,
        charLength,
        seedNum
    );
    numPhrase = chance.integer({ min: 4, max: 8 });
    numNoun = chance.integer({ min: 2, max: 4 });
    numUsername = chance.integer({ min: 12, max: 16 });
    if (passType == "password" && isUnique == false) {
        domainPassword = chance.string({
            length: charLength,
            pool: poolString
        });
        changeSelect("#charLength", "password");
    }
    if (passType == "password" && isUnique == true) {
        function uniqueString(len) {
            return chance.unique(chance.character, len, { pool: poolString }).join('')
        }
        domainPassword = uniqueString(charLength);
        changeSelect("#charLength", "password");
    } else if (passType == "pin") {
        domainPassword = chance.string({
            length: charLength,
            pool: numeric
        });
        changeSelect("#charLength", "pin");
    } else if (passType == "phrase") {
        domainPassword = chance.sentence({
            words: numPhrase
        });
        changeSelect("#charLength", "off");
    } else if (passType == "noun") {
        domainPassword = chance.word({
            syllables: numNoun
        });
        domainPassword = chance.capitalize(domainPassword);
        changeSelect("#charLength", "off");
    } else if (passType == "username") {
        domainPassword = chance.string({
            length: numUsername,
            pool: latinLower + numeric
        });
        changeSelect("#charLength", "off");
    } else if (passType == "salt") {
        domainPassword = chance.string({
            length: 64,
            pool: latinLower + latinUpper + numeric
        });
        changeSelect("#charLength", "off");
    } else if (passType == "xkcd") {
        xkcdRando = chance.string({
            length: 32,
            pool: numeric
        });
        domainPassword = xkcdPass(xkcdRando, 4);
        changeSelect("#charLength", "off");
    }

    function unString(string) {
        return string.filter(function(itm, i, T) {
            return T.indexOf(itm) == i;
        });
    }
    noUnique = unString(domainPassword.split('')).join('')

    storageID = chance.string({
        length: generateNumber(4, 8),
        pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
    $("#domainPassword").val(domainPassword);
    // flashPass();
}

function generateNumber(min, max) {
    chance = new Chance(masterPass);
    number = chance.integer({ min: min, max: max });
    return number;
}

function encryptPasswords() {
    // CHARACTERS STRING CREATION
    chancePass = new Chance(masterPass);
    chanceKey = new Chance(masterPass + syncKey);
    // syncKey = chance.string({
    //     length: 8,
    //     pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    // });
    // chanceID = new Chance(storageID);
    storageUUID = chanceKey.string({
        length: 64,
        pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "_-"
    });
    encryptPassword = chancePass.string({
        length: 128,
        pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "!@#$%^&*_-=+`~()[]{};:\'\",.\<\>?\/\\|" + "¡¢£¤¥¦§¨©ª®°±µ¿" + "àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ" + "ÀÁÂÃÄÅÆÇÈÉÊËÌÌÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß"
    });
}

function writeYear() {
    $("#year").val(currentYear);
    $("#year").attr("value", currentYear);
}
writeYear();

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

$(".modal").modal({
    dismissible: true,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '4%',
    endingTop: '10%',
});

$(".button-collapse").sideNav({
    menuWidth: 300,
    edge: "left",
    closeOnClick: false,
    draggable: true
});