import { join } from 'path';
import { DestinationStream } from 'pino';
import { Options } from 'pino-http';
import { PrettyOptions } from 'pino-pretty';

export function getPinoHttpOptions():
  | Options
  | DestinationStream
  | [opts: Options, stream: DestinationStream] {
  const logDirectory = join('__dirname', 'Logs');
  return {
    transport: {
      targets:
        process.env.NODE_ENV !== 'production'
          ? [
              {
                target: join(__dirname, 'pino-pretty-transport'),
                level: 'trace',
                options: {
                  colorize: true,
                  translateTime: 'mm/dd/yyyy, h:MM:ss TT',
                  ignore: 'pid,hostname',
                } as PrettyOptions,
              },
            ]
          : [
              {
                target: 'pino/file',
                level: 'info',
                options: {
                  destination: join(logDirectory, 'combined.log'),
                  mkdir: true,
                },
              },
              {
                target: 'pino/file',
                level: 'warn',
                options: {
                  destination: join(logDirectory, 'warn.log'),
                  mkdir: true,
                },
              },
              {
                target: 'pino/file',
                level: 'error',
                options: {
                  destination: join(logDirectory, 'error.log'),
                  mkdir: true,
                },
              },
            ],
    },
  };
}
