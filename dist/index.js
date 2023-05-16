"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const fastify_1 = __importDefault(require("fastify"));
const zod_1 = __importDefault(require("zod"));
const sendBrandMail_1 = require("./features/sendBrandMail");
const sendEmploymentMail_1 = require("./features/sendEmploymentMail");
const app = (0, fastify_1.default)();
app.register(require("@fastify/cors"), {
    origin: ["http://localhost:8080", "https://kashemir.shop"],
    methods: ["GET", "POST", "OPTIONS"],
});
app.register(require("@fastify/rate-limit"), {
    max: 100,
    timeWindow: "1 minute",
});
const mailTypes = ["brand", "employment"];
const mailSchema = zod_1.default.object({
    mailType: zod_1.default.enum(mailTypes),
    formData: zod_1.default.record(zod_1.default.string()),
});
app.post("/mail", async (req, res) => {
    let parsedBody;
    try {
        parsedBody = await mailSchema.parseAsync(req.body);
    }
    catch (e) {
        return res.code(400).send({ error: "validation_failed" });
    }
    const { mailType, formData } = parsedBody;
    try {
        if (mailType === "brand") {
            await (0, sendBrandMail_1.sendBrandMail)(formData);
        }
        else if (mailType === "employment") {
            await (0, sendEmploymentMail_1.sendEmploymentMail)(formData);
        }
    }
    catch (e) {
        return res.code(500).send("server_error");
    }
    res.code(200).type("text/html");
});
app.listen({ port: 3000, host: "127.0.0.1" });
