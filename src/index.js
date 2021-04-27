const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
require('dotenv/config');
//const port = parseInt(process.env.API_PORT);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.use("/",router);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(parseInt(process.env.API_PORT),()=>{
	console.log("Server running ...")
});

// app.listen(8686,() => {
//     console.log("Server running...")
// });
