const express = require("express"),
    apiRouter = require("./routes"),
    app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(express.static("client"));

app.listen(3000);