require("dotenv").config();
const express = require("express");
const connect = require("./db/connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Routers
const auth = require("./routes/users");
const forum = require("./routes/forum");
const article = require("./routes/article");
// const admin = requrie("./routes/admin");
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

const port = process.env.PORT;

app.use("/auth", auth);
app.use("/forum", forum);
app.use("/article", article);
// app.use("/admin",)
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  connect();
});
