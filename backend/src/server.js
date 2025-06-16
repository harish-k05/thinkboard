import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT

//middleware
app.use(
    cors({
        origin: "http://localhost:5173",
         credentials: true
    })
);

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started on PORT:", PORT);
    });
});


