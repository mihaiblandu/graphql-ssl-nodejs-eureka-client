import express from "express";

// Works fine 
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('localhost.key', 'utf8');
var certificate = fs.readFileSync('localhost.crt', 'utf8');
var options = {
    key: privateKey,
    cert: certificate
  };
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import cors from "cors";
import schema from "./schema";

const app = express();
const PORT = process.env.PORT || "4000";
const db = "mongodb+srv://mihaiblandu:Alfaomega@mihaiblandu-qoavz.mongodb.net/graphql?retryWrites=true&w=majority"

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  )
  .then(() => console.log("MongoDB connected 🚀 \n🌊  🐋  🌊  🐙  🌊  🦈  🌊"))
  .catch(err => console.log(err));

  
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true
  })
);
var server = https.createServer(options, app);
server.listen(PORT, () => console.log(`Server running on 🔥  port ${PORT}`));