"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTime = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_2 = require("../../common");
const StatsD = require('hot-shots');
const dogStatsD = new StatsD();
function ResponseTime(tags) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)({
        intercept: (context, next) => {
            const request = context.switchToHttp().getRequest();
            const start = process.hrtime();
            return next.handle().pipe((0, rxjs_1.tap)(() => {
                const [seconds, nanoseconds] = process.hrtime(start);
                const elapsedMilliseconds = seconds * 1000 + nanoseconds / 1000000;
                const dogTags = [`path:${request.path}`, `method:${request.method}`, ...(0, common_2.iterateTags)(tags)];
                // Send the metric to Datadog
                dogStatsD.histogram('my_collector.response_time', elapsedMilliseconds, dogTags);
            }));
        }
    }));
}
exports.ResponseTime = ResponseTime;
;
