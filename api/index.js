const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = 3000;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories")
const path = require("path");
const multer = require("multer");
const cors = require('cors')

//socket.io
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server)

dotenv.config();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err)=>{console.log(err)});

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, "images")
  },
  filename:(req, file, cb)=>{
    cb(null, req.body.name)
  },
})

const uplod = multer({storage:storage})
app.post("/api/upload", uplod.single("file"), (req, res)=>{
  res.status(200).json("File hab been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

io.on("connection",(socket)=>{
  console.log('a user connected',socket.id);
})

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.send();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

server.listen(port, () => {
  console.log("Backend is running.");
});

// app.listen(port, () => {
//   console.log("Backend is running.");
// });