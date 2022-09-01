const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const authJwt = require('./helpers/jwt')
require('dotenv').config()
const { readdirSync } = require('fs')
const errorHandler = require('./helpers/error-handler')


//app
const app = express()

//db
// const connection_url = process.env.ATLAS_URI;
// mongoose.connect(connection_url,{
//     useCreateIndex:true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// const db = mongoose.connection;
// db.once("open",() => {
//     console.log("dbconected");
// })
// Configure Mongo
const db = "mongodb://localhost/nativemaster";

// const uri= process.env.ATLAS_URI
// Connect to Mongo with Mongoose
mongoose.connect(
    db,
        {   useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology: true}
    )
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));
 

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors())
app.use(authJwt())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)
app.use(bodyParser.urlencoded({ extended: true }));


//routes middlewares


readdirSync("./routes").map((r) => app.use("/api",require("./routes/" + r)));
//listen dev
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// });

// production
let server = app.listen( 8000, function(){
// let server = app.listen(process.env.PORT, function(){
    let port = server.address().port;
    console.log("Express is working on port " + port)
})