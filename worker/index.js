import keys from "./keys.js";
import { Redis } from "ioredis";

const redisClient = new Redis({
    host: keys.redisHost,
    port: keys.redisPort,
});

const subscription = redisClient.duplicate();

const fib = (index) => {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
};

subscription.on("message", (channel, message) => {
    console.log(channel);
    console.log(message);
    redisClient.hset("values", message, fib(parseInt(message)));
});

subscription.subscribe("insert");
