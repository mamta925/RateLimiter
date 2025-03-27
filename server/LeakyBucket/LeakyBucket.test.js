const LeakyBucket = require("./LeakyBucket");

jest.useFakeTimers();

describe("Leaky Bucket Algorithm", () => {
    test("Allows request if bucket is not full", () => {
        const bucket = new LeakyBucket(3, 2);

        for (let i = 0; i < 3; i++) {
            expect(bucket.processRequest()).toBe(true);
        }
    });

    test("Rejects request when bucket is full", () => {
        const bucket = new LeakyBucket(3, 2);

        for (let i = 0; i < 3; i++) {
            bucket.processRequest();
        }

        expect(bucket.processRequest()).toBe(false);
    });

    test("Leaks requests over time", () => {
        const bucket = new LeakyBucket(3, 2);

        for (let i = 0; i < 10; i++) {
            bucket.processRequest();
        }

        jest.advanceTimersByTime(2000);

        expect(bucket.processRequest()).toBe(true);
    });

    test("Processes requests at a fixed rate", () => {
        const bucket = new LeakyBucket(3, 2);

        for (let i = 0; i < 5; i++) {
            bucket.processRequest();
        }

        jest.advanceTimersByTime(1000); // 1 second should leak 2 requests

        expect(bucket.processRequest()).toBe(true);
        expect(bucket.processRequest()).toBe(true);
        expect(bucket.processRequest()).toBe(false); // 6th request should fail
    });
});
