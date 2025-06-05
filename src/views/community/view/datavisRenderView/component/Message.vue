<template>
  <div class="datavis-renderer-message" v-show="props.value">
    <div>{{ props.message }}</div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'vis-render-message'
})
const props = defineProps({
  value: {
    type: Boolean
  },
  message: {
    type: String
  }
})
</script>