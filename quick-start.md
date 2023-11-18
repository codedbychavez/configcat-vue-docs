# Quick Start

## Installation

Install `configcat-vue` using npm:

```sh
npm install configcat-vue
```

## Setup

In your `main.js` file:

1. Import the plugin:

```js
import { ConfigCatPlugin } from "configcat-vue";
```

2. Install the plugin:

```js
app.use(ConfigCatPlugin, {
  sdkKey: "YOUR-CONFIGCAT-SDK-KEY", // sdkKey is required
});
```

## Usage

In this section, you'll learn how to use the plugin in your Vue.js application.

### Using the FeatureWrapper Component

This package includes a `<FeatureWrapper>` component. It allows you to control which parts of your Vue application (such as components or HTML elements) are displayed when a specific feature flag is enabled. Here's how to use it:

1. In your `.vue` component file, import the `<FeatureWrapper>` component:

```vue
<script setup lang="ts">
import { FeatureWrapper } from "configcat-vue";

</script>
```

2. Use it in your template by passing your feature key as a prop:

```js
<template>
  <div class="my-app">
    <FeatureWrapper featureKey="YOUR-FEATURE-KEY-GOES-HERE">
      {/* This is displayed when the feature flag is turned on */}
      <TheNewFeature />
    </FeatureWrapper>
  </div>
</template>
```

3. Optionally, this component also provides an `#else` and `#loading` template. You can include components or HTML elements within these templates that you want to display when the feature flag is **turned off** or **loading** respectively. Here's an example:

```js
<FeatureWrapper
  featureKey="myFirstFeatureFlag"
>
  <TheNewFeature />
  <template #else>
    {/* What you want to display when the feature flag is turned off. You can add anything in this block, like HTML elements or other Vue components */}
    <div class="feature-not-available-wrapper">
      <p>Sorry, this feature is not available. Your feature flag is off.</p>
    </div>
  </template>
  <template #loading>
    {/* What you want to display while the feature flag is loading. You can add anything in this block, like HTML elements or other Vue components */}
    <div class="loading-wrapper">
      <p>Loading...</p>
    </div>
  </template>
</FeatureWrapper>
```

That's it! If you want to explore more advanced usage, check out the [Advanced Usage](/advanced-usage.md) section.
