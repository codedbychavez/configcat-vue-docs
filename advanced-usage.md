# Advanced usage

Welcome to the "Advanced Usage" section of the `configcat-vue` documentation. Here, we'll explore advanced ways of using the `configcat-vue` plugin

## Specifying a polling mode

Polling modes are used to control how often ConfigCat's SDK client downloads the values of your feature flags from ConfigCat's servers. The default polling mode is `AutoPoll`. Auto Polling fetches your latest feature flag values every 60 seconds by default. If you need to change this, you can do so by specifying a polling mode and setting the polling interval (in seconds) in the `pollingIntervalInSeconds` property.

1. Import `PollingMode` from `configcat-vue`:

```js
import { PollingMode } from "configcat-vue";
```

2. Add `pollingMode` to your `app.use`:

```js
app.use(ConfigCatPlugin, {
    sdkKey: "YOUR-CONFIGCAT-SDKKEY", // sdkKey is required
    pollingMode: PollingMode.AutoPoll, // Optional. Default is AutoPoll
    // ...
});
```

3. If you want to change default interval of AutoPoll, add the number of seconds to `pollingIntervalInSeconds` in `clientOptions` as follows:

```js

app.use(ConfigCatPlugin, {
    sdkKey: "YOUR-CONFIGCAT-SDKKEY", // sdkKey is required
    pollingMode: PollingMode.AutoPoll, // Optional. Default is AutoPoll
    clientOptions: {
        pollIntervalSeconds: 5 // Optional. Specify the polling interval in seconds. Default is 60 seconds.
    }
});

```

pollingMode can be one of the following:

- `PollingMode.AutoPoll`

- `PollingMode.ManualPoll`

- `PollingMode.LazyLoad`

> See documentation here: <https://configcat.com/docs/advanced/caching/>

## Using the plugin with a logger

You may want to log the actions of the underlying ConfigCat SDK client. The `configcat-vue` plugin allows you to do this by specifying a logger in `clientOptions`:

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#logging>

1. First, add `createConsoleLogger`, and `LoggerLevel` to your import:

```js
import { createConsoleLogger, LogLevel } from "configcat-vue"; 
```

2. Create the logger with a specified log level:

> Documentation: <https://configcat.com/docs/sdk-reference/js/#setting-log-levels>

3. Use the logger in `clientOptions`:

```js
app.use(ConfigCatPlugin, {
  sdkKey: "YOUR-CONFIGCAT-SDK-KEY", // // sdkKey is required
  clientOptions: { // clientOptions is optional
    // ...
    logger: createConsoleLogger(LogLevel.Info),
  }
});
```

The following methods are available on LogLevel:

- LogLevel.Debug - All events are logged.
- LogLevel.Info - Info, Warn and Error are logged. Debug events are discarded.
- LogLevel.Warn - Warn and Error events are logged. Info and Debug events are discarded.
- LogLevel.Error - Error events are logged. All other events are discarded.
- LogLevel.Off - No events are logged.

## Using the FeatureWrapper with a User Object

The [User Object](https://configcat.com/docs/advanced/user-object/) represent a user in your application. Specifying a User Object allows you to use ConfigCat's [Targeting](https://configcat.com/docs/advanced/targeting/) feature.

> See documentation here: <https://configcat.com/docs/advanced/user-object/>

The User Object can be passed as a prop to the **FeatureWrapper** component.

1. Define the User Object:

```js
<script setup lang="ts">
import { reactive } from 'vue';
import { FeatureWrapper } from "configcat-vue";

const state = reactive({
  userObject: {
    identifier: 'john@example.com'
  }
})

</script>
```

2. Pass it to the **FeatureWrapper** component:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-FLAG-KEY" :userObject="userObject">
      <TheNewFeature />
      
    </FeatureWrapper>
  </div>
</template>
```

## Listening to feature flag changes emitted from the FeatureWrapper component

When you toggle your feature flag ON/OFF in the ConfigCat dashboard the **FeatureWrapper** component emits the updated feature flag value. You can listen and react to the changes using `@flag-value-changed`like this:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-FLAG-KEY" @flag-value-changed="handleFlagValueChange">
      <TheNewFeature />
      
    </FeatureWrapper>
  </div>
</template>
```

```js
<script setup lang="ts">
{/* React to the flag value changes */}
const handleFlagValueChange = (flagValue: boolean) => {
  console.log('Flag value changed to: ', flagValue);
}

</script>
```

## Listening to events emitted by the ConfigCat SDK client directly

The underlying ConfigCat SDK client that powers the `configcat-vue` plugin provides several hooks (events) that you can subscribe to if you need to get notified of its actions.

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#hooks>

The `configcat-vue` plugin, exposes (provides) the underlying ConfigCat SDK client incase you need to subscribe to any of its hooks.

You can access it in your Vue.js app by injecting it into your component like this:

```vue
<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import { FeatureWrapper } from "configcat-vue";
// ...

// Import the ConfigCat SDK client interface
import type { IConfigCatClient } from 'configcat-vue';

// Inject the underlying ConfigCat SDK client that powers the `configcat-vue` plugin
const configCatClient = inject<IConfigCatClient>('configCatClient');

onBeforeMount(() => {
  // Subscribe to the hook using the .on method of the ConfigCat SDK client
  configCatClient?.on('flagEvaluated', () => {
    console.log('Flag evaluated');
  });
});

</script>
```

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#hooks>
