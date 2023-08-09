"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUsage = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const common_2 = require("../../common");
const StatsD = require('hot-shots');
const dogStatsD = new StatsD();
// Method decorator function
function ApiUsage(tags) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)({
        intercept: (context, next) => {
            const request = context.switchToHttp().getRequest();
            return next.handle().pipe((0, operators_1.tap)(() => {
                const dogTags = [`path:${request.path}`, `method:${request.method}`, ...(0, common_2.iterateTags)(tags)];
                // Send metric to Datadog
                dogStatsD.increment('my_collector.api_endpoint_calls', 1, dogTags);
            }));
        }
    }));
}
exports.ApiUsage = ApiUsage;
;
