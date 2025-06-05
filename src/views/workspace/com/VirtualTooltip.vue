<template>
  <el-tooltip
    popper-class="datavis-virtual-tooltip"
    :offset="6"
    placement="bottom-start"
    :show-arrow="false"
    :virtual-ref="buttonRef"
    :append-to="popupEl"
    virtual-triggering
    trigger="click"
    :visible="visible"
  >
    <template #content>
      <div class="virtual-tooltip-content" v-click-outside="onClickOutside">
        <slot></slot>
      </div>
    </template>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { ClickOutside as vClickOutside } from 'element-plus'
import { inject } from 'vue'
const popupEl = inject('popupEl') as any
defineOptions({
  name: 'datavisVirtualTooltip'
})
interface Prop {
  visible: boolean
  buttonRef: any
}
const props = withDefaults(defineProps<Prop>(), {
  visible: false,
  buttonRef: null
})
const visible = defineModel('visible')
const onClickOutside = (e: any) => {
  const isSameTarget = e.target === props.buttonRef
  if (!isSameTarget) {
    visible.value = false
  }
}
</script>
