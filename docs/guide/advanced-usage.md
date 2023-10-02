# Advanced usage

Welcome to the "Advanced Usage" section of the `configcat-vue` documentation. Here, we'll explore advanced integration and utilization of the ConfigCat-Vue npm package

## Using the plugin with a logger

The plugin can also be used with a logger. Here's how to do so:

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#logging>

1. Add `createConsoleLogger`, and `LoggerLevel` to your import:

```js
import { ConfigCatPlugin, createConsoleLogger, LogLevel } from "configcat-vue"; 
```

3. Create the logger with a specified log level:

```js
const logger = createConsoleLogger(LogLevel.Info);
```

> Documentation: <https://configcat.com/docs/sdk-reference/js/#setting-log-levels>

4. Use the logger in `clientOptions`:

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  pollingMode: 'auto', // default is 'auto'. Accepted values: 'auto', 'manual', 'lazy'. Learn more: https://configcat.com/docs/sdk-reference/js/#polling-modes
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 5, // Use the pollIntervalSeconds to change the polling interval (how often the ConfigCat SDK should download your feature flags and setting values).
    logger: logger, // logger is optional
  }
});
```

## Using the FeatureWrapper with a User Object

According to ConfigCat's documentation, the [User Object](https://configcat.com/docs/advanced/user-object/) can be used to pass potential targeting rules variables. It allows you to represent a user in your application.

> See documentation here: <https://configcat.com/docs/advanced/user-object/>

A User Object can be passed as a prop to the **FeatureWrapper** component.

1. Define the User Object as a **data** property:

```js
<script>
import { FeatureWrapper } from "configcat-vue";

export default {
  components: {
    FeatureWrapper,
  },
  data() {
    return {
      userObject: { // Passing userObject as a prop to the FeatureWrapper is optional
        identifier: 'john@example.com',
      }
    }
  }
};
</script>
```

2. Pass it to the **userObject** prop:

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

When you toggle your feature flag ON/OFF in the ConfigCat dashboard the `configcat-vue` plugin is notified and emits the updated feature flag value. You can listen to the changes using `@flag-value-changed`like this:

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
<script>

// ...
export default {
  methods: {
    // TODO: React to changes of your feature flag value.
    handleFlagValueChange(flagValue) {
      console.log('The feature flag value has changed to: ', flagValue);
    }
  },
}
// ...

</script>
```

## Listening to events emitted by the ConfigCat client directly

Hooks provide the means by which you can be notified about events emitted by the ConfigCat client. If this is something you'd like to know more about...

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#hooks>

The `configcat-vue` plugin, provides the raw ConfigCat client incase you need to use it in situations like these.

You can access it in your Vue.js app by using `this.$configCat.client`:

```ts
<script>
import { FeatureWrapper } from "configcat-vue";
import Welcome from "./components/Welcome.vue";
import TheNewFeature from "./components/TheNewFeature.vue";

export default {
    mounted() {
    // If you need to subscribe to events emitted by the ConfigCat client you can do it this way:
      this.$configCat.client.on('NAME-OF-HOOK', () => {
        // console.log('Do something...');
      })
    // Learn more about hooks here: https://configcat.com/docs/sdk-reference/js/#hooks
  },
}

</script>
```

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#hooks>
