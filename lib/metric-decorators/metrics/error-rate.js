"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRate = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_2 = require("../../common");
const StatsD = require('hot-shots');
const dogStatsD = new StatsD();
function ErrorRate(tags) {
    let reqTotal = 0;
    let errorCount = 0;
    let successCount = 0;
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)({
        intercept: (context, next) => {
            reqTotal++;
            const request = context.switchToHttp().getRequest();
            return next.handle().pipe((0, rxjs_1.tap)((response) => {
                const dogTags = [`path:${request.path}`, `method:${request.method}`, ...(0, common_2.iterateTags)(tags)];
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
            }));
        }
    }));
}
exports.ErrorRate = ErrorRate;
;
