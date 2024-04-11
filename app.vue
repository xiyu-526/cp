<template>
  <NuxtLoadingIndicator />
  <NuxtLayout name="PageView">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
  // import "@babel/polyfill";
  import { appName } from '~/constants';
  // import Es6Promise from "es6-promise";
  // Es6Promise.polyfill();

  useHead({
    title: appName,
  })

  if(process.server){
    const device = useRequestHeaders();
    const dtype = JSON.stringify(device);
    console.log(dtype.match(/iPad|iPod|iPhone|Android|BlackBerry|IEMobile|MicroMessenger/i))
  }
</script>
<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
