class LeakyBucket {
    constructor(maxBucketSize, requestProcessPerSecond){
        this.capacity = maxBucketSize;
        this.reqProcessRate = requestProcessPerSecond;
        this.bucket = [];
        this.lastProcessedRequestTime = Date.now()
    }

    processRequest(){

        const now = Date.now();
        const elapsedTime = (now - this.lastProcessedRequestTime) / 1000;

        const requestShouldHaveBennProcessed = Math.floor(elapsedTime * this.reqProcessRate);

        /**
         * Simulates a real-time system for processing requests.
         *
         * In a real-world system, requests are automatically processed and removed from the queue
         * as they are handled. This process typically happens in the background, with each request
         * being served at a rate that the system can handle.
         *
         * In this simulation, when a new request arrives, we calculate how many requests could
         * have been processed since the last processing event. After that, we remove the processed
         * requests from the queue to simulate the passage of time and the processing of the requests.
         */
        if (requestShouldHaveBennProcessed > 0) {
            this.bucket.splice(0, requestShouldHaveBennProcessed);//empty queue
            this.lastProcessedRequestTime = now;
        }


        /**
         * Simply adding request to bucket/queue if capacity allows
         */
        if (this.bucket.length < this.capacity) {
            this.bucket.push(now);
            return true;
        }

        return false;
    }
}

module.exports = LeakyBucket;