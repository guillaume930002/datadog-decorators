import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { tap } from 'rxjs';
import { iterateTags } from '../../common';

const StatsD = require('hot-shots');
const dogStatsD = new StatsD();

export function ResponseTime(tags?: any) {
  return applyDecorators(
    UseInterceptors({
      intercept: (context, next) => {
        const request = context.switchToHttp().getRequest();

        const start = process.hrtime();

        return next.handle().pipe(
          tap(() => {
            const [seconds, nanoseconds] = process.hrtime(start);
            const elapsedMilliseconds = seconds * 1000 + nanoseconds / 1000000;
            const dogTags = [`path:${request.path}`, `method:${request.method}`, ...iterateTags(tags)];

            // Send the metric to Datadog
            dogStatsD.histogram('my_collector.response_time', elapsedMilliseconds, dogTags);
          }),
        );
      }
    })
  );
};
