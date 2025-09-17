const express = require("express");
const connectDb = require("./Database/Database.js")
const userRouter = require("./Routes/UserApis.js");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser")

const app = express();
app.use(cors({
  origin: "https://chat-app-frontend-cj6o.vercel.app",
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/", userRouter)
const server = http.createServer(app);
const startSocket = require("./Utils/Socket.js");
const port = process.env.PORT || 5491;

startSocket(server)
connectDb().then(() => {
console.log("Database connected succesfully")
server.listen(port, () => {
  console.log("Server is listening on port 5491...")
})
  
})
