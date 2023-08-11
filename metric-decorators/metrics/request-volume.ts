import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { tap } from 'rxjs';
import { getNetricPrefix, iterateTags } from '../../common';

const StatsD = require('hot-shots');
const dogStatsD = new StatsD();

export function RequestVolume(tags?: any) {
  return applyDecorators(
    UseInterceptors({
      intercept: (context, next) => {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
          tap(() => {
            const dogTags = [`path:${request.path}`, `method:${request.method}`, ...iterateTags(tags)];
            dogStatsD.increment(getNetricPrefix() + '.request_volume', 1, dogTags);
          }),
        );
      }
    })
  );
};
