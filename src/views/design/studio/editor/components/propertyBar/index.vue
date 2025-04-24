<template>
  <div class="datavis-property-bar">
    <vis-widget-common-prop :node="node" :customThemeList="customThemeList" v-if="node"></vis-widget-common-prop>
    <component :node="node" :is="node.component.name + '-prop'" v-if="node && node.component && node.component.name"></component>
  </div>
</template>
<script lang="ts" setup>
defineOptions({ name: 'datavisPropertyBar' })
defineProps({
  node: {
    type: Object,
    default: () => {
      return {}
    }
  },
  customThemeList: {
    type: Array,
    default: () => []
  }
})
</script>
