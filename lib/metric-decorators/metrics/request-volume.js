"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestVolume = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_2 = require("../../common");
const StatsD = require('hot-shots');
const dogStatsD = new StatsD();
function RequestVolume(tags) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)({
        intercept: (context, next) => {
            const request = context.switchToHttp().getRequest();
            return next.handle().pipe((0, rxjs_1.tap)(() => {
                const dogTags = [`path:${request.path}`, `method:${request.method}`, ...(0, common_2.iterateTags)(tags)];
                dogStatsD.increment('my_collector.request_volume', 1, dogTags);
            }));
        }
    }));
}
exports.RequestVolume = RequestVolume;
;
