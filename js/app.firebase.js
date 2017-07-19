function updateObj() {
    var obj = {
        "ID": storageID,
        "siteName": siteName,
        "userProfile": userProfile,
        "charLength": charLength,
        "seedNum": seedNum,
        "passType": passType,
        "isUnique": isUnique,
        "isAlpha": isAlpha,
        "isNumeric": isNumeric,
        "isAmbiguous": isAmbiguous,
        "isSpecial": isSpecial,
        "isExtended": isExtended,
        "isYearly": isYearly
    };
    return obj;
}

function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyBIX1Avd5FAk1I0FZl0gAdl8fhJ8XJsFCQ",
        databaseURL: "https://passcloud-590e4.firebaseio.com"
    };
    firebase.initializeApp(config);
}
initializeFirebase();

function firebaseConnection() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.clear();
            console.log("Connected to database!");
            Materialize.toast("Connected to database!", 1500);
            getStorage();
            console.log(syncKey);
            console.log(storageUUID);
            console.log(encryptPassword);
            readData();
        } else {
            console.clear();
            console.log("Disconnected from database!");
            Materialize.toast("Disconnected from database!", 1500);
        }
    });
}
firebaseConnection()

function signIn() {
    firebase.auth().signInAnonymously().then(function(user) {
        // console.log(user);
        window.uuid = user.uid;
        return window.uuid;
    }).catch(function(error) {
        console.log(error.message);
    });
    firebase.auth().onAuthStateChanged(user => {
        // console.log(user.uid);
        window.uuid = user.uid;
        return window.uuid;
    });
}
signIn();

function signOut() {
    firebase.auth().signOut();
}
// signOut();

function saveForm() {
    // updateObj();
    // data = obj;
    encryptForm(updateObj());
    firebase.database().ref("data/" + storageUUID + "/" + storageID).set({
        ciphertext
    });
    // console.log(storageUUID);
    console.log(storageID + ":" + ciphertext);
    return firebase.database().ref(storageUUID + "/" + storageID);
}

function readData() {
    var query = firebase.database().ref("data/" + storageUUID).orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(data) {
                // console.clear();
                key = data.key;
                // console.log(key);
                value = data.val();
                // console.log(value);
                data = value.ciphertext;
                // console.log(data);
                decryptForm(data);
                putObjects(key, decryptedData);
                console.log(decryptedData);
            });
        });

}

function sync() {
    readData();
}

// function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('data/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl
//     });
// }

// function writeNewPost(uid, username, picture, title, body) {
//     // A post entry.
//     var postData = {
//         author: username,
//         uid: uid,
//         body: body,
//         title: title,
//         starCount: 0,
//         authorPic: picture
//     };

//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;

//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//     return firebase.database().ref().update(updates);
// }