function encryptForm(xvar) {
    storageCipher = CryptoJS.AES.encrypt(JSON.stringify(xvar),encryptPassword);
    storageCipher = storageCipher.toString();
    return storageCipher;
    // console.log(storageCipher);
}

function decryptForm(xvar) {
    var bytes = CryptoJS.AES.decrypt(xvar.toString(),encryptPassword);
<<<<<<< HEAD
    var decryptedData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
    );
=======
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
>>>>>>> origin/master
    console.log(decryptedData);
}