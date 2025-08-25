const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const carRouter = require("./routes/allCarRouter");
const imageUpload = require("./routes/imageUploadRouter");
const reserveRouter = require("./routes/reserveRouter");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoutes");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// Routers
app.use("/cars", carRouter);
app.use("/upload", imageUpload);
app.use("/reserve", reserveRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Node.js with Socket.IO is working!");
});


io.on("connection", (socket) => {
 

  // Example: listen for car location updates
  socket.on("carLocation", (data) => {
   

    // broadcast to all clients (except sender)
    socket.broadcast.emit("updateCarLocation", data);
  });

  socket.on("disconnect", () => {
    
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
