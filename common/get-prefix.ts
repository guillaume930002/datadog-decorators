export function getNetricPrefix() {
  return process.env.DD_METRIC_PREFIX || 'my_collector';
}
