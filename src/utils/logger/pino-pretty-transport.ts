import PinoPretty, { PrettyOptions } from 'pino-pretty';

module.exports = (opts: PrettyOptions) =>
  PinoPretty({
    ...opts,
    levelFirst: true,
    hideObject: true,
    translateTime: 'UTC:mm.dd.yyyy, h:MM:ss TT Z',
    customPrettifiers: {
      time: (timestamp: any) => `🕰 ${timestamp}`,
    },
    messageFormat: (log: any, messageKey) => {
      const message = log[messageKey] as string;
      let output = message;
      if (log.req?.id) {
        // HTTP Request, should follow this format
        output = `${log.req.method} ${log.res?.statusCode} - ${log.req.url} - FROM ${log.req.remoteAddress} - ${message}`;
      } else {
        // Standard log, should follow this format
        output = `[${log.context}] ${message}`;
      }
      return output;
    },
  });
