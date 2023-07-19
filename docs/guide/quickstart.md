# Quick start

## Installation

Install the npm package:

```sh
npm install configcat-vue
```

## Setup

In your `main.js` file:

1. Import the plugin

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

In this section, you'll learn how to put the plugin to use in your Vue.js application.

### Using the FeatureWrapper component

In addition to the plugin, the NPM package ships with a useful `**<FeatureWrapper />**` Vue component. Let's discuss it further.

The `FeatureWrapper` component enables you to wrap the parts of your Vue application (components, HTML elements, etc.) that you want a specific feature flag to control. When the feature flag is turned on, the wrapped components are rendered. Here's how to use it.

1. In your `.vue` file import the **FeatureWrapper** component:

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

2. You can use it in your template by passing your feature key to the **featureKey** prop:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-KEY-GOES-HERE">
      // This is displayed when the feature flag is turned on
      <TheNewFeature />
    </FeatureWrapper>
  </div>
</template>
```

3. Optionally, this component also provides an `#else` template. You can include components or HTML elements within this template that you want to display when the feature flag is **turned off**.

```jsx
<FeatureWrapper featureKey="myFirstFeatureFlag">
  <TheNewFeature />
  <template #else>
    <div class="feature-not-available-wrapper">
      <p>Sorry this feature is not available. Your feature flag is off.</p>
    </div>
  </template>
</FeatureWrapper>
```

4. Depending on the number of seconds specified for `pollIntervalSeconds` (with the `pollingMode` option set to `auto`), if you change the value of your feature flag from "on" to "off" or vice versa, the `<FeatureWrapper />` component will automatically update itself at each interval and re-render accordingly.

> See documentation: <https://configcat.com/docs/sdk-reference/js/#polling-modes>

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  pollingMode: 'auto',
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 10, // Use the pollIntervalSeconds to change the polling interval (how often the ConfigCat SDK should download your feature flags and setting values from ConfigCat).
  }
});
```

5. That's it! Need to know more and go a little further? check out the **Advanced usage** section.
