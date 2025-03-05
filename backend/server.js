const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();
const clinicsRoutes = require("./routes/clinics");
const appointmentsRoutes = require("./routes/appointments");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/clinics", clinicsRoutes);
app.use("/api/appointments", appointmentsRoutes);

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://medslots.firebaseio.com",
});

// Test route
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
