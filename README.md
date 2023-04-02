# AuthDirect

package added : express, body-parser , nodemon , cors , dotenv , mongoose .
## v1

Implement function based bare basic auth with 3 functions:

```
login() , signup() , forgotPassword()
```

### Looger : winston

<b> NOTE </b> : I have an understanding that adding a logger on a small scale project is like putting sword in needle battles. But here the purpose is to follow production grade tools and pratices. Aim is to learn about how to build business class projects.

```
npm install winston
```

an example of using logger in express with express-winston
```
 app.use(expressWinston.logger({
   winstonInstance : logger,
   meta : true,
   msg: 'HTTP {{req.method}} {{req.url}} {{req.body}}',
   expressFormat:true,
   colorize:true
 }));
 
```


Then create a custom logger

REf : https://stackoverflow.com/questions/56090851/winston-logging-object

then implement it everywhere

## Tasks pending.... [DONE]
1) To log it into log files. -> done 
2) To rotate the logs. -> done 
## V1 build is done.

# V2 

### Development

package added : validator , express -rate limiter , jwt , cookie-parser .

#### Email Service

https://medium.com/@bluedesk09/sending-email-with-zoho-nodejs-nodemailer-62de7fffc8ac#:~:text=Note%20that%20we%20are%20using,are%20using%20a%20SSL%20connection.
