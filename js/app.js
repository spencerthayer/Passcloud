// SETUP GLOBALS
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
var encryptPassword;
var currentYear = (new Date).getFullYear()

$(document).ready(function() {
    // $("select").material_select();
    $("#charLength").material_select();
    $("#passType").material_select();
});
//CLIPBOARD AND PASS REVEAL
function revealPass() {
    $("#domainPassword").attr("type", "text");
}

function hidePass() {
    $("#domainPassword").attr("type", "password").focus().blur();
}
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

$("#optionsMenu").click(function() {
    if ($("#optionsMenu").attr("data-open") == "no") {
        $("#optionsMenu").attr("data-open", "yes");
        $("#optionsArrow").html("&#8673;");
    } else {
        $("#optionsMenu").attr("data-open", "no");
        $("#optionsArrow").html("&#8675;");
    }
});;

function writeYear() {
    $("#year").val(currentYear);
    $("#year").attr("value", currentYear);
}
writeYear();

function saveForm() {}

function clearForm() {
    console.clear();
    $("#formCloud").trigger("reset");
    writeYear();
}
// DISABLES ENTER KEY
// $("html").bind("keypress", function(e) {
//     if (e.keyCode == 13) {
//         document.activeElement.blur();
//         $("input").blur();
//         return false
//     };
// });
$("html").keypress(function(event) {
    if (event.keyCode == 13) {
        document.activeElement.blur();
        $("input").blur();
        return false;
    }
});
// CLICKING CHANGES
// $(document).on("click", ".external", function(e) {
//     e.preventDefault();
//     var targetURL = $(this).attr("href");
//     window.open(targetURL, "_system");
// });
// GENERATE THE PASSWORD
function generatePassword() {
    // INPUT VALUES
    year = $("#year").val();
    masterPass = $("#masterPass").val();
    siteName = $("#siteName").val();
    userProfile = $("#userProfile").val();
    charLength = $("#charLength").val();
    passType = $("#passType").val();
    seedNum = $("#seedNum").val();
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
    // alchemical = "🜀🜁🜂🜃🜄🜅🜆🜇🜈🜉🜊🜋🜌🜍🜎🜏🜐🜑🜒🜓🜔🜕🜖🜗🜘🜙🜚🜛🜜🜝🜞🜟🜠🜡🜢🜣🜤🜥🜦🜧🜨🜩🜪🜫🜬🜭🜮🜯🜰🜱🜲🜳🜴🜵🜶🜷🜸🜹🜺🜻🜼🜽🜾🜿🝀🝁🝂🝃🝄🝅🝆🝇🝈🝉🝊🝋🝌🝍🝎🝏🝐🝑🝒🝓🝔🝕🝖🝗🝘🝙🝚🝛🝜🝝🝞🝟🝠🝡🝢🝣🝤🝥🝦🝧🝨🝩🝪🝫🝬🝭🝮🝯🝰🝱🝲🝳";
    // emoji = "😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷🙁🙂🙃🙄";
    // mahjong = "🀀🀁🀂🀃🀄🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪🀫";

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
    var charString = latinLower + latinUpper + numeric + special + extended;
    toReplace = "[" + ambiguous + "]";
    regString = new RegExp(toReplace, "g");
    poolString = charString.replace(regString, "");
    chanceHash = new Chance(
        year,
        masterPass,
        siteName,
        userProfile,
        charLength,
        seedNum
    );
    var chanceEncrypt = new Chance(masterPass);
    // var chanceHash = new Chance(
    //     year,
    //     masterPass,
    //     siteName,
    //     userProfile,
    //     charLength,
    //     seedNum
    // );
    var chancePassword;
    ranInt = chanceHash.integer({ min: 5, max: 10 });
    ranSyl = chanceHash.integer({ min: 2, max: 4 });
    if (passType == "password" && isUnique == false) {
        domainPassword = chanceHash.string({
            length: charLength,
            pool: poolString
        });
        // $("#charLength").attr("disabled", false);
        // $("#charLength").material_select();
    }
    if (passType == "password" && isUnique == true) {
        function uniqueString(len) {
            return chanceHash.unique(chance.character, len, { pool: poolString }).join('')
        }
        domainPassword = uniqueString(charLength);
    } else if (passType == "pin") {
        domainPassword = chanceHash.string({
            length: 4,
            pool: numeric
        });
        //   $("#charLength").attr("disabled", true);
        //   $("#charLength").material_select();
    } else if (passType == "phrase") {
        domainPassword = chanceHash.sentence({
            words: ranInt
        });
    } else if (passType == "noun") {
        domainPassword = chanceHash.word({
            syllables: ranSyl
        });
        domainPassword = chance.capitalize(domainPassword);
    } else if (passType == "username") {
        domainPassword = chanceHash.string({
            length: 12,
            pool: latinLower + numeric
        });
    } else if (passType == "salt") {
        domainPassword = chanceHash.string({
            length: 64,
            pool: latinLower + latinUpper + numeric
        });
    } else if (passType == "xkcd") {
        xkcdRando = chanceHash.string({
            length: 32,
            pool: numeric
        });
        domainPassword = xkcdPass(xkcdRando, 4);
    }
    //
    encryptPassword = chanceEncrypt.string({
        length: 128,
        pool: latinLower + latinUpper + numeric + special + extended + supplimentLower + supplimentUpper
    });

    function unString(string) {
        return string.filter(function(itm, i, T) {
            return T.indexOf(itm) == i;
        });
    }
    noUnique = unString(domainPassword.split('')).join('')

    $("#domainPassword").val(domainPassword);
    $("#hiddenPassword").attr("data-clipboard-text", domainPassword);
    devConsole();
    return encryptPassword;
}

function devConsole() {
    console.clear();
    console.log("#Input");
    console.log(" Master: " + masterPass);
    console.log(" Name: " + siteName);
    console.log(" User: " + userProfile);
    console.log(" Char: " + charLength);
    console.log(" Year: " + year);
    console.log(" Seed: " + seedNum);
    console.log(" Type: " + passType);
    console.log("");
    console.log("#Options");
    console.log(" Alpha: " + isAlpha);
    console.log(" Numeric: " + isNumeric);
    console.log(" Ambiguous: " + isAmbiguous);
    console.log(" Special: " + isSpecial);
    console.log(" Extended: " + isExtended);
    console.log(" Yearly: " + isYearly);
    // console.log("");
    // console.log("#Hidden");
    // console.log(" Int: " + ranInt + "," + ranSyl);
    console.log(" Pool: " + poolString);
    console.log("");
    console.log("#Passwords");
    console.log(" Pass: " + domainPassword);
    console.log(" Uniq: " + noUnique);
    console.log(" Encryption Pass: " + encryptPassword)
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