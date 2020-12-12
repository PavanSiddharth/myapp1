var express = require("express");
var morgan = require("morgan");
var compression = require('compression');
var helmet = require('helmet');

const AWS = require('aws-sdk');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "database-1.cpehnlgbk0me.ap-south-1.rds.amazonaws.com",
  user: "admin",
  port: "3306",
  password: "adminpassword",
  database: "lessons",
  queryTimeout: 6000,
  connectTimeout: 60000
});


const fileUpload = require('express-fileupload');
const cors = require('cors');

var app = express();
app.use(helmet());
app.use(compression()); 
app.use(cors());
app.use(fileUpload());
app.use(morgan("combined"));

app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "default-src *");
  return next();
});

// Serve the static files from the build folder
app.use(express.static( __dirname + "/build"));
//app.use('/material-dashboard-react', express.static(__dirname + "/build"));
// Redirect all traffic to the index
app.get('/', function(req, res){
  res.sendFile(__dirname + "/build/index.html");
});
// Listen to port 3000


app.post('/submit', (req, res) => {
  var jsonObj = JSON.parse(req.body.json);
  console.log(jsonObj['name']);

  try
  {
    con.connect(function(err) {
        if (err) 
        {
          console.log(err);
        }
        console.log("Connected!");
        /*var sql = "insert into details(url,name,type) values ?";
        con.query(sql, [[jsonObj['url'], jsonObj['name'], jsonObj['type']]], function(error, result, fields) {
          console.log(result);
        });*/
        con.query(`INSERT INTO details (url, name, type) VALUES ('${jsonObj['url']}', '${jsonObj['name']}', '${jsonObj['type']}')`,function(error, result, fields) {
          console.log(result);
      });
        /*con.query('CREATE TABLE IF NOT EXISTS details(id int NOT NULL AUTO_INCREMENT, url varchar(255), name varchar(255), type varchar(255), PRIMARY KEY(id));', function(error, result, fields) {
          console.log(result);
      });*/
        con.end();
    });
  }
  catch(error)
  {
    console.log(error);
  }
});


app.get('/lessons', (req, res) => {
  try
  {
    con.connect(function(err) {
        /*if (err) 
        {
          console.log(err);
        }
        console.log("Connected!");*/
        /*var sql = "insert into details(url,name,type) values ?";
        con.query(sql, [[jsonObj['url'], jsonObj['name'], jsonObj['type']]], function(error, result, fields) {
          console.log(result);
        });*/
        con.query(`SELECT * FROM details`, function(err, result, fields) {
          if (err) res.send(err);
          if (result) 
          {
            console.log(result)
            res.send(result);
          }
      });
    });
        /*con.query('CREATE TABLE IF NOT EXISTS details(id int NOT NULL AUTO_INCREMENT, url varchar(255), name varchar(255), type varchar(255), PRIMARY KEY(id));', function(error, result, fields) {
          console.log(result);
      });*/
  }
  catch(error)
  {
    console.log(error);
  }
});

app.get('/',(req, res) => {
    res.json({message: "hello"})
})

app.get('/test',(req, res) => {
  res.json({message: "Hello"})
})

app.post('/upload',(req, res) => {
    console.log(req.files.file)

            let s3 = new AWS.S3({
                accessKeyId: "AKIAQC3RSOMX32RZBBOO",
                secretAccessKey: "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",
                Bucket: "lessonfiles",
              });
    
            let params = {
                Bucket: 'lessonfiles',
                Key: req.files.file.name ,
                Body: req.files.file.data
            };
            s3.upload(params, (err, result) => {
                if(err) {
                   console.log("Error", err);
                } else {
                   console.log("S3 Response",result);
                }
            })
        });


  app.post('/download',(req, res) =>  {
    console.log("Body:")
  console.log(req.body.lesson)

  var s3 = new AWS.S3({
    accessKeyId: "AKIAQC3RSOMX32RZBBOO",
    secretAccessKey: "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"
  });

//const writeFile = util.promisify(fs.writeFile)

s3.getObject({Bucket: 'lessonfiles', Key: req.body.lesson+".txt"}).promise().then((data) => {
  console.log(data.Body)
  console.log(String.fromCharCode.apply(null, new Uint16Array(data.Body)))
  //writeFile('./test.txt', data.Body)
  console.log('file downloaded successfully')
  res.json({string : String.fromCharCode.apply(null, new Uint16Array(data.Body))})
}).catch((err) => {
  throw err
})

});


app.listen(process.env.PORT || 8080);