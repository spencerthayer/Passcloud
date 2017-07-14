function encryptForm(xvar) {
    ciphertext = CryptoJS.AES.encrypt(JSON.stringify(xvar), encryptPassword);
    ciphertext = ciphertext.toString();
    return ciphertext;
    // console.log(ciphertext);
}

function decryptForm(xvar) {
    var bytes = CryptoJS.AES.decrypt(xvar.toString(), encryptPassword);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log(decryptedData);
}