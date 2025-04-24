<template>
  <div class="datavis-layer-bar--node">
    <layer-node-content
      :layer-id="node.id"
      :activeIdList="activeIdList"
      :expandKeyList="expandKeyList"
      :componentsImgMap="componentsImgMap"
      :moveTarget="moveTarget"
      :node="node"
      :style="{ 'padding-left': (level + 1) * 16 + 'px' }"
    ></layer-node-content>
    <div class="datavis-layer-bar--node__children" v-if="node.objects?.length">
      <layer-node
        v-for="(item, idx) in node.objects"
        :activeIdList="activeIdList"
        :expandKeyList="expandKeyList"
        :componentsImgMap="componentsImgMap"
        :moveTarget="moveTarget"
        :key="idx"
        :node="item"
        :level="level + 1"
      ></layer-node>
    </div>
  </div>
</template>
<script lang="ts" setup>
import layerNodeContent from './nodeContent.vue'
defineOptions({ name: 'layerNode' })

type Props = {
  node: any
  activeIdList: string[]
  expandKeyList: string[]
  level: number
  moveTarget: any
  componentsImgMap: any
}

withDefaults(defineProps<Props>(), {
  node: () => null,
  activeIdList: () => [],
  expandKeyList: () => [],
  level: 0,
  moveTarget: () => null,
  componentsImgMap: () => {
    return {}
  }
})
</script>
