function encryptForm(data) {
    // console.clear();
    // console.log(data);
    cipherobject = CryptoJS.AES.encrypt(JSON.stringify(data), encryptPassword);
    // console.log(cipherobject);
    ciphertext = cipherobject.toString();
    // console.log(ciphertext);
    return ciphertext;
}

function decryptForm(ciphertext) {
    bytes = CryptoJS.AES.decrypt(ciphertext.toString(), encryptPassword);
    // console.log(bytes);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log(decryptedData);
    return decryptedData;
}

/* function testEncryption() {
    console.clear();
    console.log("1__________")
    console.log(encryptPassword);
    // var data = [{ id: 1, content: "HELLO " }, { id: 2, content: "WORLD!" }]
    updateObj();
    console.log("2__________");
    data = obj;
    console.log(data);
    console.log("3__________");
    cipherobject = CryptoJS.AES.encrypt(JSON.stringify(data), encryptPassword);
    console.log(cipherobject);
    console.log("4__________");
    ciphertext = cipherobject.toString();
    console.log(ciphertext);
    console.log("5__________");
    bytes = CryptoJS.AES.decrypt(ciphertext.toString(), encryptPassword);
    console.log(bytes);
    console.log("6__________");
    // var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData);
} */