<template>
  <div class="datavis-layer-bar--action">
    <div class="content">
      <visui-icon :name="icon"></visui-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'layer-action'
})
defineProps({
  icon: {
    type: String
  }
})
</script>