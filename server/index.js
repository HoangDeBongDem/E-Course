import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import courseEnrollRoute from "./routes/courseEnroll.route.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html")); // hoặc build/
// });

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  // origin: "https://ismkmsproject.vercel.app/",
  
  credentials: true,
  exposedHeaders: ['Cross-Origin-Opener-Policy'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly set COOP header for relevant routes
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  next();
});
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/courseEnroll", courseEnrollRoute);
 
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


