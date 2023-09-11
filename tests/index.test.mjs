import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import routes from '../src/routes/v1'
import app from '../index.js'

dotenv.config();

describe('The Server', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  // const app = express();
  // app.use('/api/v1/auth',routes);
  const currUser = {
    email : "docker@gmail.com",
    password : "1234"
  }
  const newUser = {
    email : "docker123@gmail.com",
    password : "1234"
  }
  test('login', (done) => {
    request(app).post('/api/v1/auth/login',currUser).expect(200)
    .expect(response => expect(response.body.message).toHaveProperty("message"))
    .then(() => done())
    .catch(err => done(err));
  });

  test('signup', (done) => {
    request(app).post('/signup',newUser).expect(200)
    .expect(response => expect(response.body.message).toHaveProperty("message"))
    .then(() => done())
    .catch(err => done(err));
  });

  test('forgotPassword', (done) => {
    request(app).post('/forgotpassword',currUser).expect(200)
    .expect(response => expect(response.body.message).toHaveProperty("message"))
    .then(() => done())
    .catch(err => done(err));
  });
  
});