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

## Available decorators
| Decorators | Note |
| --- | --- |
| `ApiUsage` | measure total number of api calls |
| `ErrorRate` | measure error rate and success rate in total |
| `RequestVolume` | measure total of requests |
| `ResponseTime` | measure API's response time |
