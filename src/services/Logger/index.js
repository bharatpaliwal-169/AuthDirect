import winston, { format } from "winston";
import DailyRotateFile  from "winston-daily-rotate-file";

const logFormat = winston.format.printf(info => `${info.timestamp}: [${info.level}] ${info.message} `);
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss.sss' }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
  ),
  
  transports: [

    //dev
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),

    //dev-prod
    new winston.transports.File({
      //path to log folder from root
      filename: './logs/server.log',
      format: format.combine(
        // format.json()
        logFormat
      )
    }),

    //prod
    // new DailyRotateFile({
    //   filename: './logs/app-%DATE%.log',
    //   datePattern: 'DD-MM-YYYY',
    //   zippedArchive: true,
    //   maxSize: '100m',
    //   maxFiles: '7d',
    //   format: format.combine(logFormat),
    // })

  ],
  exitOnError: false
});

export default logger;
