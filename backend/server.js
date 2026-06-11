import express from "express";
import notesRoutes from "./src/routes/notesRoutes.js"
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";


dotenv.config();
//console.log(process.env.MONGO_URL);
const app = express();
const port = process.env.PORT;

// middleware
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json()); // this middleware will parse JSON bodies - req.body
app.use(rateLimiter);


// custom middleware
// app.use((req, res, next) => {
//     console.log(`Req Method: ${req.method} & Req URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(5001, () => {
    console.log(`Server Is Running On ${port}`);
    });
}) 


