const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const carRouter = require("./routes/allCarRouter");
const imageUpload = require("./routes/imageUploadRouter");
const reserveRouter = require("./routes/reserveRouter");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoutes");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/cars", carRouter);
app.use("/upload", imageUpload);
app.use("/reserve", reserveRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello, Node.js is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
