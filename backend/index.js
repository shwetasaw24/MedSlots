const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://medslots.firebaseio.com"
});

const db = admin.firestore();  // Firestore instance

console.log("Firebase Admin SDK initialized successfully!");

module.exports = admin;
