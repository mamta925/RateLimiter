// export class TokenBucket{
//     constructor(tokenBucketSize, reqPerSecond, tokenAddedPerSecond) {
//
//         this.tokenBucket = {size: tokenBucketSize, tokenCount:0,tokenAddedPerSecond : tokenAddedPerSecond}
//         this.reqProcessRate= reqPerSecond;
//         this.lastProcessedRequestTime = Date.now()
//     }
//
//     processRequest(){
//
//         const now = Date.now();
//         const elapsedTime = (now - this.lastProcessedRequestTime) / 1000;
//         this.lastProcessedRequestTime = now;
//
//         if(elapsedTime>= 0 ){
//             this.tokenBucket.tokenCount += elapsedTime * this.tokenBucket.tokenAddedPerSecond;
//             if(this.tokenBucket.count > this.tokenBucket.size){
//                 this.tokenBucket.count = this.tokenBucket.size;
//             }
//         }
//
//         if(this.tokenBucket.count){
//             this.tokenBucket.count--;
//             return true
//         }
//         return  false;
//     }
// }

class TokenBucket {
    constructor(maxTokens, refillRate) {
        this.maxTokens = maxTokens;
        this.tokens = maxTokens;
        this.refillRate = refillRate;
        this.startRefill();
    }

    hasTokens() {
        return this.tokens > 0;
    }

    consumeToken() {
        if (this.hasTokens()) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }

    releaseToken() {
        if (this.tokens < this.maxTokens) {
            this.tokens += 1;
        }
    }

    startRefill() {
        setInterval(() => {
            this.releaseToken();
        }, this.refillRate);
    }

    async handleIncomingRequest(requestId) {
        if (!this.hasTokens()) {
            console.log('Out of tokens! Please try again later', requestId);
            return false;
        }

        this.consumeToken();
        console.log('✅ Processing Request...', requestId);
        //await this.waitFor(2000); // Simulate a fake wait time
        return true;
    }

    waitFor(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
module.exports = TokenBucket;