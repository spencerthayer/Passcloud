/*<script>*/
function elementById(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (document.all) {
		return document.all[id];
	}
		return document.layers[id];
}
function generatePassword(varPass){
	/* CREDIT: http://dandyer.co.uk/password/index.php */
		if ((window.document.formCloud.site.value == "") || (window.document.formCloud.master.value == "")) {
			elementById("site").setAttribute("class", "required");
			elementById("site").setAttribute("className", "required"); // for IE
			elementById("master").setAttribute("class", "required");
			elementById("master").setAttribute("className", "required"); // for IE
			return;
		}
		else {
			//GENERATES PASSWORD
			site = elementById("site");
			profile = elementById("profile");
			master = elementById("master");
			countVal = elementById("countVal");
			text = site.value+profile.value+master.value+countVal.value;
			sha256_init();
			sha256_update(text, text.length);
			sha256_final();
			hash = sha256_encode_bytes();
			result = elementById("result");
			password = String.fromCharCode.apply(String, hash);
			hashPass = password+password+password+password+password+password;
			result.value = window.btoa(hashPass).substring(0,countVal.value);
			//STYLES FORM FIELDS
			elementById("site").setAttribute("class", "site");
			elementById("site").setAttribute("className", "site"); // for IE
			elementById("master").setAttribute("class", "master");
			elementById("master").setAttribute("className", "master"); // for IE
			elementById("result").setAttribute("class", "resultOn");
			elementById("result").setAttribute("className", "resultOn"); // for IE
			//window.document.formCloud.result.focus();
			//window.document.formCloud.result.select();
			return;
		}
}
//HIDE DIVS
  function toggleDiv(divid){
	if(elementById(divid).style.display == 'none !important'){
		elementById(divid).style.display = 'block';
	}else{
		elementById(divid).style.display = 'none';
	}
  }
//SELECT ALL
function SelectAll(id) {
	elementById(id).focus();
	elementById(id).select();
}
/*function resultOn() {
	var e = document.getElementById("result");
	e.setAttribute("class", "resultOn");
	e.setAttribute("className", "resultOn"); // for IE
	return;
}*/
function fieldOff() {
	elementById("site").setAttribute("class", "fieldOn");
	elementById("site").setAttribute("className", "fieldOn"); // for IE
	elementById("profile").setAttribute("class", "fieldOff");
	elementById("profile").setAttribute("className", "fieldOff"); // for IE
	elementById("master").setAttribute("class", "fieldOn");
	elementById("master").setAttribute("className", "fieldOn"); // for IE
	elementById("result").setAttribute("class", "fieldOff");
	elementById("result").setAttribute("className", "fieldOff"); // for IE
	return;
}
function fieldOn(id) {
	elementById(id).setAttribute("class", "fieldOn");
	elementById(id).setAttribute("className", "fieldOn"); // for IE
	//var e = document.getElementById("profile");
	//e.setAttribute("class", "fieldOn");
	//e.setAttribute("className", "fieldOn"); // for IE
	return;
}
//ESCAPE KEY CLEARS FORM
var keycount=0;
function clearEsc() {
	if(event.keyCode==27) {
		keycount++;
		if(keycount==2) {
			window.document.formCloud.reset();
			window.document.formCloud.site.select();
			return;
		}
	}
}
//DISABLES ENTER KEY
	$('html').bind('keypress', function(e) { if(e.keyCode == 13) { return false } });
	//$('html').bind('keypress', function(e) { if(e.keyCode == 13) { generatePassword(); } });
//CLICKING CHANGES
        $(document).on('click', ".external", function (e) {
            e.preventDefault();
            var targetURL = $(this).attr("href");
            window.open(targetURL, "_system");
        });
//OTHERIZE DROPDOWN
(function ($) {
    $.fn.otherize = function (option_text, texts_placeholder_text) {
        oSel = $(this);
        option_id = oSel.attr('id') + '_other';
        textbox_id = option_id + "_tb";
        this.append("<option value=\"\" id=\"" + option_id + "\" class=\"otherize\">" + option_text + "</option>");
        this.after("<input type=\"text\" id=\"" + textbox_id + "\" class=\"required left col s3 m3 l3\" style=\"display: none; margin: 0 0 0 2vw; padding:0;\" placeholder=\"" + texts_placeholder_text + "\" />");
        this.change(
        function () {
            oTbox = oSel.parent().children('#' + textbox_id);
            oSel.children(':selected').hasClass('otherize') ? oTbox.show() : oTbox.hide();
        });
        $("#" + textbox_id).change(
        function () {
            $("#" + option_id).val($("#" + textbox_id).val());
        });
    };
}(jQuery));
$(function () {
    $("#countVal").otherize("other", "#");
});
