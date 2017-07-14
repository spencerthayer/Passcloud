function saveForm() {
    getFormVars();
    storageInstance();
    addTodo("test");
    // showTodos();
}

function getFormVars() {
    formObject = {
        "id": storageID,
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
    return formObject;
}

function storageInstance() {
    db = new PouchDB('todos');
    remoteCouch = false;
    return db;
}

function addTodo(text) {
    var todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: true
    };
    db.put(todo, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}

function showTodos() {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        redrawTodosUI(doc.rows);
    });
}