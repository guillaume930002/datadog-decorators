import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { tap } from 'rxjs';
import { iterateTags } from '../../common';

const StatsD = require('hot-shots');
const dogStatsD = new StatsD();

export function RequestRate(tags?: any) {
  return applyDecorators(
    UseInterceptors({
      intercept: (context, next) => {
        const request = context.switchToHttp().getRequest();

        const start = Date.now();

        return next.handle().pipe(
          tap(() => {
            const end = Date.now();
            const elapsedTime = end - start;
            const requestsPerMinute = (60 * 1000) / elapsedTime;
            const dogTags = [`path:${request.path}`, `method:${request.method}`, ...iterateTags(tags)];

            // Send metric to Datadog
            dogStatsD.gauge('my_collector.request_rate', requestsPerMinute, dogTags);
          }),
        );
      }
    })
  );
};
