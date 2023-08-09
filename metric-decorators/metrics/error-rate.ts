import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { tap } from 'rxjs';
import { iterateTags } from '../../common';

const StatsD = require('hot-shots');
const dogStatsD = new StatsD();

export function ErrorRate(tags?: any) {
  let reqTotal = 0;
  let errorCount = 0;
  let successCount = 0;
  return applyDecorators(
    UseInterceptors({
      intercept: (context, next) => {
        reqTotal++;
        const request = context.switchToHttp().getRequest();
        return next.handle().pipe(
          tap((response) => {
            const dogTags = [`path:${request.path}`, `method:${request.method}`, ...iterateTags(tags)];
            if (response.statusCode >= 400) {
              errorCount++;
              const errorRate = errorCount / reqTotal;
              dogStatsD.gauge('my_collector.error_rate', errorRate, dogTags);
            }
            if (response.statusCode == 200) {
              successCount++;
              const successRate = successCount / reqTotal;
              dogStatsD.gauge('my_collector.success_rate', successRate, dogTags);
            }
          }),
        );
      }
    })
  );
};
