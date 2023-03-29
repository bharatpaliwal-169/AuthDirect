import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import expressWinston from 'express-winston';


import logger from './src/services/Logger/index.js'
import v1routes from './src/routes/v1/auth.js'

//base
const app = express();
app.use(bodyParser.json({limit: "50mb",extended : true}));
app.use(bodyParser.urlencoded({limit: "50mb",extended : true}));
app.use(cors());
dotenv.config();

//DB
const PORT = process.env.MY_PORT|| process.env.PORT;
const DB_SERVER_URL = process.env.DB_URL;

// Cluster setup
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
const noOfCPUs = os.cpus().length;


// if (cluster.isPrimary) {
  
//   // primary cluster handles orther slave thread
//   for (let i = 0; i < noOfCPUs; i++) {
//     //cluster is making slave thread
//     cluster.fork();
//   }
  
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork(); // if dead then remake a new thread
//   });

// }else{

//   //DB_CONNECT
//   mongoose.connect(DB_SERVER_URL)
//     .then(() => app.listen(PORT, () => logger.info(`Server Running on Port: http://localhost:${PORT}`)))
//     .catch((error) => console.log(`${error} did not connect`));
  
//   //logger
//   app.use(expressWinston.logger({
//     winstonInstance : logger,
//     meta : true,
//     msg: 'HTTP {{req.method}} {{req.url}} {{req.body}}',
//     expressFormat:true,
//     colorize:true
//   }));
//   //authentication
//   app.use('/api/v1/auth',v1routes);
  
//   app.get('/',(req, res) => {
//     res.send("App is UP n RUNNING");
//   });
// }

  mongoose.connect(DB_SERVER_URL)
    .then(() => app.listen(PORT, () => logger.info(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
  
  //logger
  // app.use(expressWinston.logger({
  //   winstonInstance : logger,
  //   // meta : true,
  //   msg: 'HTTP {{req.method}} {{req.url}} {{req.body}}',
  //   expressFormat:false,
  //   colorize:true
  // }));
  
  //authentication
  app.use('/api',v1routes);
  
  app.get('/',(req, res) => {
    res.send("App is UP n RUNNING");
  });