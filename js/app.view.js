// DISABLES ENTER KEY
$("html").keypress(function(event) {
    if (event.keyCode == 13) {
        document.activeElement.blur();
        $("input").blur();
        return false;
    }
});

// READY MATERIAL SELECTS
$(document).ready(function() {
    $("#charLength").material_select();
    $("#passType").material_select();
});

// READY MATERIAL MODALS
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
    edge: "right",
    closeOnClick: false,
    draggable: true,
    onOpen: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is opened
    onClose: function(el) { /* Do Stuff */ } // A function to be called when sideNav is closed

});

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

// function suppressKeyboard() {
//         $("#domainPassword").blur();
// }

// CLIPBOARD
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

// CHANGE OPTIONS ARROW
$("#optionsMenu").click(function() {
    if ($("#optionsMenu").attr("data-open") == "no") {
        $("#optionsMenu").attr("data-open", "yes");
        $("#optionsArrow").html("&#8673;");
    } else {
        $("#optionsMenu").attr("data-open", "no");
        $("#optionsArrow").html("&#8675;");
    }
});

// CLEAR FORM BUTTON
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
    // formInteraction();
}

// CLEAR INPUT BUTTON
function clearInput(id) {
    $(id).val("").focus().select();
    formInteraction();
}

function hidebuttons() {
    if (syncKey == "" || syncKey == undefined || syncKey == null) {
        $("#save").css("display", "none");
    } else if (storageID == "" || storageID == undefined || storageID == null) {
        $("#save").css("display", "none");
    } else {
        $("#save").css("display", "inline");
    }
    if (masterPass == "" || masterPass == undefined || masterPass == null) {
        $("#sync").css("display", "none");
    } else {
        $("#sync").css("display", "inline");
    }
}
hidebuttons();


// INPUT REQUIREMENT ALERTS
function inputErrorOn() {
    $("#masterPass").attr("class", "inputError");
    $("#siteName").attr("class", "inputError");
}

function inputErrorOff() {
    $("#masterPass").removeAttr("class", "inputError");
    $("#siteName").removeAttr("class", "inputError");
}

// PARSE AND RENDER READ ME FILE 
$.get("./readme.md", function(data) {
    document.getElementById("readme").innerHTML =
        marked(data);
     }, "html");

$(document).ready(function() {
$('select').material_select();
});