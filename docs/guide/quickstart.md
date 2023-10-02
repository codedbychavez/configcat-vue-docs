# Quick Start

## Installation

To install the npm package, use the following command:

```sh
npm install configcat-vue
```

## Setup

In your `main.js` file:

1. Import the plugin:

```js
import { ConfigCatPlugin } from "configcat-vue";
```

2. Use the plugin:

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  pollingMode: 'auto',
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 95, // Use the pollIntervalSeconds to change the polling interval (how often the ConfigCat SDK should download your feature flags and setting values from ConfigCat).
  }
});
```

## Usage

In this section, you'll learn how to use the plugin in your Vue.js application.

### Using the FeatureWrapper Component

This package includes a `<FeatureWrapper>` component. Let's explore it further.

The `<FeatureWrapper>` component allows you to control which parts of your Vue application (such as components or HTML elements) are displayed when a specific feature flag is enabled. To use it, follow these steps:

1. In your `.vue` file, import the `<FeatureWrapper>` component:

```js
<script>
import { FeatureWrapper } from "configcat-vue";

export default {
  components: {
    FeatureWrapper,
  },
};
</script>
```

2. You can use it in your template by passing your feature key as a prop:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-KEY-GOES-HERE">
      <!-- This is displayed when the feature flag is turned on -->
      <TheNewFeature />
    </FeatureWrapper>
  </div>
</template>
```

3. Optionally, this component also provides an `#else` and `#loading` template. You can include components or HTML elements within these templates that you want to display when the feature flag is **turned off** and when the ConfigCat client is loading:

```jsx
<FeatureWrapper
  featureKey="myFirstFeatureFlag"
  @flag-value-changed="handleFlagValueChange"
>
  <TheNewFeature />
  <template #else>
    <!-- What you want to display when the feature flag is turned off. You can add anything in this block, like HTML elements or other Vue components -->
    <div class="feature-not-available-wrapper">
      <p>Sorry, this feature is not available. Your feature flag is off.</p>
    </div>
  </template>
  <template #loading>
    <!-- What you want to display while the feature flag is loading. You can add anything in this block, like HTML elements or other Vue components -->
    <div class="loading-wrapper">
      <p>Loading...</p>
    </div>
  </template>
</FeatureWrapper>
```

4. Depending on the number of seconds specified for `pollIntervalSeconds` (with the `pollingMode` option set to `auto`), if you change the value of your feature flag from "on" to "off" or vice versa, the `<FeatureWrapper>` component will automatically update itself at each interval and re-render accordingly.

> See documentation: [ConfigCat Polling Modes](https://configcat.com/docs/sdk-reference/js/#polling-modes)

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  pollingMode: 'auto', // Default is 'auto'. Accepted values: 'auto', 'manual', 'lazy'. Learn more: [ConfigCat Polling Modes](https://configcat.com/docs/sdk-reference/js/#polling-modes)
  clientOptions: { // ClientOptions is optional
    pollIntervalSeconds: 10, // Use the pollIntervalSeconds to change the polling interval (how often the ConfigCat SDK should download your feature flags and setting values from ConfigCat).
  }
});
```

5. That's it! If you want to explore more advanced usage, check out the "Advanced Usage" section.

These changes aim to improve readability and maintain consistency in your documentation.
