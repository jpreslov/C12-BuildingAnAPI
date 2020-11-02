const express = require("express"),
    chirpsRouter = require("./chirps"),
    router = express.Router();

router.use("/chirps", chirpsRouter);

module.exports = router;