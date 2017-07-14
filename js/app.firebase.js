function updateObj() {
    obj = {
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
            // alert("connected");
            Materialize.toast("Connected to database!", 1500);
        } else {
            // alert("not connected");
            Materialize.toast("Disconnected from database!", 1500);
        }
    });
}
firebaseConnection()

function signIn() {
    firebase.auth().signInAnonymously().then(function(user) {
        console.log(user);
        window.uuid = user.uid;
        return window.uuid;
    }).catch(function(error) {
        console.log(error.message);
    });
    firebase.auth().onAuthStateChanged(user => {
        console.log(user.uid);
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
    encryptForm(obj);
    firebase.database().ref(storageUUID + "/" + storageID).set({
        ciphertext
    });
    // return firebase.database().ref().update(updates);
    return firebase.database().ref(storageUUID + "/" + storageID);
}


function readData() {
    var query = firebase.database().ref(storageUUID).orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(data) {
                key = data.key;
                value = data.val();
                cypher = value.ciphertext;
                console.log(key);
                // console.log(cypher);
                decryptForm(cypher);
            });
        });

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