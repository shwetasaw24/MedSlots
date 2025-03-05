const express = require("express");
const db = require("../firebaseConfig"); // Import Firestore
const router = express.Router();

// ✅ Get Available Slots for a Doctor
router.get("/available-slots/:doctorId/:date", async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        const clinicsSnapshot = await db.collection("Clinics").where("doctorId", "==", doctorId).get();

        if (clinicsSnapshot.empty) {
            return res.status(404).json({ message: "No clinic found for this doctor." });
        }

        let clinicData;
        clinicsSnapshot.forEach(doc => { clinicData = doc.data(); });

        const dayOfWeek = new Date(date).toLocaleString("en-US", { weekday: "long" });

        if (!clinicData.availability[dayOfWeek]) {
            return res.status(400).json({ message: "Doctor is not available on this day." });
        }

        let availableSlots = [...clinicData.availability[dayOfWeek]];

        // Fetch booked slots
        const appointmentSnapshot = await db.collection("Appointments")
            .where("doctorId", "==", doctorId)
            .where("date", "==", date)
            .get();

        appointmentSnapshot.forEach(doc => {
            const appointment = doc.data();
            availableSlots = availableSlots.filter(slot => slot !== appointment.time);
        });

        res.status(200).json({ availableSlots });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Book an Appointment
router.post("/book-appointment", async (req, res) => {
    try {
        const { doctorId, patientId, date, time } = req.body;

        // Check if slot is available
        const appointmentSnapshot = await db.collection("Appointments")
            .where("doctorId", "==", doctorId)
            .where("date", "==", date)
            .where("time", "==", time)
            .get();

        if (!appointmentSnapshot.empty) {
            return res.status(400).json({ message: "Time slot is already booked!" });
        }

        // Create appointment
        await db.collection("Appointments").add({
            doctorId,
            patientId,
            date,
            time,
            status: "Booked"
        });

        res.status(200).json({ message: "Appointment booked successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
