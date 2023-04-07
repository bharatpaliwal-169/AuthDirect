import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import compression from 'compression';
import helmet from 'helmet';
// import expressWinston from 'express-winston';

import limiter from './src/middlewares/rateLimiter.js';
import logger from './src/services/Logger/index.js';
import v1Routes from './src/routes/v1/auth.js';
import v2Routes from './src/routes/v2/auth.js';

// import testRoutes from './src/routes/test/index.js'

//base
const app = express();
app.use(helmet());
app.use(bodyParser.json({limit: "50mb",extended : true}));
app.use(bodyParser.urlencoded({limit: "50mb",extended : true}));
app.use(cors());
app.use(compression());
app.use(limiter);

dotenv.config();
//DB
const PORT = process.env.MY_PORT|| process.env.PORT;
const DB_SERVER_URL = process.env.DB_URL;

// Cluster setup
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
const noOfCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // primary cluster handles orther slave thread
  for (let i = 0; i < noOfCPUs; i++) {
    //cluster is making slave thread
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork(); // if dead then remake a new thread
  });
}else{

  //DB_CONNECT
  mongoose.connect(DB_SERVER_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => logger.error(`${error} did not connect`));
  

  //authentication v1
  app.use('/api/v1/auth',v1Routes);
  app.use('/api/v2/auth',v2Routes);
  // app.use('/test',testRoutes);
  
  app.get('/',(req, res) => {
    res.send("App is UP n RUNNING");
  });
}
