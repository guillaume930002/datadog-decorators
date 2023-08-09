"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsCollector = void 0;
const common_1 = require("@nestjs/common");
const metrics_1 = require("./metrics");
function MetricsCollector(tags) {
    return (0, common_1.applyDecorators)((0, common_1.Controller)(), (0, metrics_1.ErrorRate)(tags), (0, metrics_1.ResponseTime)(tags), (0, metrics_1.RequestVolume)(tags), (0, metrics_1.ApiUsage)(tags), (0, metrics_1.RequestRate)(tags));
}
exports.MetricsCollector = MetricsCollector;
;
