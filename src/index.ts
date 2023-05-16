require("dotenv").config();

import fastify from "fastify";
import z from "zod";
import { sendBrandMail } from "./features/sendBrandMail";
import { sendEmploymentMail } from "./features/sendEmploymentMail";

const app = fastify();

app.register(require("@fastify/cors"), {
  origin: ["http://localhost:8080", "https://kashemir.shop"],
  methods: ["GET", "POST", "OPTIONS"],
});

app.register(require("@fastify/rate-limit"), {
  max: 100,
  timeWindow: "1 minute",
});

const mailTypes = ["brand", "employment"] as const;
const mailSchema = z.object({
  mailType: z.enum(mailTypes),
  formData: z.record(z.string()),
});
type FormBody = z.infer<typeof mailSchema>;

app.post("/mail", async (req, res) => {
  let parsedBody: FormBody;

  try {
    parsedBody = await mailSchema.parseAsync(req.body);
  } catch (e) {
    return res.code(400).send({ error: "validation_failed" });
  }

  const { mailType, formData } = parsedBody;
  try {
    if (mailType === "brand") {
      await sendBrandMail(formData);
    } else if (mailType === "employment") {
      await sendEmploymentMail(formData);
    }
  } catch (e) {
    return res.code(500).send("server_error");
  }

  res.code(200).type("text/html");
});

app.listen({ port: 3000, host: "127.0.0.1" });
