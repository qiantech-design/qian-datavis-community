<template>
  <div class="top-action">
    <div class="vis-icon-outline" :class="[overClass]">
      <slot></slot>
    </div>
    <span class="top-action-title">
      {{ title }}
    </span>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  overClass: {
    type: String,
    default: ''
  }
})
</script>
