import RateLimit from 'express-rate-limiter';

const ApiRateLimiter = RateLimit({
  windowMs : 5 * 60 * 1000, //5 minutes
  max : 10,
  message : "Too many attempts"
}) 

export default ApiRateLimiter;