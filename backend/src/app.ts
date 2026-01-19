
import express from "express";
import contactsRoutes from "./routes/contacts";
import cors from 'cors';
import corsOptions from "./config/cors";
import path from "path";

const app = express();
app.use(cors(corsOptions));

app.use((req, _res, next) => {
	console.log(`[${req.method}] url:: ${req.url}`);
	next();
});


app.use("/contacts", contactsRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});


export default app;