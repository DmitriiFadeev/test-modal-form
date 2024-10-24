<template>
  <div>
    <MyModalPreview />
  </div>
  <ModalsContainer />
</template>

<script setup lang="ts">;
import MyModalPreview from "./components/MyModalPreview.vue";
import { ModalsContainer } from 'vue-final-modal'
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
