# NestJS Datadog Custom Decorator

## Install

npm install
```
npm i --save datadog-decorators
```

yarn install

```
yarn add datadog-decorators
```

## How To Use

Import at the controller file, apply it to the Controller class:

```ts
import { RequestRate } from 'datadog-decorators';

@Controller('test')
@RequestRate()
export class TestController {
  ...
}

```

or apply it to method:
```ts
import { RequestRate } from 'datadog-decorators';

@Controller('test')
export class TestController {
  
  @Post('')
  @RequestRate()
  async create(@Body() body) {
    ...
  }
}

```

You can add tags in key-value object to decorator like this:
```ts
import { RequestRate } from 'datadog-decorators';

@Controller('test')
export class TestController {
  
  @Post('')
  @RequestRate({ id: 1, content: 'test' })
  async create(@Body() body) {
    ...
  }
}

```


> **_NOTE:_**  The default metric prefix is 'my_collector'. To change this, you can set the environment variable DD_METRIC_PREFIX in your .env file

## Available decorators
| Decorators | Note | Datadog Metric Name
| --- | --- | --- |
| `ApiUsage` | measure total number of api calls | `api_usage` |
| `ErrorRate` | measure error rate and success rate in total | `error_rate` |
| `RequestVolume` | measure total of requests | `request_volume` |
| `ResponseTime` | measure API's response time | `response_time` |
