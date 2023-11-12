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
  // pollingMode: PollingMode.AutoPoll, // Optional. Default is PollingMode.AutoPoll. Accepted values: PollingMode.AutoPoll, PollingMode.ManualPoll, PollingMode.LazyLoad. Learn more: [ConfigCat Polling Modes](https://configcat.com/docs/sdk-reference/js/#polling-modes).
  // Check out the advanced usage to learn how you can customize the polling mode.
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 20, // Use the pollIntervalSeconds to change the polling interval (how often the ConfigCat SDK should download your feature flags and setting values from ConfigCat).
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
<script setup lang="ts">
import { FeatureWrapper } from "configcat-vue";
</script>
```

2. You can use it in your template by passing your feature key as a prop:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-KEY-GOES-HERE">
      <!-- This is displayed when the feature flag is enabled -->
      <TheNewFeature />
    </FeatureWrapper>
  </div>
</template>
```

3. Optionally, this component also provides an `#else` and `#loading` template. You can include components or HTML elements within these templates that you want to display when the feature flag is disabled and when the ConfigCat client is loading:

```jsx
<FeatureWrapper
  featureKey="YOUR-FEATURE-KEY-GOES-HERE"
>
  <TheNewFeature />
  <template #else>
    <!-- What you want to display when the feature flag is disabled. You can add anything in this block, like HTML elements or other Vue components -->
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

4. Depending on the number of seconds specified for `pollIntervalSeconds`, if you change the value of your feature flag from "on" to "off" or vice versa, the `<FeatureWrapper>` component will automatically update itself at each interval and re-render accordingly.

> See documentation: [ConfigCat Polling Modes](https://configcat.com/docs/sdk-reference/js/#polling-modes)

That's it! If you want to explore more advanced usage, check out the [Advanced Usage](/advanced-usage) section.
