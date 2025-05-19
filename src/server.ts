import express from "express";
import path from "path";
import cors from "cors";
import EmailRouter from "./routes/email.routes";

const app = express();
const PORT = process.env.PORT || 4000

app.use('/images', express.static(path.join(__dirname, '../images')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/email", EmailRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;





