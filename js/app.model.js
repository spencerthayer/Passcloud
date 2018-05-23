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
    extended = "¡¢£¤¥¦§¨™©®ª°±µ¿×÷";
    supplimentLower = "àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ";
    supplimentUpper = "ÀÁÂÃÄÅÆÇÈÉÊËÌÌÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞß";
}
//https://www.grc.com/haystack.htm