
import express from "express";
import contactsRoutes from "./routes/contacts";

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
	console.log(`[${req.method}] url:: ${req.url}`);
	next();
});

app.get("/", (_req, res) => {
  res.send("Server running 🚀");
});

app.use("/contacts", contactsRoutes);

export default app;