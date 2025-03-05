const express = require("express");
const db = require("../firebaseConfig"); // Import Firestore
const router = express.Router();

// ✅ Add Clinic & Doctor Availability
router.post("/add-clinic", async (req, res) => {
    try {
        const { clinicId, name, doctorId, location, availability } = req.body;

        await db.collection("Clinics").doc(clinicId).set({
            name,
            doctorId,
            location,
            availability
        });

        res.status(200).json({ message: "Clinic added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
