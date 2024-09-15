import { Hono } from "hono";
import authRoutes from "./routes/auth";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Context } from "./lib/context";
import { auth } from "./middlewares/auth";
import chatRoutes from "./routes/chat";

const app = new Hono<Context>();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: (origin) => origin, // Allow any origin
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTION"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Set-Cookie"],
  }),
);

app.use(auth);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", authRoutes);
app.route("/", chatRoutes);

app.onError((err, c) => {
  console.error(`${err}`);

  if (err instanceof HTTPException) {
    return c.json({ message: err.message })
  }

  return c.json({ message: "An unexpected error occurred!" }, 500);
});

export default app;
