import express from "express";

// Works fine 
import fs from 'fs'
import http from 'http';
import https from'https';
var privateKey  = fs.readFileSync('localhost.key', 'utf8');
var certificate = fs.readFileSync('localhost.crt', 'utf8');
var options = {
    key: privateKey,
    cert: certificate
  };
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import schema from "./schema";
import routes from './home'


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
  
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.use(routes)
var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(options, app);
httpServer.listen(80, () => console.log(`Server http running on 🔥  port 80`));
httpsServer.listen(PORT, () => console.log(`Server https running on 🔥  port ${PORT}`));