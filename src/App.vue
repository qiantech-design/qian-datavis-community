<template>
  <router-view />
</template>
<script setup>
import { ref } from 'vue'
</script>
<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#main {
  height: 100%;
  width: 100%;
}
.demo-wrap {
  height: 100%;
  width: 100%;
}

.content {
  height: 100%;
}
</style>
