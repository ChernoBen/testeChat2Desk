const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");
const expressSwagger = require('express-swagger-generator')(app);


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.use("/",router);


let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:8686',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};
expressSwagger(options)
app.listen(8686,()=>{
	console.log("Server running ...")
});

// app.listen(8686,() => {
//     console.log("Server running...")
// });
