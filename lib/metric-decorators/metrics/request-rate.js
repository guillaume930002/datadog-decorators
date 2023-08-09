"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRate = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_2 = require("../../common");
const StatsD = require('hot-shots');
const dogStatsD = new StatsD();
function RequestRate(tags) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)({
        intercept: (context, next) => {
            const request = context.switchToHttp().getRequest();
            const start = Date.now();
            return next.handle().pipe((0, rxjs_1.tap)(() => {
                const end = Date.now();
                const elapsedTime = end - start;
                const requestsPerMinute = (60 * 1000) / elapsedTime;
                const dogTags = [`path:${request.path}`, `method:${request.method}`, ...(0, common_2.iterateTags)(tags)];
                // Send metric to Datadog
                dogStatsD.gauge('my_collector.request_rate', requestsPerMinute, dogTags);
            }));
        }
    }));
}
exports.RequestRate = RequestRate;
;
