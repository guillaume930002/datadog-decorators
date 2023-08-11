import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { iterateTags, getNetricPrefix } from '../../common';

const StatsD = require('hot-shots');
const dogStatsD = new StatsD();

// Method decorator function
export function ApiUsage(tags?: any) {
  return applyDecorators(
    UseInterceptors({
      intercept: (context, next) => {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
          tap(() => {
            const dogTags = [`path:${request.path}`, `method:${request.method}`, ...iterateTags(tags)];

            // Send metric to Datadog
            dogStatsD.increment(getNetricPrefix() + '.api_endpoint_calls', 1, dogTags);
          }),
        );
      }
    })
  );
};
