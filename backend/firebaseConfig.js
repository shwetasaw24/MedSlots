const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // 🔒 Keep this file safe!

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://medslots.firebaseio.com"
});

const db = admin.firestore();
module.exports = db;
