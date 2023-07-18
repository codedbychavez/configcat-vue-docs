# Advanced usage

Welcome to the advanced usage section of the ConfigCat-Vue documentation! This section is designed to provide in-depth insights and advanced techniques for integrating and utilizing the ConfigCat-Vue npm package effectively. ConfigCat-Vue is a powerful plugin that seamlessly integrates ConfigCat feature flags and configuration management capabilities into your Vue.js applications. Whether you are a seasoned Vue developer or new to ConfigCat, this documentation will guide you through advanced features, best practices, and advanced configuration options, empowering you to unlock the full potential of feature flags in your projects. Let's dive in and explore the advanced functionalities that will elevate your Vue.js development with this plugin.

## Using the plugin with a logger

The plugin can also be used with a logger. Here's how to do so:

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#logging>

1. Install the `configcat-js` npm package:

```sh
npm install configcat-js
```

Then in `main.js`:

2. Import ConfigCat:

```js
import * as configcat from 'configcat-js';
```

3. Create the logger with a specified log level:

```js
const logger = configcat.createConsoleLogger(configcat.LogLevel.Info);
```

> Documentation: <https://configcat.com/docs/sdk-reference/js/#setting-log-levels>

4. Use the logger in `clientOptions`:

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  pollingMode: 'auto',
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 5,
    logger: logger,
  }
});
```

## Using the FeatureWrapper with a User Object

According to the documentation for ConfigCat, the [User Object](https://configcat.com/docs/advanced/user-object/) can be used to pass potential targeting rules variables. In addition, it allows you to represent a user in your application.

> See documentation here: <https://configcat.com/docs/advanced/user-object/>

A User Object can be passed as a prop to the **Feature Wrapper** component.

1. You can define the User Object as a **data** property

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
    <FeatureWrapper featureKey="YOUR-FEATURE-KEY" :userObject="userObject">
      <TheNewFeature />
      
    </FeatureWrapper>
  </div>
</template>
```

## Listening to feature flag changes emitted from the FeatureWrapper component

When you toggle your feature flag ON/OFF in the ConfigCat dashboard the configcat-vue plugin is notified and emits the updated your updated feature flag value. You can listen to the changes using `@flag-value-changed`like this:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-KEY" @flag-value-changed="handleFlagValueChange">
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

Hooks provide the means by which you can be notified about events emitted by the client. If this is something you'd like to know more about...

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#hooks>

The configcat-vue plugin, provides the raw ConfigCat client incase you need to use it in situations like these.

You can access it in your Vue.js app by using `this.configCatClient`:

```js
<script>
import { FeatureWrapper } from "configcat-vue";
import Welcome from "./components/Welcome.vue";
import TheNewFeature from "./components/TheNewFeature.vue";

export default {

  mounted() {
    this.configCatClient.on('NAME-OF-HOOK', () => {
      console.log('Do something...');
    })
  }

}

</script>
```

> See documentation here: <https://configcat.com/docs/sdk-reference/js/#hooks>
