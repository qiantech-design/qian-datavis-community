<template>
  <div class="datavis-contextmenu-bar--item">
    <div class="content">
      <div class="title">
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'contentmenu-item'
})
defineProps({
  icon: {
    type: String
  },
  title: {
    type: String
  },
  keyTips: {
    type: String
  }
})
</script>
