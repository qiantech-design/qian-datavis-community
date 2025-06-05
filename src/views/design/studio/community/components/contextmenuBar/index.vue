<template>
  <div
    class="datavis-contextmenu-bar"
    :style="{
      left: `${state.mousePosition.x}px`,
      top: `${state.mousePosition.y}px`,
      position: 'fixed'
    }"
    v-show="state.rightMenuShow"
    v-click-outside="onClickOutside"
    @contextmenu.prevent
  >
    <div class="datavis-contextmenu-bar--wrap">
      <template v-if="!state.activeObject">
        <contentmenu-item title="粘贴" @click="handlePaste"></contentmenu-item>
      </template>
      <template v-else>
        <!-- 多选 -->
        <template v-if="state.multipleFlag">
          <contentmenu-item title="删除" @click="handleCommand($event, operationTypes.delete)"></contentmenu-item>
        </template>
        <!-- 单选 -->
        <template v-else>
          <template v-if="state.selectFlag">
            <contentmenu-item v-if="state.lockFlag" title="解锁" @click="handleCommand($event, operationTypes.unlock)"></contentmenu-item>
            <contentmenu-item v-else title="锁定" @click="handleCommand($event, operationTypes.lock)"></contentmenu-item>
            <contentmenu-item v-if="state.visibleFlag" title="隐藏" @click="handleCommand($event, operationTypes.visible, false)"></contentmenu-item>
            <contentmenu-item v-else title="显示" @click="handleCommand($event, operationTypes.visible, true)"></contentmenu-item>
            <contentmenu-item title="复制" @click="handleCommand($event, operationTypes.copy)"></contentmenu-item>
            <contentmenu-item title="剪贴" @click="handleCommand($event, operationTypes.cut)"></contentmenu-item>

            <contentmenu-divider />
            <contentmenu-item title="置顶" @click="handleCommand($event, operationTypes.bringToFront)"></contentmenu-item>
            <contentmenu-item title="置底" @click="handleCommand($event, operationTypes.sendToBack)"></contentmenu-item>
            <contentmenu-item title="上移" @click="handleCommand($event, operationTypes.bringForward)"></contentmenu-item>
            <contentmenu-item title="下移" @click="handleCommand($event, operationTypes.sendBackwards)"></contentmenu-item>
            <contentmenu-divider />
            <contentmenu-item title="删除" @click="handleCommand($event, operationTypes.delete)"></contentmenu-item>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import contentmenuItem from './component/item.vue'
import contentmenuDivider from './component/divider.vue'
import { eventTypes, operationTypes } from '../../utils/index'

import useEditor from '../../hooks/useEditor'
const { editor } = useEditor()
const componentName = 'datavisContextmenuBar'
defineOptions({ name: componentName })

const state = reactive({
  activeObject: null,
  mousePosition: {
    x: 100,
    y: 150
  },
  rightMenuShow: false,
  selectFlag: true,
  multipleFlag: false,
  lockFlag: true,
  visibleFlag: true
})

const handleCommand = (_event: Event, action: string, param?: any) => {
  const params = { action, param }
  editor.fire(eventTypes.coreOperation, params)
  state.rightMenuShow = false
}

const handlePaste = (e: MouseEvent) => {
  const position = editor.getMouseInnerPosition(e)
  editor.fire(eventTypes.coreOperation, { action: operationTypes.paste, param: position })
  state.rightMenuShow = false
}

const handleContextmenuChange = (event: any) => {
  // debugger
  const { e, target } = event
  const objType = target ? target.type : ''
  state.mousePosition.x = e.clientX
  state.mousePosition.y = e.clientY
  state.activeObject = target
  state.multipleFlag = objType === 'activeSelection'
  state.selectFlag = !!target
  state.lockFlag = target ? target.locked : false
  state.visibleFlag = target ? target.visible : false
  state.rightMenuShow = true
  setPosition()
}

const setPosition = () => {
  nextTick(() => {
    // 浏览器可视区域属性
    const bodyDomHeight = document.body.clientHeight
    const bodyDomWidth = document.body.clientWidth

    // 底部越界处理
    // 菜单位置属性
    const { x: posLeft, y: posTop } = state.mousePosition
    // 菜单容器属性
    const menuDom: HTMLDivElement | null = document.querySelector('.datavis-contextmenu-bar')
    const menuHeight = menuDom?.offsetHeight || 0
    const menuWidth = menuDom?.offsetWidth || 0
    // 底部功能区属性
    const bottombarDom: HTMLDivElement | null = document.querySelector('.datavis-editor-body__center__bottom')
    const barHeight = bottombarDom?.offsetHeight || 0
    // 右侧配置区(可隐藏)
    const settingDom: HTMLDivElement | null = document.querySelector('.datavis-editor-body__right')
    const settingLeft = settingDom?.offsetLeft || bodyDomWidth

    if (posTop + menuHeight >= bodyDomHeight - barHeight) {
      state.mousePosition.y = bodyDomHeight - menuHeight - barHeight - 6
    }
    if (posLeft + menuWidth >= settingLeft) {
      state.mousePosition.x = settingLeft - menuWidth - 6
    }
  })
}

const onClickOutside = () => {
  state.rightMenuShow = false
}

onMounted(() => {
  editor.on(eventTypes.mouseContextmenu, handleContextmenuChange)
})
onBeforeUnmount(() => {
  editor.off(eventTypes.mouseContextmenu, handleContextmenuChange)
})
</script>
