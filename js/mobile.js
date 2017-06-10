function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') { c = c.substring(1,c.length); }
    if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length,c.length); }
  }
  return null;
}

function skipMobileSite() {
  // Skip mobile site with a cookie setting, no expiration date
  document.cookie = 'occSkipMobile=true; path=/';
}

function allowMobileSite() {
  // Just delete cookie by setting it to past date
  document.cookie = 'occSkipMobile=true; expires=Fri, 3 Aug 2001 20:47:11 UTC; path=/';
}

// Are we using iPhone or iPod to browse this site?
var mobileDetected = (
	(navigator.userAgent.match(/iPhone|iPod|blackberry|android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm(os)|windows (ce|phone)/i) != null)
//	(navigator.userAgent.match(/iPhone/i) != null) || 
//	(navigator.userAgent.match(/iPod/i) != null) ||
//	(navigator.userAgent.match(/Android/i) != null)
	);

// If not on mobile or full site was selected, use full site css
//if(!mobileDetected || getCookie("occSkipMobile") == "true") {
//  document.write("<link rel='stylesheet' href='/style.css'>");
//} else { // else use mobile css
//  document.write("<link rel='stylesheet' href='/mobile.css'>");
//}