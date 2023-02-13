import keys from "./keys.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import { Redis } from "ioredis";
const { Pool } = pg;

(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const pgClient = new Pool({
        user: keys.pgUser,
        host: keys.pgHost,
        database: keys.pgDatabase,
        password: keys.pgPassword,
        port: keys.pgPort,
    });

    pgClient.on("error", () => console.log("Lost PG connection"));

    try {
        await pgClient.query("CREATE TABLE IF NOT EXISTS values (number INT)");
    } catch (error) {
        console.log("error creating table: ", error);
    }

    const redisClient = new Redis({
        port: keys.redisPort,
        host: keys.redisHost,
    });

    // const redisPublisher = redisClient.duplicate();

    app.get("/", (req, res) => {
        res.send("Sup BRO!");
    });

    app.get("/values/all", async (req, res) => {
        const values = await pgClient.query("SELECT * from values");
        res.send(values.rows);
    });

    app.get("/values/current", async (req, res) => {
        try {
            const values = await redisClient.hgetall("values");
            res.send(values);
        } catch (err) {
            console.log(err);
        }
    });

    app.post("/values", async (req, res) => {
        const index = parseInt(req.body.index);
        console.log("index ", index);
        if (parseInt(index) > 40) {
            res.status(422).send("Index too high");
        }
        if (index >= 0 && index <= 40) {
            redisClient.hset("values", index, "Nothing yet!");
            redisClient.publish("insert", index);
            pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

            res.send({ working: true });
        }
    });

    app.listen(5000, (err) => {
        console.log("Listening...");
    });
})();
