# Quick start

## Pre-requisites

- [Vue 3](https://vuejs.org/)

## Installation

1. Install the npm package:

```sh
npm install configcat-vue
```

## Usage

In your `main.js` file:

1. Import the plugin

```js
import { ConfigCatPlugin } from 'configcat-vue';
```

2. Use the plugin:

```js
app.use(ConfigCatPlugin, {
  SDKKey: "YOUR-CONFIGCAT-SDK-KEY", // SDKKey is required
  clientOptions: { // clientOptions is optional
    pollIntervalSeconds: 95,
  }
});
```

## Using the FeatureWrapper component

The **FeatureWrapper** component allows you to wrap features, components, and HTML within your Vue3 app. When the feature flag is enabled, the wrapped components are rendered.

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
    <FeatureWrapper featureKey="featurekey">
      <p>
        This will show if the feature flag with <b>featurekey</b> is enabled in
        ConfigCat
      </p>
    </FeatureWrapper>
  </div>
</template>
```

3. That's it! Need to know more? check out the **Advanced usage** section.
