import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./src/routes/notesRoutes.js"
import { connectDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";




dotenv.config();
//console.log(process.env.MONGO_URL);
const app = express();
const port = process.env.PORT;
const __dirname = path.resolve()

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies - req.body
app.use(rateLimiter);


// custom middleware
// app.use((req, res, next) => {
//     console.log(`Req Method: ${req.method} & Req URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
    app.listen(5001, () => {
    console.log(`Server Is Running On ${port}`);
    });
}) 


