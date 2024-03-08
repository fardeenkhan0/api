const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const web = require("./route/web");
const connectDb = require("./db/connectDb");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser()); //for getting token in auth
app.use(cors()); // for api communication

//fileupload
app.use(fileUpload({ useTempFiles: true }));

//For data get in api
app.use(express.json());

connectDb();

// load route
app.use("/api", web);
//localhost:8000/api

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port 
    ${process.env.PORT}`);
});
