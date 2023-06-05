const express = require('express')
const mongoose = require('mongoose')
const router = require('./backend/Router')
const PORT = process.env.PORT || 3000
const cors = require('cors');

const app = express()


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// setting allowed domains for CORS
// app.use(cors({
//   origin: function (origin, callback) {
//     // check origin in the allowed list
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Access denied'));
//     }
//   }
// }));
// const corsOptions = {
//   origin: ['http://localhost:3000/form/form.html', 'http://localhost:3000/login/login.html'],
//   methods: 'GET,POST',
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.static('frontend'))
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.json())
//use routes
app.use("/api", router)
//server start
const start = async () =>
{
    try{
      //connecting to mongodb
        await mongoose.connect(`mongodb+srv://jugger:Karmain12@cluster0.nujvou1.mongodb.net/sem_js?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    }
    catch(e)
    {
        console.log(e)
    }
}
start()