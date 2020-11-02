const express = require("express"),
    chirpStore = require("../chirpstore"),
    router = express.Router();

    // Get all chirps
router.get("/", (req, res) => {
    const chirps = chirpStore.GetChirps();
    res.send(chirps);
});

    // Get one chirp
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = chirpStore.GetChirp(id);
    res.send(chirp);
});

    // Create new chirp
router.post("/", (req, res) => {
    const chirp = {
        username: req.body.username,
        message: req.body.message
    };
    chirpStore.CreateChirp(chirp);
    res.sendStatus(200);
});

    // Edit a chirp
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = {
        username: req.body.username,
        message: req.body.message
    };
    chirpStore.UpdateChirp(id, chirp);
    res.sendStatus(200);
});

    // Delete a chirp
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    chirpStore.DeleteChirp(id);
    res.sendStatus(200);
});

module.exports = router;