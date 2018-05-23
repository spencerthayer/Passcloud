function writeYear() {
    $("#year").val(currentYear);
    $("#year").attr("value", currentYear);
}
writeYear();

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
        generatePassword();
    });
}

// RANDOM NUMBER GENERATION
function generateNumber(min, max) {
    chance = new Chance(masterPass);
    number = chance.integer({ min: min, max: max });
    return number;
}

// GENERATE PASSWORD FUNCTION
function generatePassword(year, masterPass, siteName, userProfile, charLength, seedNum) {
    chance = new Chance(
        year,
        masterPass,
        siteName,
        userProfile,
        charLength,
        seedNum
    );
    domainPassword;
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
    console.log(domainPassword);
}

// HIGH SECURITY KEY FOR STORAGE ENCRYPTION
function encryptPasswords() {
    chancePass = new Chance(masterPass);
    chanceKey = new Chance(masterPass + syncKey);
    storageUUID = chanceKey.string({
        length: 64,
        pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "_-"
    });
    encryptPassword = chancePass.string({
        length: 128,
        pool: "1234567890" + "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "!@#$%^&*_-=+`~()[]{};:,.?|" + "¡¢£¤¥¦§¨©ª®°±µ¿" + "àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ" + "ÀÁÂÃÄÅÆÇÈÉÊËÌÌÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß"
    });
}