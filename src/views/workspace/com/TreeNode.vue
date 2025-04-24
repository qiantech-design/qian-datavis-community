<template>
  <div class="datavis-tree-node" :class="{ active }">
    <div class="tree-node__label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="tree-node__action">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'datavisTreeNode'
})
defineProps({
  label: String,
  active: Boolean
})
</script>
