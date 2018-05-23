function putStorageUUID() {
    localStorage.setItem("storageUUID", storageUUID);
    localStorage.setItem("encryptPassword", encryptPassword);
    // putSyncKey();
}

function putSyncKey() {
    localStorage.setItem("syncKey", syncKey);
    $(".syncKey").val(syncKey);
    // putStorageUUID();
}

function putObjects(key, value) {
    // localStorage.setItem(key, value);
    localStorage.setItem("_" + key, JSON.stringify(value));
}

function getStorage() {
    window.syncKey = localStorage.getItem("syncKey");
    window.storageUUID = localStorage.getItem("storageUUID");
    window.encryptPassword = localStorage.getItem("encryptPassword");
    $(".syncKey").val(syncKey);
}
getStorage();