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


# v2 : forgotpassword testing .... underprogress

Done with forgotPassword functionality.

# BUG ? ISSUE

<p> 
This is to be observed that, when handling objects in controllers then we need to take care of using 
```
newUSer = {...user,prop:newValues} <- this dosent works for some reason
we need to use $set:{prop:newValue} instead
```
else what can be done is to fetch object from DB then destruct it and rebuild as construct then send as const object
```
const obj = {all , props , here};
const new = {prop : newval , here};
db.fidu(new);
```

this took almost a day to get figure out, JS hell! 💀
</p>

### Req/res compression 

```
app.use(compression({
  level: 6, // set the compression level to 6
  threshold: 1024, // compress responses larger than 1024 bytes
  filter: (req, res) => {
    if (req.headers['content-type'] === 'application/json') {
      // exclude JSON responses from compression
      return false;
    }
    return true;
  }
}));

```
### HTTP Status:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

```

200 : ok
201 : created
202 : accepted

400 : bad request
401 : unauthorized
403 : forbidden
404 : not found
405 : method not allowed
406 : not accepetable   
408 : request timeout
429 : too many requests


500 : internal server error
502 : bad gateway
503 : serviced unavailable
508 : inf loops 

v3 will have otp based
v3 will have custom response fields


# DOCKER

create and write 2 files
```
Dockerfile

.dockerignore

```

in cmd run 

```
docker build -t <name_your_image> . // "." is used for current directory
```

To see all the images that you have
```
docker images
```

To create a container run command:
```
docker run --name <continer_name> -d -p <listen_port>:<your_port> <name_of_image>
```

<img width="539" alt="image" src="https://user-images.githubusercontent.com/56474196/230551580-7ab0a40b-cf5c-4be8-a4dc-544a0f625c3e.png">

START/STOP

```
docker start <container_name>
docker stop <container_name>

```

helpful : https://github.com/KaranJagtiani/MERN-Docker-Production-Boilerplate
