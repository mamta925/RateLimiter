# RateLimiter

## [What is Rate Limiting?](https://www.cloudflare.com/en-gb/learning/bots/what-is-rate-limiting/)
Rate limiting is a strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe – for instance, trying to log in to an account. Rate limiting can help stop certain kinds of malicious bot activity. It can also reduce strain on web servers. However, rate limiting is not a complete solution for managing bot activity.

Rate limiting is a technique used to control the rate of incoming requests to a system. It helps in:
- Preventing abuse and DoS attacks
- Managing API usage
- Ensuring fair resource allocation
- Reducing server overload


#
- For a beginner-friendly explanation of Rate Limiting Algorithms, check out this [YouTube video](https://www.youtube.com/watch?v=mQCJJqUfn9Y).
- For a detailed discussion with algorithms and code, visit this [blog post](https://blog.algomaster.io/p/rate-limiting-algorithms-explained-with-code).


## Rate Limiter Test Script
This script simulates rapid requests to a server and tests rate-limiting functionality.

```shell
cd server/
./rate_limiter_test.sh
```
The script will send 15 requests to http://localhost:3000/. The first 10 will return 200 OK,
and the next 5 will return 429 Too Many Requests to simulate rate limiting.

