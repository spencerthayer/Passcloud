  $("#optionsMenu").click(function() {
      $("#optionsArrow").html("&#8673;");
      $("#optionsMenu").click(function() {
          $("#optionsArrow").html("&#8675;");
      });
  });
  // $("#optionsMenu").toggle(function() {
  //     $("#optionsArrow").html("&#8673;");
  // }, function() {
  //     $("#optionsArrow").html("&#8675;");
  // });
  var currentYear = (new Date).getFullYear();
  $("#year").val(currentYear);
  $(document).ready(function() {
      //   $("select").material_select();
      $("#charLength").material_select();
      $("#passType").material_select();
  });
  // DISABLES ENTER KEY
  $("html").bind("keypress", function(e) {
      if (e.keyCode == 13) {
          return false
      }
  });
  // CLICKING CHANGES
  $(document).on("click", ".external", function(e) {
      e.preventDefault();
      var targetURL = $(this).attr("href");
      window.open(targetURL, "_system");
  });
  // GENERATE THE PASSWORD
  function generatePassword() {
      // INPUT VALUES
      var year = $("#year").val();
      var masterPass = $("#masterPass").val();
      var siteName = $("#siteName").val();
      var userProfile = $("#userProfile").val();
      var charLength = $("#charLength").val();
      var passType = $("#passType").val();
      var seedNum = $("#seedNum").val();
      var isAlpha = $("#alpha")[0].checked;
      var isNumeric = $("#numeric")[0].checked;
      var isAmbiguous = $("#ambiguous")[0].checked;
      var isSpecial = $("#special")[0].checked;
      var isExtended = $("#extended")[0].checked;
      var isYearly = $("#yearly")[0].checked;
      // CHARACTERS STRING CREATION
      var ambiguous = "_iIL1ll|o0O";
      var numeric = "1234567890";
      var latinLower = "abcdefghijklmnopqrstuvwxyz";
      var latinUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var symbols = "";
      var special = "!@#$%^&*_-=+`~()[]{};:\'\",.\<\>?\/\\|";
      var extended = "¡¢£¤¥¦§¨©ª®°±µ¿";
      var supplimentLower = "àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
      var supplimentUpper = "ÀÁÂÃÄÅÆÇÈÉÊËÌÌÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß";
      if (isAmbiguous == true) {
          ambiguous = "";
      }
      if (isAlpha == false) {
          var latinLower = "";
          var latinUpper = "";
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
      var charString = latinLower + latinUpper + numeric + symbols + special + extended;
      var toReplace = "[" + ambiguous + "]";
      var regString = new RegExp(toReplace, "g");
      var poolString = charString.replace(regString, "");
      var chanceHash = new Chance(
          year,
          masterPass,
          siteName,
          userProfile,
          charLength,
          seedNum
      );
      var chanceEncrypt = new Chance(masterPass);
      var chanceHash = new Chance(
          year,
          masterPass,
          siteName,
          userProfile,
          charLength,
          seedNum
      );
      var chancePassword;
      var ranInt = chanceHash.integer({ min: 5, max: 10 });
      var ranSyl = chanceHash.integer({ min: 2, max: 4 });
      if (passType == "password") {
          domainPassword = chanceHash.string({
              length: charLength,
              pool: poolString
          });
          //   $("#charLength").attr("disabled", false);
          //   $("#charLength").material_select();
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
          //   $("#charLength").attr("disabled", true);
          //   $("#charLength").material_select();
      } else if (passType == "noun") {
          domainPassword = chanceHash.word({
              syllables: ranSyl
          });
          domainPassword = chance.capitalize(domainPassword);
          //   $("#charLength").attr("disabled", true);
          //   $("#charLength").material_select();
      } else if (passType == "username") {
          domainPassword = chanceHash.string({
              length: 12,
              pool: latinLower + numeric
          });
          //   $("#charLength").attr("disabled", true);
          //   $("#charLength").material_select();
      } else if (passType == "salt") {
          domainPassword = chanceHash.string({
              length: 64,
              pool: latinLower + latinUpper + numeric
          });
          //   $("#charLength").attr("disabled", true);
          //   $("#charLength").material_select();
      }
      encryptPassword = chanceEncrypt.string({
          length: 128,
          pool: latinLower + latinUpper + numeric + symbols + special + extended + supplimentLower + supplimentUpper
      });

      //STYLES FORM FIELDS
      //   var masterPass = $("#masterPass").val();
      //   var siteName = $("#siteName").val();
      //   var userProfile = $("#userProfile").val();
      //   var charLength = $("#charLength").val();
      //   var seedNum = $("#seedNum").val();
      //   var isSpecial = $("#special")[0].checked;
      //   var isAmbiguous = $("#ambiguous")[0].checked;
      //   var isExtended = $("#extended")[0].checked;

      function devConsole() {
          console.clear();
          console.log("Alpha: " + isAlpha);
          console.log("Numeric: " + isNumeric);
          console.log("Ambiguous: " + isAmbiguous);
          console.log("Special: " + isSpecial);
          console.log("Extended: " + isExtended);
          console.log("Yearly: " + isYearly);
          console.log("Year: " + year);
          console.log("Master: " + masterPass);
          console.log("Name: " + siteName);
          console.log("User: " + userProfile);
          console.log("Char: " + charLength);
          console.log("Seed: " + seedNum);
          console.log("Rand: " + ranInt + "," + ranSyl);
          console.log("Type: " + passType);
          console.log("Pool: " + poolString);
          console.log("Pass: " + domainPassword);
          console.log("Encryption Pass: " + encryptPassword)
      }
      devConsole();
      $("#domainPassword").val(domainPassword);
  }
  // elementById("siteName").setAttribute("class", "site");
  // elementById("siteName").setAttribute("className", "site"); // for IE
  // elementById("masterPass").setAttribute("class", "master");
  // elementById("masterPass").setAttribute("className", "master"); // for IE
  // elementById("domainPassword").setAttribute("class", "resultOn");
  // elementById("domainPassword").setAttribute("className", "resultOn"); // for IE
  // elementById("site").setAttribute("class", "required");
  // elementById("site").setAttribute("className", "required"); // for IE
  // elementById("master").setAttribute("class", "required");
  // elementById("master").setAttribute("className", "required"); // for IE

  //   function fieldOff() {
  //       elementById("site").setAttribute("class", "fieldOn");
  //       elementById("site").setAttribute("className", "fieldOn"); // for IE
  //       elementById("profile").setAttribute("class", "fieldOff");
  //       elementById("profile").setAttribute("className", "fieldOff"); // for IE
  //       elementById("master").setAttribute("class", "fieldOn");
  //       elementById("master").setAttribute("className", "fieldOn"); // for IE
  //       elementById("result").setAttribute("class", "fieldOff");
  //       elementById("result").setAttribute("className", "fieldOff"); // for IE
  //       return;
  //   }

  //   function fieldOn(id) {
  //       elementById(id).setAttribute("class", "fieldOn");
  //       elementById(id).setAttribute("className", "fieldOn"); // for IE
  //       //var e = document.getElementById("profile");
  //       //e.setAttribute("class", "fieldOn");
  //       //e.setAttribute("className", "fieldOn"); // for IE
  //       return;
  //   }