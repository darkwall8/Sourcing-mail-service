import express from "express";
import path from "path";
import cors from "cors";
import EmailRouter from "./routes/email.routes";

const app = express();
const PORT = process.env.PORT || 4000

// files acces
app.use('/images', express.static(path.join(__dirname, '../images')));

// Json response management
app.use(express.json());

// Url encoding
app.use(express.urlencoded({ extended: false }));

// Cors manamgement
app.use(cors());

//Routes
app.use("/email", EmailRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





