const express = require("express");
const LeakyBucket = require("./server/LeakyBucket");
const app = express();
const bucket = new LeakyBucket(3, 1);
app.use((req, res, next) => {
    if (bucket.processRequest()) {
        next();
    } else {
        res.status(429).send("Too many requests. Try again later.");
    }
});

app.get("/", (req, res) => res.send("Welcome to rate Limiting Implementation!"));

app.listen(3000, () => console.log("Server running on port 3000"));