import express from "express";
import config from "./config/config.js";
import routes from "./src/frameworks/webserver/routes/index.js";
const PORT = config.PORT;
const app = express();
//data parsing
app.use(express.json());
routes(app, express);
app.listen(PORT, (err) => {
  err
    ? console.log("Server connection failed", err)
    : console.log(`Server is running on ${PORT}`);
});
