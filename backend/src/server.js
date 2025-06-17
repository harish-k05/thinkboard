import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV !== "production") {
app.use(
    cors({
        origin: "http://localhost:5173",
         credentials: true
    })
);
}

app.use(express.json());
app.use(rateLimiter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
} else {
    app.use("/api/notes", notesRoutes);
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started on PORT:", PORT);
    });
});

