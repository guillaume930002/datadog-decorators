import { Controller, applyDecorators } from '@nestjs/common';
import { ResponseTime, ErrorRate, RequestVolume, ApiUsage } from './metrics';

export function MetricsCollector(tags?: { [key: string]: string }) {
  return applyDecorators(
    Controller(),
    ErrorRate(tags),
    ResponseTime(tags),
    RequestVolume(tags),
    ApiUsage(tags),
  );
};
