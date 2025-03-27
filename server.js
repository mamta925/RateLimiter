const express = require("express");
const LeakyBucket = require("./server/LeakyBucket/LeakyBucket");
const TokenBucket = require("./server/TokenBucket/TokenBucket");


const app = express();
const bucket = new LeakyBucket(3, 1);
const tokenBucket = new TokenBucket(8, 1);
app.use((req, res, next) => {
    if (bucket.processRequest()) {
        next();
    } else {
        res.status(429).send("Too many requests. Try again later.");
    }
});

app.get("/", (req, res) => res.send("Welcome to rate Limiting Implementation!"));
app.get("/token-bucket", async (req, res) => {
    const requestId = `Request-${Date.now()}`;
    if ( await tokenBucket.handleIncomingRequest(requestId)) {
        res.send("Request processed successfully.");
    } else {
        res.status(429).send("Too many requests. Try again later.");
    }
});


app.listen(3000, () => console.log("Server running on port 3000"));