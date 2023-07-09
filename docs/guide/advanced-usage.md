# Advanced usage

## Using the plugin with a logger

The plugin can also be used with a logger, as explained in the [ConfigCat Docs](https://configcat.com/docs/sdk-reference/js/#logging).

1. Install the `configcat-js` npm package:

```sh
npm install configcat-js
```

Then in `main.js`:

2. Import ConfigCat:

```js
import * as configcat from 'configcat-js';
```

3. Create the logger:

```js
const logger = configcat.createConsoleLogger(3);
```

4. Use the logger in `clientOptions`:

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 95,
    logger: logger,
  }
});
```

## Using the FeatureWrapper with a User Object

According to the documentation for ConfigCat, the [User Object](https://configcat.com/docs/advanced/user-object/) can be used to pass potential Targeting rules variables. In addition, it allows you to represent a user in your application.

A User Object can be passed as a prop to the **Feature Wrapper** component.

1. Define the User Object as a **data** property

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
    <FeatureWrapper featureKey="featurekey" :userObject="userObject">
      <p>
        This will show if the feature flag with <b>featurekey</b> is enabled in
        ConfigCat
      </p>
    </FeatureWrapper>
  </div>
</template>
```
