var express = require("express");
var morgan = require("morgan");
var compression = require('compression');
var helmet = require('helmet');

const AWS = require('aws-sdk');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "finaldb.cpehnlgbk0me.ap-south-1.rds.amazonaws.com",
  user: "admin",
  port: "3306",
  password: "*",
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

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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
  console.log(req.files.file)
  console.log(req.files.image)
  var image = '';
  if(req.files.image!==undefined)
    image = req.files.image.name

            let s3 = new AWS.S3({
                accessKeyId: "AKIAQC3RSOMX32RZBBOO",
                secretAccessKey: "*",
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
            if(req.files.image!==undefined)
            {
            let params1 = {
              Bucket: 'lessonfiles',
              Key: req.files.image.name ,
              Body: req.files.image.data
          };
          s3.upload(params1, (err, result) => {
              if(err) {
                 console.log("Error", err);
              } else {
                 console.log("S3 Response",result);
              }
          })
        }
  try
  {
    con.connect(function(err) {
        if (err) 
        {
          console.log(err);
          res.send({mesage: "Not Successful"})
        }
        console.log("Connected!");
        /*var sql = "insert into details(url,name,type) values ?";
        con.query(sql, [[jsonObj['url'], jsonObj['name'], jsonObj['type']]], function(error, result, fields) {
          console.log(result);
        });*/
        con.query(`INSERT INTO details (url, name, type, image) VALUES ('${jsonObj['url']}', '${jsonObj['name']}', '${jsonObj['type']}', '${image}')`,function(error, result, fields) {
          console.log(result);
      });
        /*con.query('CREATE TABLE IF NOT EXISTS details(id int NOT NULL AUTO_INCREMENT, url varchar(255), name varchar(255), type varchar(255), PRIMARY KEY(id));', function(error, result, fields) {
          console.log(result);
      });*/
        con.end();
        res.send({message: "successful"});
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

function encode(data){
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64
}

async function getImage(img) {
var s3 = new AWS.S3({
  accessKeyId: "AKIAQC3RSOMX32RZBBOO",
  secretAccessKey: "*"
});
const data =  s3.getObject(
  {
      Bucket: 'lessonfiles',
      Key: img
    }
  
).promise();
return data;
  }

app.post('/testimage',(req, res) => {
  console.log(req)
  getImage(req.body.image)
  .then((img)=>{
    res.json({image:encode(img.Body)})
  }).catch((e)=>{
    res.send(e)
  })
    })



    app.post('/addvocab', (req, res) =>  {
      const con = mysql.createConnection({
        host: "finaldb.cpehnlgbk0me.ap-south-1.rds.amazonaws.com",
        user: "admin",
        port: "3306",
        password: "adminpassword",
        database: "lessons",
        queryTimeout: 6000,
        connectTimeout: 60000
      });
          console.log("Body:")
          console.log(req.body)
          var word = req.body.word
          var uid = parseInt(req.body.uid)
  try
  {
    con.connect(function(err) {
        if (err) 
        {
          console.log(err);
          //res.send({mesage: "Not Successful"})
        }
        console.log("Connected!");
        con.query(`INSERT INTO vocabulary (uid, word) VALUES ('${uid}', '${word}')`,function(error, result, fields) {
          console.log(result);
      });
        //res.send({message: "successful"});
    });
  }
  catch(error)
  {
    console.log(error);
  }
})

    app.post('/deletevocab', (req, res) =>  {
      const con = mysql.createConnection({
        host: "finaldb.cpehnlgbk0me.ap-south-1.rds.amazonaws.com",
        user: "admin",
        port: "3306",
        password: "adminpassword",
        database: "lessons",
        queryTimeout: 6000,
        connectTimeout: 60000
      });
      console.log("Body:")
      console.log(req.body)
      var word = req.body.word
      var uid = parseInt(req.body.uid)
try
{
con.connect(function(err) {
    if (err) 
    {
      console.log(err);
      //res.send({mesage: "Not Successful"})
    }
    console.log("Connected!");
    con.query(`delete from vocabulary where word='${word}' and uid='${uid}'`,function(error, result, fields) {
      console.log(result);
  });
    //res.send({message: "successful"});
});
}
catch(error)
{
console.log(error);
}
})

    app.post('/download', (req, res) =>  {
    console.log("Body:")
  //console.log(req.body.lesson)

  var s3 = new AWS.S3({
    accessKeyId: "AKIAQC3RSOMX32RZBBOO",
    secretAccessKey: "*"
  });

//const writeFile = util.promisify(fs.writeFile)

s3.getObject({Bucket: 'lessonfiles', Key: req.body.lesson+".txt"}).promise().then((data) => {
  var enc = new TextDecoder("utf-8");
  var arr = new Uint8Array(data.Body);
  console.log(enc.decode(arr));
  //writeFile('./test.txt', data.Body)
  console.log('file downloaded successfully')
  res.json({string : enc.decode(arr)})
}).catch((err) => {
  throw err
})

});

app.get('/vocabulary',(req, res) => {
  var s3 = new AWS.S3({
    accessKeyId: "AKIAQC3RSOMX32RZBBOO",
    secretAccessKey: "*"
  });
  con.connect(function(err) {
    con.query(`SELECT * FROM vocabulary`, function(err, result, fields) {
      if (err) console.log(err);
      if (result) 
      {
        result.map(e => console.log(e.word))
        var promises = result.map(e => {
          return e.word
          })
      }
      Promise.all(promises).then(function(results) {
        var mystring = ""
        //console.log(results)
        results.map(result => {
          mystring=mystring+result+" ";
        })
        console.log(mystring)
        res.json({string : mystring})
    })
    })
  });
})

app.listen(process.env.PORT || 8080);
