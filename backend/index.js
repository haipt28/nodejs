const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    // url frontend
    origin: "http://localhost:4200"

};
app.use(function(req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "../../AngularCRUD/dist/angular-crud/"));

// simple route
const db = require("./app/models");
db.sequelize.sync();
app.get("/", (req, res) => {
    // res.json({ message: "Welcome to bezkoder application." });
    res.sendFile(process.cwd() + "../../AngularCRUD/dist/angular-crud/index.html")
});
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});